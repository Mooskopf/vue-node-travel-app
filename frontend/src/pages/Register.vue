<template>
    <div class="logged-out-page">
        <Input type="text" :errorEmpty="errorNameEmpty" :updateInput="updateName" placehoder="Name" @click="() => {
            errorNameEmpty = false
        }" />
        <Input type="email" :errorEmpty="errorMailEmpty" :error="errorMail" :updateInput="updateEmail" placehoder="Email"
            @click="() => {
                errorMail = ''
                errorMailEmpty = false
            }" />
        <Input type="password" :errorEmpty="errorPasswordEmpty" :error="errorPassword" :updateInput="updatePassword"
            placehoder="Password" @click="() => {
                errorPassword = ''
                errorPasswordEmpty = false
            }" />
        <button type="button" @click="checkInputs" class="btn">Register</button>
        <button type="button" @click="router.push('/login')" class="btn">Back to Login</button>
    </div>
</template>

<script setup lang="ts">
import Input from '@/components/generic/Input.vue'
import { ref } from 'vue'
import { validateEmail, validatePassword } from "@/helpers/functions"
import register from '@/api/register';
import { useRouter } from 'vue-router';

const router = useRouter()

const email = ref("")
const password = ref("")
const name = ref("")
const errorNameEmpty = ref(false)
const errorMailEmpty = ref(false)
const errorMail = ref("")
const errorPasswordEmpty = ref(false)
const errorPassword = ref("")

function updateName(value: string) {
    name.value = value
}

function updateEmail(value: string) {
    email.value = value
}

function updatePassword(value: string) {
    password.value = value
}

function checkInputs() {
    if (name.value === "") {
        errorNameEmpty.value = true
        return
    }

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

    if (!validatePassword(password.value)) {
        errorPassword.value = "Please enter a password that consists of minimum one uppercase letter, one lowecase letter, a number, one special symbol and has at least 8 digits"
        return
    }

    const user = {
        name: name.value,
        email: email.value
    }

    register(user, password.value)
}

</script>

<style scoped lang="scss">
.btn {
    margin-top: 20px;
    margin-right: 10px;
}
</style>