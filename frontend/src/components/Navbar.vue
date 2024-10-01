<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary w-100 px-5 ">
    <div class="d-flex justify-content-between w-100">
      <router-link to="/" class="navbar-brand">Todo</router-link>
      <div>
        <ul class="d-flex navbar-nav mb-2" style="flex-direction: row !important; gap: 15px !important;">
          <li class="nav-item" v-if="authStore.isAuthenticated">
            <a @click.prevent="authStore.logoutUser()" class="nav-link disabled">{{
                JSON.parse(authStore.user).username
              }}</a>
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated">
            <a @click.prevent="authStore.logoutUser()" href="" class="nav-link">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {useAuthStore} from "@/stores/auth.js";

export default {
  name: "Navbar",

  setup() {
    const authStore = useAuthStore()
    return {authStore}
  }
}
</script>

<style scoped>

</style>