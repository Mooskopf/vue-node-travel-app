<template>
    <nav>
        <div class="header">
            <RouterLink v-if="router.currentRoute.value.fullPath !== '/'" to="/">
                <BackIcon />
            </RouterLink>
            <div v-else></div>
            <div class="right">
                <RouterLink to="/profile">
                    <button type="button" class="btn">Profile</button>
                </RouterLink>
                <button type="button" class="btn" @click="authstore.logout()">Logout</button>
            </div>
        </div>
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

    .right {
        justify-self: right;
        display: flex;
        gap: 10px;
    }
}
</style>