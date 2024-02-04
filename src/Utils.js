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

export const submitFormAddMovie = async (accessToken, formData) => {
  try {
    const response = await fetch('http://localhost:3000/movies', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: formData.title, category: formData.category, description: formData.description, cast: formData.cast, duration: formData.duration, rating: formData.rating })
    })

    if (!response.ok) {
      throw new Error('Movie hasnt been added')
    }

    console.log('Movie added!')
  } catch (error) {
    console.error('Error:', error.message)
  }
}

export const defaultMovie = {
  id: '00000',
  title: 'Enter a title',
  category: 'Enter a category',
  description: 'Enter a description',
  cast: 'Enter a cast',
  duration: 'Enter a duration',
  rating: 'Enter a rating'
}

export const defaultCategory = {
  id: '0000',
  nameOfCategory: 'Enter a name',
  stapleMovies: 'Enter a movie'
}

export const getCategories = async (accessToken, fetchCategories) => {
  try {
    const response = await fetch('http://localhost:3000/category', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    const dataFetched = await response.json()
    fetchCategories.value = dataFetched
    console.log(fetchCategories)
  } catch (e) {
    console.error('Error fetching categories', e)
  }
}

export const editCategory = async (accessToken, formData) => {
  try {
    const response = await fetch(`http://localhost:3000/category/${formData.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nameOfCategory: formData.nameOfCategory, stapleMovies: formData.stapleMovies })
    })

    if (!response.ok) {
      throw new Error('Category hasnt been updated')
    }

    console.log('Category edited!')
  } catch (error) {
    console.error('Error:', error.message)
  }
}
