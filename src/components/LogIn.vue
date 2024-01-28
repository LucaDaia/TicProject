<template>
  <div>
    <h1>LogIn</h1>
    <form @submit.prevent="submitForm" class="formLogIn">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <br>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginComponent',
  setup () {
    const router = useRouter()

    // Define reactive data properties using ref
    const username = ref('')
    const password = ref('')

    // Method to handle form submission
    const submitForm = async () => {
      try {
        const response = await fetch('http://localhost:4000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username.value, password: password.value })
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        const { accessToken, refreshToken, name } = data
        console.log(`Access token: ${accessToken}\n`, `Refresh token: ${refreshToken}`, `Name: ${name}`)

        sessionStorage.setItem('accessToken', accessToken)
        sessionStorage.setItem('refreshToken', refreshToken)
        sessionStorage.setItem('name', name)

        router.push('/overview')
      } catch (error) {
        console.error('Error:', error.message)
      }
    }

    // Return data properties and methods to be used in the template
    return {
      username,
      password,
      submitForm
    }
  }
}
</script>

<style scoped>

.formLogIn {
    background-color: aqua;
}
</style>
