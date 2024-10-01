<template>
  <div class="w-100 d-flex flex-column align-items-center mx-auto">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import {useAuthStore} from "@/stores/auth.js";

export default {
  name: 'App',
  components: {Navbar},
  mounted() {
    const authStore = useAuthStore()
    authStore.init()
  }
}
</script>

<style>

</style>
