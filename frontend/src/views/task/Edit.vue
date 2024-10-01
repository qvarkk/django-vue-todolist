<template>
  <div class="bg-light w-75 mb-3">
    <div class="edit-grid">
      <input class="w-100" id="edit_field" type="text" v-model="newText">
      <button @click.prevent="taskStore.updateTaskText(id, newText)"
              :class="newText === text ? 'update-btn' : 'update-btn valid'" :disabled="newText === text">
        <FontAwesomeIcon :icon="faCheck()"/>
      </button>
      <button class="cancel-btn" @click.prevent="taskStore.changeEditId(null)">
        <FontAwesomeIcon :icon="faX()" inverse/>
      </button>
    </div>
  </div>
</template>

<script>

import {useTaskStore} from "@/stores/task.js";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faCheck, faX} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "Show",
  methods: {
    faCheck() {
      return faCheck
    },
    faX() {
      return faX
    },
  },
  components: {FontAwesomeIcon},

  mounted() {
    document.querySelector('#edit_field').focus()
  },

  setup() {
    const taskStore = useTaskStore()
    return {taskStore}
  },

  props: [
    'id',
    'text'
  ],

  data() {
    return {
      newText: this.text,
    }
  },
}
</script>

<style scoped>
.edit-grid {
  display: grid;
  grid: 40px / 1fr 40px 40px;
  gap: 5px;
}

input[type="text"] {
  padding: 7px 15px;
  border: 2px solid #cacaca;
  border-radius: 50px;
}

.update-btn {
  border: 2px solid #0a9df0;
  background-color: #ebebeb;
  color: #0a9df0;
  border-radius: 100%;
}

.update-btn.valid {
  border: none;
  background-color: #0a9df0;
  color: #ffffff;
}


.cancel-btn {
  border: none;
  background-color: red;
  border-radius: 100%;
}
</style>