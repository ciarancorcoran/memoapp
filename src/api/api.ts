const BASE_URL = 'https://challenge-server.tracks.run/memoapp'

export const getCategories = async (accessToken: string) => {
  try {
    const result = await fetch(`${BASE_URL}/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken
      }
    })

    if (!result.ok) {
      throw new Error('Failed to get categories')
    }

    const data = await result.json()
    return data
  } catch (error) {
    console.log('error: ', error)
  }
}