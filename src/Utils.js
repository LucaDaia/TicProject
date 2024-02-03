export const getItemFromSessionStorage = (accessToken, refreshToken, nameOfUser) => {
  accessToken.value = sessionStorage.getItem('accessToken')
  refreshToken.value = sessionStorage.getItem('refreshToken')
  nameOfUser.value = sessionStorage.getItem('nameOfUser') // Assign to value property
  console.log(nameOfUser.value)
}

export const fetchData = async (accessToken, fetchedMovies) => {
  try {
    const response = await fetch('http://localhost:3000/movies', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }

    const dataFetched = await response.json()
    fetchedMovies.value = dataFetched
    console.log(fetchedMovies)
  } catch (e) {
    console.error('Error fetching movies', e)
  }
}

export const submitFormEditMovie = async (accessToken, formData) => {
  try {
    const response = await fetch(`http://localhost:3000/movies/${formData.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: formData.title, category: formData.category, description: formData.description, cast: formData.cast, duration: formData.duration, rating: formData.rating })
    })

    if (!response.ok) {
      throw new Error('Movie hasnt been updated')
    }

    console.log('Movie edited!')
  } catch (error) {
    console.error('Error:', error.message)
  }
}

export const defaultMovie = {
  id: '00000',
  title: 'default Title',
  categroy: 'N/A',
  description: 'N/A',
  cast: 'N/A',
  duration: 'N/A',
  rating: 'N/A'
}
