<template>
    <div class="">
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
        <button type="button" @click="router.replace('/register')" class="btn">Register</button>
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

const mail = ref("")
const password = ref("")
const errorMailEmpty = ref(false)
const errorMail = ref("")
const errorPasswordEmpty = ref(false)
const loginError = ref(false)

function updateEmail(value: string) {
    mail.value = value
}

function updatePassword(value: string) {
    password.value = value
}

function login() {
    if (mail.value === "") {
        errorMailEmpty.value = true
        return
    }

    if (!validateEmail(mail.value)) {
        errorMail.value = "Please enter a valid mail address"
        return
    }

    if (password.value === "") {
        errorPasswordEmpty.value = true
        return
    }

    const loggedin = authstore.login()

    if (!loggedin) {
        loginError.value = true
    }
}

</script>

<style scoped lang="scss">
.btn {
    margin-top: 20px;
    margin-right: 10px;
}
</style>