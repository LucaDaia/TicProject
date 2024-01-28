<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="submitFormRegister" class="formRegister">
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

export default {
  name: 'RegisterComponent',
  setup () {
    // Define reactive data properties using ref
    const username = ref('')
    const password = ref('')

    // Method to handle form submission
    const submitFormRegister = async () => {
      try {
        const response = await fetch('http://localhost:4000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username.value, password: password.value })
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        console.log('User created!')
      } catch (error) {
        console.error('Error:', error.message)
      }
    }

    // Return data properties and methods to be used in the template
    return {
      username,
      password,
      submitFormRegister
    }
  }
}
</script>

<style scoped>

.formRegister {
    background-color: greenyellow;
}
</style>
