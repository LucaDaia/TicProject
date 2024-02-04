<template>
<div>
  <h1>Movie categories</h1>
  <CategoryComponent v-for="(category, index) in categories" :key="index" :cNameOfCategory=category.nameOfCategory :cStapleMovies=category.stapleMovies @click="handleCategoryClick(category)"></CategoryComponent>
</div>
</template>

<script>
import CategoryComponent from './CategoryComponent.vue'
export default {
  name: 'CategoryList',
  props: {
    categories: Array
  },
  components: {
    CategoryComponent
  },
  setup (props, { emit }) {
    const handleCategoryClick = (category) => {
      emit('category-clicked', category)
    }
    return {
      handleCategoryClick
    }
  }
}
</script>

<style>

</style>
