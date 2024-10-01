import axios from "axios";

export async function loginUser(username, password) {
    try {
        let res = await axios.post('/api/token/', {username: username, password: password})
        return res.data
    } catch (e) {
        return {
            'error': e
        }
    }
}

export async function registerUser(username, password, email) {
    try {
        let res = await axios.post('/api/users/', {username: username, password: password, email: email})
        return res.data
    } catch (e) {
        return {
            'error': e
        }
    }
}

export async function refreshToken(token) {
    try {
        let res = await axios.post('/api/token/refresh/', {refresh: token.refresh})
        return res.data
    } catch (e) {
        return {
            'error': e
        }
    }
}

export function setAuthorizationToken(token) {
    localStorage.setItem('token', JSON.stringify(token))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.access}`
}