<template>
  <div>
    <h1>Welcome back, {{ nameOfUser }}!</h1>
    <div class="lists-container">
      <div class="list">
        <select name="type of sort" id="categorySelect" v-model="selectedCategory" @change="handleSelectChange">
          <option value="allMovies"> All movies </option>
          <option v-for="category in fetchedCategories" :key="category" :value="category.nameOfCategory">{{ category.nameOfCategory }}</option>
        </select>
        <select id="sortBySmth" v-model="parameterSelected" @change="handleParameterChange">
          <option value="none">None</option>
          <option value="duration">Duration</option>
          <option value="rating">Rating</option>
        </select>
        <button @click="addNewMovie()">Add a new movie</button>
        <MovieList :movies="filteredMovies" @movie-clicked="showEditForm"></MovieList>
      </div>
      <div class="separator"></div>
      <div class="list">
        <CategoryList :categories="fetchedCategories" @category-clicked="showCategoryForm"></CategoryList>
      </div>
    </div>
    <EditMovieComponent v-if="wantToAdd" :movieData="defaultMovie" :typeOfForm="1" @form-clicked="clickedOnForm"></EditMovieComponent>
    <EditMovieComponent v-if="selectedMovie" :movieData="selectedMovie" :typeOfForm="0" @form-clicked="clickedOnForm"></EditMovieComponent>
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
    const parameterSelected = ref('none')

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
      fetchData(accessToken, filteredMovies)
      filteredMovies.value = filteredMovies.value.filter(movie => movie.category === selectedCategory.value)
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
      clickedOnFormCat,
      parameterSelected
    }
  }
}
</script>

<style>
.lists-container {
  display: flex;
  justify-content: space-between; /* Adjust as needed */
}

.list {
  flex: 1;
}

.separator {
  width: 3px;
  height: auto;
  background-color: black;
  margin-left: 20px;
}
</style>
