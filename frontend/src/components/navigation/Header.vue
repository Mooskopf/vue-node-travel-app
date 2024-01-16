<template>
    <nav>
        <RouterLink to="/">
            <div class="header">
                <BackIcon v-if="router.currentRoute.value.fullPath !== '/' && router.currentRoute.value.fullPath !== '/login'
                    && router.currentRoute.value.fullPath !== '/register'" />
                <div v-else></div>
                <button v-if="router.currentRoute.value.fullPath !== '/login'
                    && router.currentRoute.value.fullPath !== '/register'" type="button" class="btn"
                    @click="authstore.logout()">Logout</button>
            </div>
        </RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import BackIcon from "@/components/icons/BackIcon.vue"
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authstore';

const router = useRouter()
const authstore = useAuthStore()
</script>

<style scoped lang="scss">
nav {
    padding-bottom: 40px;
}

svg {
    width: 30px;
    height: auto;
}

.header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    button {
        justify-self: right;
    }
}
</style>