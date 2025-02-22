import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { getCategories } from "../../api/api"
import { isAccessTokenValid } from "../../utils/isTokenValid"
import { uuid } from "../../utils/generateAccessToken"
import MemoApp from "../MemosIndex"
import { MemoProvider } from "../../context/memoContext"

jest.mock('../../api/api')
jest.mock('../../utils/isTokenValid')
jest.mock('../../utils/generateAccessToken')

describe("Login", () => {
  const mockIsAccessTokenValid = isAccessTokenValid as jest.Mock
  const mockUuid = uuid as jest.Mock
  const mockGetCategories = getCategories as jest.Mock
  const testUuid = "8c87a19d-8c8e-4545-a37d-d422600cbce2"

  const createTestQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        },
      },
    })

  beforeEach(() => {
    jest.clearAllMocks()
    mockIsAccessTokenValid.mockImplementation(() => true)
    mockUuid.mockImplementation(() => testUuid)
    mockGetCategories.mockResolvedValue({ categories: [] })
  })

  const renderWithProviders = (ui: React.ReactElement) => {
    const testQueryClient = createTestQueryClient()
    return render(
      <QueryClientProvider client={testQueryClient}>
        <MemoProvider>
          {ui}
        </MemoProvider>
      </QueryClientProvider>
    )
  }

  it("disables login button when token is invalid", () => {
    renderWithProviders(<MemoApp />)
    const button = screen.getByTestId("login") as HTMLButtonElement
    expect(button).toBeDisabled()
  })

  it("generates a valid access token after 1000ms", async () => {
    renderWithProviders(<MemoApp />)

    const input = screen.getByTestId("access_token") as HTMLInputElement

    expect(input.value).toBe("")

    await waitFor(() => {
      expect(input.value).toBe(testUuid)
    }, { timeout: 1100 })
  })

  it("calls API on login button click with valid token", async () => {
    renderWithProviders(<MemoApp />)
    const input = screen.getByTestId("access_token") as HTMLInputElement
    const button = screen.getByTestId("login") as HTMLButtonElement

    fireEvent.change(input, { target: { value: testUuid } })
    expect(button).not.toBeDisabled()

    fireEvent.click(button)

    await waitFor(() => expect(getCategories).toHaveBeenCalledWith(testUuid))
  })
})
