<template>
  <div class="home">
    <LogIn/>
    <Register/>
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from '@/components/LogIn.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'HomeView',
  components: {
    LogIn,
    Register
  }
}
</script>
