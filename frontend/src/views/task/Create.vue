<template>
  <div class="bg-transparent w-75 mb-3">
    <div class="add-grid">
      <input class="w-100" type="text" placeholder="Add task" v-model="text">
      <button :class="text !== '' ? 'add-btn valid' : 'add-btn'" :disabled="text === ''" @click.prevent="processAdding()">
        <FontAwesomeIcon :icon="faPlus()"></FontAwesomeIcon>
      </button>
    </div>
  </div>
</template>

<script>

import {useTaskStore} from "@/stores/task.js";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "Create",
  components: {FontAwesomeIcon},

  setup() {
    const taskStore = useTaskStore()
    return { taskStore }
  },

  data() {
    return {
      text: ''
    }
  },

  methods: {
    faPlus() {
      return faPlus
    },
    processAdding() {
      this.taskStore.addTask(this.text)
      this.text = ''
    }
  }
}
</script>

<style scoped>
.add-grid {
  display: grid;
  grid: 40px / 1fr 40px;
  gap: 5px;
}

input[type="text"] {
  padding: 7px 15px;
  border: 2px solid #cacaca;
  border-radius: 25px;
}

.add-btn {
  border: 2px solid #0a9df0;
  background-color: #ebebeb;
  color: #0a9df0;
  border-radius: 100%;
}

.add-btn.valid {
  border: none;
  background-color: #0a9df0;
  color: #ffffff;
}
</style>