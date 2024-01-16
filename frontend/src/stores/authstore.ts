import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/helpers/request'
import { useStateStore } from './statestore'
import { storeToRefs } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore('counter', () => {
    const token = ref<string | null>(localStorage.getItem("token"))

    function login(email: string, password: string): boolean {
        const { user } = storeToRefs(useStateStore())

        const data = {
            email: email,
            password: password
        }

        request("post", "/login", data).then((res) => {
            token.value = res.token
            localStorage.setItem("token", res.token)
            user.value = res.user
            router.push("/")
        }).catch(err => {
            console.log(err)
            return false
        })

        return true
    }

    function logout() {
        const { user } = storeToRefs(useStateStore())

        token.value = null
        user.value = null

        router.push("/login")
    }

    return { token, login, logout }
})
