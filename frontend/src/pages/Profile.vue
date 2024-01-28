<template>
    <h1>{{ datastore.username }}</h1>
    <h2>My Destinations</h2>
    <div class="destinations">
        <DestinationComponent v-for="(destination, index) in datastore.userDestinationList" :key="index"
            :destination="getDestination(destination)" class="dest" />
    </div>
    <h2>My Reviews</h2>
    <div class="destinations">
        <div v-for="(review, index) in datastore.reviews" :key="index">
            <DestinationComponent :destination="getDestination(review.destination)" class="dest" />
            {{ review.destination }}
            <StarViewer :stars="review.stars" />
            <div class="review-text">{{ review.text }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/datastore';
import getReviews from "@/api/getReviews"
import getUserDestinationList from "@/api/getUserDestinationList"
import { onMounted } from 'vue';
import StarViewer from '@/components/destination/StarViewer.vue';
import DestinationComponent from "@/components/destination/Destination.vue";
import { type Destination } from '@/types'

const datastore = useDataStore()

onMounted(() => {
    getReviews()
    getUserDestinationList()
})

function getDestination(name: string): Destination | undefined {
    return datastore.destinations.find(destination => destination.name === name)
}
</script>

<style scoped lang="scss">
.destinations {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 40px;
}

.dest {
    margin-bottom: 20px;
}

.review-text {
    margin-top: 10px;
}
</style>