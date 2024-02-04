<template>
  <div>
  <form @submit.prevent="submitForm">
    <div>
      <label for="title">Name of category:</label>
      <input type="text" id="title" v-model="formData.nameOfCategory" required>
    </div>
    <div>
      <label for="stapleMovies">Staple movies:</label>
      <input type="text" id="stapleMovies" v-model="formData.stapleMovies" required>
    </div>
    <button type="submit" @onClick="clickedOnFormCat()">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { defaultCategory, editCategory } from '@/Utils.js'
export default {
  name: 'EditCategoryComponent',
  props: {
    categoryData: {
      type: Object,
      required: true,
      default: defaultCategory
    }
  },
  setup (props, { emit }) {
    const clickedOnFormCat = () => {
      emit('formC-clicked')
    }
    const accessToken = ref(null)
    const formData = ref({
      id: props.categoryData.id || '',
      nameOfCategory: props.categoryData.nameOfCategory || '',
      stapleMovies: props.categoryData.stapleMovies || ''
    })

    watch(() => props.categoryData, (newCatData) => {
      formData.value.id = newCatData.id || ''
      formData.value.nameOfCategory = newCatData.nameOfCategory || ''
      formData.value.stapleMovies = newCatData.stapleMovies || ''
    }, { immediate: true })

    const submitForm = () => {
      accessToken.value = sessionStorage.getItem('accessToken')
      editCategory(accessToken, formData.value)
      clickedOnFormCat()
    }

    return {
      submitForm,
      formData,
      clickedOnFormCat
    }
  }
}
</script>

<style>

</style>
