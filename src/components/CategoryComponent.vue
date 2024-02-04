<template>
  <div class="categoryDetails">
    <h1>{{ cNameOfCategory }}</h1>
    <div class="detail">
        <span class="label">Staple movies: </span>
        <span class="spanValue">{{ cStapleMovies }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryComponent',
  props: {
    cNameOfCategory: String,
    cStapleMovies: String
  },
  setup (props) {
    console.log(props.cNameOfCategory)
  }
}
</script>

<style>

</style>
