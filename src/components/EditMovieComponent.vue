<template>
<div>
  <form @submit.prevent="submitForm">
    <div>
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="formData.title" required>
    </div>
    <div>
      <label for="category">Category:</label>
      <input type="text" id="category" v-model="formData.category" required>
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea id="description" v-model="formData.description" rows="4" required></textarea>
    </div>
    <div>
      <label for="cast">Cast:</label>
      <input type="text" id="cast" v-model="formData.cast" required>
    </div>
    <div>
      <label for="duration">Duration:</label>
      <input type="text" id="duration" v-model="formData.duration" required>
    </div>
    <div>
      <label for="rating">Rating:</label>
      <input type="text" id="rating" v-model="formData.rating" required>
    </div>
    <button type="submit" @onClick="clickedOnForm()">Submit</button>
  </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { submitFormEditMovie, defaultMovie } from '@/Utils.js'

export default {
  name: 'editMovieComponent',
  props: {
    movieData: {
      type: Object,
      required: true,
      default: defaultMovie
    }
  },
  setup (props, { emit }) {
    const clickedOnForm = () => {
      emit('form-clicked')
    }
    const formData = ref({
      id: props.movieData.id || '',
      title: props.movieData.title || '',
      category: props.movieData.category || '',
      description: props.movieData.description || '',
      cast: props.movieData.cast || '',
      duration: props.movieData.duration || '',
      rating: props.movieData.rating || ''
    })

    const accessToken = ref(null)

    // Watch for changes in props.movieData and update formData
    watch(() => props.movieData, (newMovieData) => {
      formData.value.id = newMovieData.id || ''
      formData.value.title = newMovieData.title || ''
      formData.value.category = newMovieData.category || ''
      formData.value.description = newMovieData.description || ''
      formData.value.cast = newMovieData.cast || ''
      formData.value.duration = newMovieData.duration || ''
      formData.value.rating = newMovieData.rating || ''
    }, { immediate: true })

    const submitForm = () => {
      accessToken.value = sessionStorage.getItem('accessToken')
      console.log(accessToken)
      // Handle form submission, e.g., send data to server for updating the movie
      submitFormEditMovie(accessToken, formData.value)
      console.log('Form submitted with data:', formData.value)
    }

    return {
      formData,
      submitForm,
      clickedOnForm
    }
  }
}
</script>

<style scoped>
/* Add your styling here */
</style>
