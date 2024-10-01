<template>
  <div class="bg-light w-75 mb-3" v-bind:class="(done)?'done':''">
    <div class="task-grid">
      <div class="" style="position: relative;">
        <input type="text" class="w-100" disabled :value="text">
        <input class="hidden" type="button" v-if="!done" @click="taskStore.changeEditId(id)">
      </div>
      <button class="check-button" @click.prevent="changeCheckStatus()">
        <FontAwesomeIcon :icon="faCheck()" :inverse="done"/>
      </button>
      <button class="delete-btn" @click.prevent="taskStore.deleteTask(id)">
        <FontAwesomeIcon :icon="faTrashCan()" inverse/>
      </button>
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faCheck, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import {useTaskStore} from "@/stores/task.js";

export default {
  name: "Show",
  methods: {
    faTrashCan() {
      return faTrashCan
    },
    faCheck() {
      return faCheck
    },
    changeCheckStatus() {
      this.done = !this.done
      this.taskStore.updateTaskStatus(this.id, this.done)
    }
  },

  components: {
    FontAwesomeIcon,
  },

  setup() {
    const taskStore = useTaskStore()
    return {taskStore}
  },

  data() {
    return {
      done: this.isDone
    }
  },

  props: [
    'id',
    'text',
    'isDone',
  ],
}
</script>

<style scoped>
.task-grid {
  display: grid;
  grid: 40px / 1fr 40px 40px;
  gap: 5px;
}

input[type="text"] {
  padding: 7px 15px;
  border: 2px solid #cacaca;
  border-radius: 25px;
  background-color: #ebebeb;
  color: black;
}

.hidden {
  padding: 7px 15px;
  position: absolute;
  left: 0;
  width: 100%;
  background-color: transparent;
  border: none;
}

.done > div > div > input[type="text"] {
  text-decoration: line-through;
  background-color: #c6c6c6;
}

.done > div > .check-button {
  background-color: #14ff00;
  color: #ebebeb;
}

.check-button {
  border: 2px solid #14ff00;
  border-radius: 100%;
  background-color: #ebebeb;
  color: #909090;
}

.delete-btn {
  border: none;
  padding: 0;
  background-color: red;
  border-radius: 100%;
  cursor: pointer;
}

</style>