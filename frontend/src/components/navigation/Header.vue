<template>
    <nav>
        <RouterLink to="/">
            <BackIcon />
        </RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import BackIcon from "@/components/icons/BackIcon.vue"

</script>

<style scoped lang="scss">

nav{
    padding-bottom: 40px;
}

svg {
    width: 30px;
    height: auto;
}
</style>