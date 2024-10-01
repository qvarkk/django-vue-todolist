<template>
  <div class="w-50 d-flex flex-column align-items-center p-5">
    <h4 class="mb-3">Login</h4>
    <div class="mb-3 w-100">
      <label for="username" class="form-label">Username</label>
      <input type="text" class="form-control" id="username" v-model="credentials.username" placeholder="username">
    </div>
    <div class="mb-5 w-100">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="credentials.password" placeholder="********">
    </div>
    <p class="fs-6 text-danger" v-if="errorMessage">{{ errorMessage }}</p>
    <input class="mb-2 btn btn-primary w-50" type="submit" value="Login"
           @click.prevent="loginUser()"
           :disabled="!credentials.password || !credentials.username">
    <div class="d-flex ">
      <p class="mr-2">Don't have an account yet?</p>
      <router-link class="d-inline" to="/register">Register</router-link>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth.js";

export default {
  name: "Login",

  setup() {
    const authStore = useAuthStore()
    return {authStore}
  },

  data() {
    return {
      credentials: {
        username: null,
        password: null,
      },
      errorMessage: '',
    }
  },

  methods: {
    loginUser() {
      this.errorMessage = ''

      this.authStore.loginUser(this.credentials.username, this.credentials.password)
          .then( data => {
            if (data)
              this.errorMessage = data
          })
    }
  }
}
</script>

<style>

</style>