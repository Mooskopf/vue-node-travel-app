<template>
    <div v-if="props.destination">
        <RouterLink :to="'/destination/' + props.destination.name.toLowerCase()">
            <div class="destination" :class="props.destination.color">
                {{ props.destination.name }}
            </div>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { type Destination } from '@/types'


const props = defineProps<{
    destination: Destination | undefined
}>()

</script>

<style scoped lang="scss">
.destination {
    padding: 20px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    color: white;
    box-shadow: 5px 5px 11px 0px rgba(0, 0, 0, 0.5);
}

.blue {
    background-color: var(--clr-primary);
}

.green {
    background-color: var(--clr-secondary);
}

.yellow {
    background-color: var(--clr-yellow);
}
</style>