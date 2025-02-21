const BASE_URL = 'https://challenge-server.tracks.run/memoapp'

export const getCategories = async (accessToken: string) => {
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
}

export const getMemos = async (accessToken: string, id: number) => {
  const result = await fetch(`${BASE_URL}/memo?category_id=${id}`, {
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

  console.log('here is data: ', data)
  return data
}