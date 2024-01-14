import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('counter', () => {
    const token = ref<string | null>(null)

    function login() :boolean{
        console.log("logging in")
        return false
    }

    function logout() {

    }

    return { token, login, logout }
})
