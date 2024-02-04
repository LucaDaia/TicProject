<template>
  <div>
    <h1>Welcome {{ nameOfUser }}</h1>
    <select name="type of sort" id="categorySelect" v-model="selectedCategory" @change="handleSelectChange">
      <option value="allMovies"> All movies </option>
      <option v-for="category in fetchedCategories" :key="category" :value="category.nameOfCategory">{{ category.nameOfCategory }}</option>
    </select>
    <button @click="addNewMovie()">Add a new movie</button>
    <EditMovieComponent v-if="wantToAdd" :movieData="defaultMovie" :typeOfForm="1" @form-clicked="clickedOnForm"></EditMovieComponent>
    <MovieList :movies="filteredMovies" @movie-clicked="showEditForm"></MovieList>
    <EditMovieComponent v-if="selectedMovie" :movieData="selectedMovie" :typeOfForm="0" @form-clicked="clickedOnForm"></EditMovieComponent>
    <CategoryList :categories="fetchedCategories" @category-clicked="showCategoryForm"></CategoryList>
    <EditCategoryComponent v-if="selCat" :categoryData="selCat" @formC-clicked="clickedOnFormCat"></EditCategoryComponent>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import EditMovieComponent from '@/components/EditMovieComponent.vue'
import { onMounted, ref } from 'vue'
import { getItemFromSessionStorage, fetchData, defaultMovie, getCategories } from '@/Utils.js'
import CategoryList from '@/components/CategoryList.vue'
import EditCategoryComponent from '@/components/EditCategoryComponent.vue'

export default {
  name: 'OverView',
  components: {
    MovieList,
    EditMovieComponent,
    CategoryList,
    EditCategoryComponent
  },
  setup () {
    const fetchedMovies = ref([])
    const accessToken = ref(null)
    const refreshToken = ref(null)
    const nameOfUser = ref(null)
    const selectedMovie = ref(null)
    const wantToAdd = ref(false)
    const fetchedCategories = ref([])
    const selectedCategory = ref('allMovies')
    const filteredMovies = ref([])
    const selCat = ref(null)

    onMounted(() => {
      getItemFromSessionStorage(accessToken, refreshToken, nameOfUser)
      fetchData(accessToken, fetchedMovies)
      fetchData(accessToken, filteredMovies)
      getCategories(accessToken, fetchedCategories)
      console.log(fetchedCategories)
      console.log(filteredMovies)
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

    const addNewMovie = () => {
      wantToAdd.value = true
      console.log('Want to add function')
    }

    const handleSelectChange = () => {
      console.log('Metoda change')
      if (selectedCategory.value !== 'allMovies') {
        filteredMovies.value = fetchedMovies.value.filter(movie => movie.category === selectedCategory.value)
        console.log('Intra aici')
      } else {
        filteredMovies.value = fetchedMovies.value
      }
    }

    const showCategoryForm = (category) => {
      selCat.value = category
    }

    const clickedOnFormCat = () => {
      console.log('Categories updated, fetching again')
      getCategories(accessToken, fetchedCategories)
    }

    return {
      accessToken,
      fetchedMovies,
      nameOfUser,
      showEditForm,
      clickedOnForm,
      selectedMovie,
      defaultMovie,
      wantToAdd,
      addNewMovie,
      fetchedCategories,
      selectedCategory,
      filteredMovies,
      handleSelectChange,
      selCat,
      showCategoryForm,
      clickedOnFormCat
    }
  }
}
</script>

<style>

</style>
