<template>
  <div>
    <h1>Welcome {{ nameOfUser }}</h1>
    <MovieList :movies="fetchedMovies"></MovieList>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import { onMounted, ref } from 'vue'

export default {
  name: 'OverView',
  components: {
    MovieList
  },
  setup () {
    const fetchedMovies = ref([])
    const accessToken = ref(null)
    const nameOfUser = ref(null) // Define as ref()

    const getItemFromSessionStorage = () => {
      accessToken.value = sessionStorage.getItem('accessToken')
      nameOfUser.value = sessionStorage.getItem('nameOfUser') // Assign to value property
      console.log(nameOfUser.value)
    }

    onMounted(getItemFromSessionStorage)

    const fetchData = async () => {
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
    onMounted(fetchData)

    return {
      accessToken,
      fetchedMovies,
      nameOfUser
    }
  }
}
</script>

<style>

</style>
