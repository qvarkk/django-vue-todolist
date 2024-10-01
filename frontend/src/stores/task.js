import {defineStore} from 'pinia'
import {getUsersTasks, addTask, deleteTask, updateTaskStatus, updateTaskText} from "@/api/tasks.js";
import {refreshToken, setAuthorizationToken} from "@/api/users.js";

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: null,
        editId: null,
    }),

    getters: {},

    actions: {
        async init() {
            let asd = await this.getUsersTasks()
            if (localStorage.getItem('token') === '' || !asd) {
                let token = JSON.parse(localStorage.getItem('token'))
                let res = await refreshToken(token)
                if (!res.error) {
                    token.access = res.access
                    setAuthorizationToken(token)
                    return true;
                } else {
                    localStorage.removeItem('token')
                    this.$router.push({name: 'login'})
                }
            }
            return false;
        },

        changeEditId(id) {
            this.editId = id
        },

        async getUsersTasks() {
            return await getUsersTasks()
                .then(data => {
                    if (data.error) {
                        return false
                    } else {
                        this.tasks = data
                        return true
                    }
                })
        },

        addTask(text) {
            addTask(text)
                .then(() => {
                    this.getUsersTasks()
                })
        },

        deleteTask(id) {
            deleteTask(id)
                .then((data) => {
                    this.getUsersTasks()
                })
                .catch((e) => {
                    console.error(e);
                })
        },

        updateTaskStatus(id, isDone) {
            updateTaskStatus(id, isDone)
                .then((data) => {
                    this.getUsersTasks()
                })
                .catch((e) => {
                    console.error(e);
                })
        },

        updateTaskText(id, text) {
            updateTaskText(id, text)
                .then((data) => {
                    this.editId = null
                    this.getUsersTasks()
                })
                .catch((e) => {
                    console.error(e);
                })
        }
    },
})