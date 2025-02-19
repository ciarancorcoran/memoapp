import { render, fireEvent, waitFor } from "@testing-library/react"
import Login from "../Login"
import { getCategories } from "../../../api/api"
import { isAccessTokenValid } from "../../../utils/isTokenValid"
import { uuid } from "../../../utils/generateAccessToken"

jest.mock('../../../api/api')
jest.mock('../../../utils/isTokenValid')
jest.mock('../../../utils/generateAccessToken')

describe("Login", () => {
  const mockIsAccessTokenValid = isAccessTokenValid as jest.Mock
  const mockUuid = uuid as jest.Mock
  const mockGetCategories = getCategories as jest.Mock
  const testUuid = "8c87a19d-8c8e-4545-a37d-d422600cbce2"

  beforeEach(() => {
    jest.clearAllMocks()
    mockIsAccessTokenValid.mockImplementation(() => true)
    mockUuid.mockImplementation(() => testUuid)
    mockGetCategories.mockResolvedValue({ categories: [] })
  })

  it("disables login button when token is invalid", () => {
    const { getByTestId } = render(<Login />)
    const button = getByTestId("login") as HTMLButtonElement
    expect(button).toBeDisabled()
  })

  it("generates a valid access token after 1000ms", async () => {
    const { getByTestId } = render(<Login />)

    const input = getByTestId("access_token") as HTMLInputElement

    expect(input.value).toBe("")

    await waitFor(() => {
      expect(input.value).toBe("8c87a19d-8c8e-4545-a37d-d422600cbce2")
    }, {timeout: 1100})
  })

  it("calls API on login button click with valid token", async () => {
    const { getByTestId } = render(<Login />)
    const input = getByTestId("access_token") as HTMLInputElement
    const button = getByTestId("login") as HTMLButtonElement

    fireEvent.change(input, { target: { value: testUuid } })
    expect(button).not.toBeDisabled()

    fireEvent.click(button)

    await waitFor(() => expect(getCategories).toHaveBeenCalledWith(testUuid))
  })

})
