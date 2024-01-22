<template>
    <div>
        <h1>{{ name }}</h1>
        <h2 v-if="destination?.reviews.length && destination?.reviews.length > 0">Reviews</h2>
        <div class="reviews">
            <div class="review" v-for="(review, index) in destination?.reviews" :key="index">
                <h3>{{ review.author }}</h3>
                <StarViewer :stars="review.stars" />
                <div class="review-text">{{ review.text }}</div>
            </div>
        </div>
        <div class="review-add" v-if="addingReview">
            <h3>Review</h3>
            <StarSelector :updateStars="updateStars" />
            <div>
                <textarea v-model="input" @focus="errorInput = false"></textarea>
            </div>
            <div class="error-text" v-if="errorInput">Please fill out this field</div>
            <button type="button" class="btn" @click="submitReview">Submit</button>
            <button type="button" class="btn" @click="addingReview = false">Back</button>
        </div>
        <button v-else type="button" class="btn" @click="addingReview = true">Add a Review</button>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import addReview from '@/api/addReview';
import StarSelector from "@/components/destination/StarSelector.vue"
import type { Stars, Review, Destination } from "@/types"
import { useStateStore } from '@/stores/statestore';
import { useAuthStore } from '@/stores/authstore';
import { useDataStore } from '@/stores/datastore';
import StarViewer from '@/components/destination/StarViewer.vue';

const route = useRoute()
const stateStore = useStateStore()
const authstore = useAuthStore()
const datastore = useDataStore()

const addingReview = ref(false)
const errorInput = ref(false)
const input = ref("")
const stars = ref<Stars>(0)
const destination = ref<Destination | null>(null)
const name = ref("")

onMounted(() => {
    name.value = typeof route.params.destination === "string" ?
        route.params.destination.charAt(0).toUpperCase() + route.params.destination.slice(1) : ""


    datastore.destinations.forEach(dest => {
        if (dest.name === name.value) {
            destination.value = dest
        }
    })
})

function submitReview() {
    if (input.value === "") {
        errorInput.value = false
        return
    }

    if (stateStore.user) {

        const review: Review = {
            author: stateStore.user?.name,
            stars: stars.value,
            text: input.value
        }

        addReview(review, name.value)

        datastore.destinations.forEach(dest => {
            if (dest.name === name.value) {
                destination.value = dest
            }
        })

        input.value = ""
        stars.value = 0
        addingReview.value = false

    } else {
        authstore.logout()
    }
}

function updateStars(val: Stars) {
    stars.value = val
}

</script>

<style scoped lang="scss">
textarea {
    width: 80%;
    height: 200px;
    margin: 20px 0px;
    padding: 20px;
    resize: none;
    outline: none;
    border: 2px solid black;

    &:focus {
        border: 2px solid var(--clr-primary);
    }
}

.btn {
    margin-right: 10px;
}

.reviews {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-bottom: 30px;
}

.review-add{
    margin-top: 80px;
}

.review-text{
    margin-top: 10px
}
</style>