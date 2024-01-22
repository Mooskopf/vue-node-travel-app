<template>
    <div>
        <Star @click="select(1)" v-if="!oneSelected" class="star" />
        <StarFilled @click="select(1)" v-else class="star" />
        <Star @click="select(2)" v-if="!twoSelected" class="star" />
        <StarFilled @click="select(2)" v-else class="star" />
        <Star @click="select(3)" v-if="!threeSelected" class="star" />
        <StarFilled @click="select(3)" v-else class="star" />
        <Star @click="select(4)" v-if="!fourSelected" class="star" />
        <StarFilled @click="select(4)" v-else class="star" />
        <Star @click="select(5)" v-if="!fiveSelected" class="star" />
        <StarFilled @click="select(5)" v-else class="star" />
    </div>
</template>

<script setup lang="ts">
import StarFilled from '@/components/icons/StarFilled.vue';
import Star from '@/components/icons/Star.vue';
import { ref } from 'vue';
import type { Stars } from '@/types';

const props = defineProps<{
    updateStars: (stars: Stars) => void
}>()

const oneSelected = ref(false)
const twoSelected = ref(false)
const threeSelected = ref(false)
const fourSelected = ref(false)
const fiveSelected = ref(false)

function select(stars: Stars) {
    unselectAll()
    oneSelected.value = true

    if (stars > 1) {
        twoSelected.value = true
    }
    if (stars > 2) {
        threeSelected.value = true
    }
    if (stars > 3) {
        fourSelected.value = true
    }
    if (stars > 4) {
        fiveSelected.value = true
    }

    props.updateStars(stars)
}

function unselectAll() {
    oneSelected.value = false
    twoSelected.value = false
    threeSelected.value = false
    fourSelected.value = false
    fiveSelected.value = false
}

</script>

<style scoped lang="scss">
.star {
    width: 24px;
    cursor: pointer;
}
</style>