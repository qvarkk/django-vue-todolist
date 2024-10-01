import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Index from "@/views/task/Index.vue";
import {useAuthStore} from "@/stores/auth.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            beforeEnter: async (to, from) => {
                const useAuth = useAuthStore()
                if (!useAuth.isAuthenticated)
                    return {name: 'login'}
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: async (to, from) => {
                const useAuth = useAuthStore()
                if (useAuth.isAuthenticated)
                    return {name: 'index'}
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            beforeEnter: async (to, from) => {
                const useAuth = useAuthStore()
                if (useAuth.isAuthenticated)
                    return {name: 'index'}
            }
        }
    ],
})

export default router
