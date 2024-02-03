<template>
  <div>
    <h1>Welcome {{ nameOfUser }}</h1>
    <select name="type of sort" id="sort">
      <option value="All movies"></option>
    </select>
    <MovieList :movies="fetchedMovies" @movie-clicked="showEditForm"></MovieList>
    <EditMovieComponent v-if="selectedMovie" :movieData="selectedMovie" @form-clicked="clickedOnForm"></EditMovieComponent>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import EditMovieComponent from '@/components/EditMovieComponent.vue'
import { onMounted, ref } from 'vue'
import { getItemFromSessionStorage, fetchData } from '@/Utils.js'

export default {
  name: 'OverView',
  components: {
    MovieList,
    EditMovieComponent
  },
  setup () {
    const fetchedMovies = ref([])
    const accessToken = ref(null)
    const refreshToken = ref(null)
    const nameOfUser = ref(null) // Define as ref()
    const selectedMovie = ref(null)

    onMounted(() => {
      getItemFromSessionStorage(accessToken, refreshToken, nameOfUser)
      fetchData(accessToken, fetchedMovies)
    })

    const showEditForm = (movie) => {
      console.log('Clicked on\n ', movie)
      selectedMovie.value = movie
      console.log(selectedMovie.value)
    }

    const clickedOnForm = () => {
      console.log('Form has been submited new movies fetched')
      fetchData(accessToken, fetchedMovies)
    }

    return {
      accessToken,
      fetchedMovies,
      nameOfUser,
      showEditForm,
      clickedOnForm,
      selectedMovie
    }
  }
}
</script>

<style>

</style>
