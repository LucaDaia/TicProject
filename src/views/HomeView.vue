<template>
  <div class="container">
    <div class="login">
    <LogIn/>
    </div>
    <div class="separator"></div>
    <div class="register">
    <Register v-if="wantToRegister"/>
    <h1 v-if="!wantToRegister">Don't have an account?</h1>
    <button v-if="!wantToRegister" @click="popUpRegister">Register here!</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import LogIn from '@/components/LogIn.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'HomeView',
  components: {
    LogIn,
    Register
  },
  setup () {
    const wantToRegister = ref(false)

    const popUpRegister = () => {
      wantToRegister.value = true
    }

    return {
      popUpRegister,
      wantToRegister
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.separator {
  width: 3px;
  height: 150px;
  background-color: black;
}
</style>
