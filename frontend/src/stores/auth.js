import {defineStore} from 'pinia'
import {loginUser, registerUser, setAuthorizationToken} from "@/api/users.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: localStorage.getItem('user') || null,
    }),

    getters: {
        getToken: (state) => JSON.parse(state.token),
        getUser: (state) => JSON.parse(state.user),
        isAuthenticated: (state) => state.token !== null
    },

    actions: {
        init() {
            let token = localStorage.getItem('token')
            if (token)
                setAuthorizationToken(JSON.parse(token))
        },

        setToken(token) {
            this.token = JSON.stringify(token)

            localStorage.setItem('token', this.token)
        },

        setUser(user) {
            this.user = JSON.stringify(user)

            localStorage.setItem('user', this.user)
        },

        resetToken() {
            this.token = null

            localStorage.removeItem('token');
        },

        resetUser() {
            this.user = null

            localStorage.removeItem('user');
        },

        async loginUser(username, password) {
            let res
            await loginUser(username, password)
                .then((data) => {
                    if (data.error) {
                        res = data.error.response.data.detail
                    } else {
                        const user = {username: username}
                        this.setToken(data)
                        this.setUser(user)
                        setAuthorizationToken(data)
                        this.$router.push({name: 'index'})
                    }
                })
            return res
        },

        async registerUser(username, password, email) {
            let res
            await registerUser(username, password, email)
                .then((data) => {
                    if (data.message)
                        loginUser(username, password)
                    else
                        res = data.error.response.data.error
                })
                .catch((e) => {
                    res = e
                })
            return res
        },

        logoutUser() {
            this.resetToken()
            this.resetUser()
            this.$router.push({name: 'login'})
        },
    },
})