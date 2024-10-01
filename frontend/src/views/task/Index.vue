<template>
  <main class="py-5 w-100 d-flex flex-column align-items-center">
    <h3 class="mb-5">Tasks</h3>
    <template v-for="task in taskStore.tasks">
      <Show :key="taskStore.tasks" :id="task.id" :is-done="task.is_done" :text="task.text" v-if="task.id !== taskStore.editId"></Show>
      <Edit :id="task.id" :text="task.text" v-if="task.id === taskStore.editId"></Edit>
    </template>
    <Create></Create>
  </main>
</template>

<script>
import Show from "@/views/task/Show.vue";
import Create from "@/views/task/Create.vue";
import Edit from "@/views/task/Edit.vue";
import {useTaskStore} from "@/stores/task.js";
import {useAuthStore} from "@/stores/auth.js";

export default {
  name: "Index",

  setup() {
    const taskStore = useTaskStore()
    const authStore = useAuthStore()
    return {taskStore, authStore}
  },

  components: {
    Show,
    Create,
    Edit
  },

  async mounted() {
    if (await this.taskStore.init()) {
      this.authStore.init()
      await this.taskStore.getUsersTasks()
    }
  },
}
</script>

<style>

</style>