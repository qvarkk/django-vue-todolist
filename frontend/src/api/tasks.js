import axios from "axios"

export async function getUsersTasks() {
    try {
        let res = await axios.get(`/api/users/tasks/`)
        return res.data
    } catch (e) {
        return {
            'error': e
        }
    }
}

export async function addTask(text) {
    try {
        await axios.post('/api/tasks/', {text: text})
    } catch (e) {
        console.log(e)
    }
}

export async function deleteTask(id) {
    try {
        await axios.delete(`/api/tasks/${id}/`)
    } catch (e) {
        console.log(e)
    }
}

export async function updateTaskStatus(id, isDone) {
    try {
        await axios.put(`/api/tasks/${id}/`, { is_done: isDone })
    }  catch (e) {
        console.log(e)
    }
}

export async function updateTaskText(id, text) {
    try {
        await axios.put(`/api/tasks/${id}/`, { text: text })
    }  catch (e) {
        console.log(e)
    }
}