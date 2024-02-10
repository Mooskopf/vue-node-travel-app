<template>
    <div>
        <h1>{{ name }}</h1>
        <button v-if="!datastore.userDestinationList.find(destination => destination.destination === name)" type="button"
            class="btn" @click="addToList">Add to my list</button>
        <div class="spacer"></div>
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
                <textarea :class="{ errorText: errorInput }" v-model="input" @focus="errorInput = false"></textarea>
            </div>
            <div class="error-text" v-if="errorInput">Please fill out this field</div>
            <div class="buttons">
                <button type="button" class="btn" @click="submitReview">Submit</button>
                <button type="button" class="btn" @click="addingReview = false">Back</button>
            </div>
        </div>
        <button v-else type="button" class="btn" @click="addingReview = true">Add a Review</button>
    </div>
    <Modal v-if="modalActive" :closeModal="() => modalActive = false">
        <div v-if="addToListSuccess" class="modal-text">
            Success
        </div>
        <div v-else class="modal-text">
            Something went wrong
        </div>
        <div class="center">
            <button type="button" class="btn" @click="() => modalActive = false">Close</button>
        </div>
    </Modal>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import addReview from '@/api/reviews/addReview';
import StarSelector from "@/components/destination/StarSelector.vue"
import type { Stars, Review, Destination } from "@/types"
import { useAuthStore } from '@/stores/authstore';
import { useDataStore } from '@/stores/datastore';
import StarViewer from '@/components/destination/StarViewer.vue';
import addToUserDestinationList from '@/api/user_destination_list/addToUserDestinationList';
import Modal from '@/components/generic/Modal.vue';

const route = useRoute()
const authstore = useAuthStore()
const datastore = useDataStore()

const addingReview = ref(false)
const errorInput = ref(false)
const input = ref("")
const stars = ref<Stars>(0)
const destination = ref<Destination | null>(null)
const name = ref("")
const modalActive = ref(false)
const addToListSuccess = ref(true)

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
        errorInput.value = true
        return
    }

    if (datastore.username) {

        const review: Review = {
            destination: name.value,
            author: datastore.username,
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

async function addToList() {
    const success = await addToUserDestinationList(name.value)

    modalActive.value = true

    if (success) {
        addToListSuccess.value = true
    } else {
        addToListSuccess.value = false
    }
}

</script>

<style scoped lang="scss">
.btn {
    margin-right: 10px;
}

.reviews {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-bottom: 30px;
}

.review-add {
    margin-top: 80px;
}

.review-text {
    margin-top: 10px
}

.buttons {
    margin-top: 20px;
}

.modal-text {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 20px;
}
</style>