import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/helpers/request'
import { useDataStore } from './datastore'
import { storeToRefs } from 'pinia'
import router from '@/router'
import getUserDestinationList from '@/api/user_destination_list/getUserDestinationList'
import getReviews from '@/api/reviews/getReviews'

export const useAuthStore = defineStore('counter', () => {
    const token = ref<string | null>(localStorage.getItem("token"))

    async function login(email: string, password: string): Promise<boolean> {
        const { username, useremail } = storeToRefs(useDataStore())

        const data = {
            email: email,
            password: password
        }

        let out = true
        await request("post", "/user/login", data).then((res) => {
            token.value = res.token
            username.value = res.user.name
            useremail.value = res.user.email
            localStorage.setItem("token", res.token)
            localStorage.setItem("username", res.user.name)
            localStorage.setItem("useremail", res.user.email)
            getUserDestinationList()
            getReviews()
            router.push("/")
        }).catch(err => {
            console.log(err)
            out = false
        })

        return out
    }

    function logout() {
        const { username, useremail } = storeToRefs(useDataStore())

        token.value = null
        username.value = null
        useremail.value = null

        router.push("/login")
    }

    return { token, login, logout }
})
