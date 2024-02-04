<template>
  <div>
  <h1>Movies watched</h1>
  <MovieComponent v-for="(movie, index) in movies" :key="index" :mTitle="movie.title" :mCategory="movie.category" :mDescription="movie.description" :mCast="movie.cast" :mDuration="movie.duration" :mRating="movie.rating" @click="handleMovieClick(movie)"></MovieComponent>
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
  setup (props, { emit }) {
    const handleMovieClick = (movie) => {
      emit('movie-clicked', movie)
    }
    console.log('A ajuns la Movie list!')

    return {
      handleMovieClick
    }
  }
}
</script>

<style>

</style>
