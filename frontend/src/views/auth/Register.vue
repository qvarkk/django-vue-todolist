<template>
  <div class="w-50 d-flex flex-column align-items-center p-5">
    <h4 class="mb-3">Register</h4>
    <div class="mb-3 w-100">
      <label for="username" class="form-label">Username</label>
      <input type="text" class="form-control" id="username" v-model="credentials.username" placeholder="username">
    </div>
    <div class="mb-3 w-100">
      <label for="username" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" v-model="credentials.email" placeholder="email@example.com" required>
    </div>
    <div class="mb-3 w-100">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="credentials.password" placeholder="********">
    </div>
    <div class="mb-5 w-100">
      <label for="password_confirmation" class="form-label">Confirm Password</label>
      <input type="password" class="form-control" id="password_confirmation" v-model="credentials.password_confirmation"
             placeholder="********">
    </div>
    <p class="fs-6 text-danger" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="fs-6 text-success" v-if="successMessage">{{ successMessage }}</p>
    <input class="mb-2 btn btn-primary w-50" type="submit" value="Register"
           @click.prevent="registerUser()"
           :disabled="!credentials.password || !credentials.username || !credentials.email || !credentials.password_confirmation">
    <div class="d-flex ">
      <p class="mr-2">Already have an account? </p>
      <router-link class="d-inline" to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth.js";

export default {
  name: "Register",

  setup() {
    const authStore = useAuthStore()
    return {authStore}
  },

  data() {
    return {
      credentials: {
        username: '',
        password: '',
        email: '',
        password_confirmation: '',
      },
      errorMessage: '',
      successMessage: '',
    }
  },

  methods: {
    registerUser() {
      this.errorMessage = ''
      this.successMessage = ''

      if (this.credentials.password !== this.credentials.password_confirmation) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      this.authStore.registerUser(this.credentials.username, this.credentials.password, this.credentials.email)
          .then((data) => {
            if (data)
              this.errorMessage = data
            else {
              this.successMessage = 'Success! Logging you in...'
              this.authStore.loginUser(this.credentials.username, this.credentials.password)
            }
          })
    }
  },
}
</script>

<style>

</style>