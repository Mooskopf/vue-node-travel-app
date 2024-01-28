<template>
    <div class="logged-out-page">
        <Input type="email" :errorEmpty="errorMailEmpty" :error="errorMail" :updateInput="updateEmail" placehoder="Email"
            @click="() => {
                errorMail = ''
                errorMailEmpty = false
                loginError = false
            }" />
        <Input type="password" :errorEmpty="errorPasswordEmpty" :updateInput="updatePassword" placehoder="Password" @click="() => {
            errorPasswordEmpty = false
            loginError = false
        }" />
        <div class="error-text" v-if="loginError">Credentials not correct</div>
        <button type="button" @click="login" class="btn">Login</button>
        <button type="button" @click="router.push('/register')" class="btn">Register</button>
    </div>
</template>

<script setup lang="ts">
import Input from '@/components/generic/Input.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authstore';
import { validateEmail } from "@/helpers/functions"
import { useRouter } from 'vue-router';

const authstore = useAuthStore()
const router = useRouter()

const email = ref("")
const password = ref("")
const errorMailEmpty = ref(false)
const errorMail = ref("")
const errorPasswordEmpty = ref(false)
const loginError = ref(false)

function updateEmail(value: string) {
    email.value = value
}

function updatePassword(value: string) {
    password.value = value
}

async function login() {
    if (email.value === "") {
        errorMailEmpty.value = true
        return
    }

    if (!validateEmail(email.value)) {
        errorMail.value = "Please enter a valid mail address"
        return
    }

    if (password.value === "") {
        errorPasswordEmpty.value = true
        return
    }

    const loggedin = await authstore.login(email.value, password.value)

    if (!loggedin) {
        loginError.value = true
    }
}

</script>

<style scoped lang="scss"></style>