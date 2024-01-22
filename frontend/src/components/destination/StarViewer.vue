<template>
    <div class="stars">
        <div v-for="number in 5" :key="number">
            <StarHalf v-if="props.stars > number && props.stars < number + 1" class="star" />
            <StarFilled v-else-if="props.stars >= number" class="star" />
            <Star v-else class="star" />
        </div>
    </div>
</template>

<script setup lang="ts">
import StarFilled from '@/components/icons/StarFilled.vue';
import Star from '@/components/icons/Star.vue';
import StarHalf from '@/components/icons/StarHalf.vue';
import type { Stars } from '@/types';

const props = defineProps<{
    stars: Stars
}>()

</script>

<style scoped lang="scss">
.star {
    width: 24px;
}

.stars{
    display: flex;
}
</style>