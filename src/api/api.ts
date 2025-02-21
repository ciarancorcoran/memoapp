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
    throw new Error('Failed to get memos')
  }

  const data = await result.json()

  return data
}

export const getSelectedMemo = async (accessToken: string, id: number) => {
  const result = await fetch(`${BASE_URL}/memo/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': accessToken
    }
  })

  if (!result.ok) {
    throw new Error('Failed to get memo')
  }

  const data = await result.json()

  return data
}

export const updateMemo = async (accessToken: string, id: number, title: string, content: string) => {
  const memoData = {
    category_id: id,
    title,
    content
  }
  const result = await fetch(`${BASE_URL}/memo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': accessToken
    },
    body: JSON.stringify(memoData)
  })

  if (!result.ok) {
    throw new Error('Failed to update memo')
  }


  return result
}