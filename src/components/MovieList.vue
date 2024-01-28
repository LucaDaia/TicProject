<template>
  <div>
  <h1>All the movies watched!</h1>
  <MovieComponent v-for="(movie, index) in movies" :key="index" :mTitle="movie.title" :mCategory="movie.category" :mDescription="movie.description" :mCast="movie.cast" :mDuration="movie.duration" :mRating="movie.rating"></MovieComponent>
  </div>
</template>

<script>
import MovieComponent from '@/components/MovieComponent.vue'
export default {
  props: {
    movies: Array
  },
  components: {
    MovieComponent
  },
  setup () {
    console.log('A ajuns la Movie list!')
  }
}
</script>

<style>

</style>
