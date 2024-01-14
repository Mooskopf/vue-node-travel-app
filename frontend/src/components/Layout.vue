<template>
    <div class="content-grid">
        <div>
            <div class="spacer"></div>
            <Header v-if="router.currentRoute.value.fullPath !== '/' && router.currentRoute.value.fullPath !== '/login'
                && router.currentRoute.value.fullPath !== '/register'" />
            <slot></slot>
            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/navigation/Header.vue';
import Footer from '@/components/navigation/Footer.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<style scoped lang="scss"></style>