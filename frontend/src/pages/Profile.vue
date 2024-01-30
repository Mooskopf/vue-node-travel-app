<template>
    <h1>{{ datastore.username }}</h1>
    <h2>My Destinations</h2>
    <div class="destinations">
        <div class="dest" v-for="(destination, index) in datastore.userDestinationList" :key="index">
            <DestinationComponent :destination="getDestination(destination.destination)" />
            <div v-if="destination.note !== ''">
                <div class="note">
                    {{ destination.note }}
                </div>
                <button type="button" class="btn" @click="updateNoteFromDestination(destination.destination, '')">
                    Remove Note
                </button>
                <button type="button" class="btn" @click="openModalforNote(destination.destination, destination.note)">
                    Edit Note
                </button>
            </div>
            <div v-else>
                <button type="button" class="btn" @click="openModalforNote(destination.destination)">
                    Add Note
                </button>
            </div>
            <div class="remove-btn">
                <button type="button" class="btn background-red"
                    @click="deleteFromUserDestinationList(destination.destination)">
                    Remove Destination
                </button>
            </div>
        </div>
    </div>
    <div class="spacer"></div>
    <h2>My Reviews</h2>
    <div class="destinations">
        <div v-for="(review, index) in datastore.reviews" :key="index">
            <DestinationComponent :destination="getDestination(review.destination)" class="dest" />
            {{ review.destination }}
            <StarViewer :stars="review.stars" />
            <div class="review-text">{{ review.text }}</div>
        </div>
    </div>
    <Modal v-if="modalActive" :closeModal="() => modalActive = false">
        <div>
            <textarea :class="{ errorText: errorInput }" v-model="noteInput" @focus="errorInput = false"></textarea>
        </div>
        <div class="error-text" v-if="errorInput">Please fill out this field</div>
        <button type="button" class="btn submit-btn" @click="updateNote">Submit</button>
    </Modal>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/datastore';
import getReviews from "@/api/reviews/getReviews"
import getUserDestinationList from "@/api/user_destination_list/getUserDestinationList"
import deleteFromUserDestinationList from '@/api/user_destination_list/deleteFromUserDestinationList';
import updateNoteFromDestination from "@/api/user_destination_list/updateNoteFromDestination"
import { onMounted } from 'vue';
import StarViewer from '@/components/destination/StarViewer.vue';
import DestinationComponent from "@/components/destination/Destination.vue";
import { type Destination } from '@/types'
import Modal from '@/components/generic/Modal.vue';
import { ref } from 'vue';

const datastore = useDataStore()

const modalActive = ref(false)
const noteInput = ref("")
const errorInput = ref(false)
const currentDestination = ref("")

onMounted(() => {
    getReviews()
    getUserDestinationList()
})

function getDestination(name: string): Destination | undefined {
    return datastore.destinations.find(destination => destination.name === name)
}

function openModalforNote(destination: string, note?: string) {
    if (note) {
        noteInput.value = note
    }
    currentDestination.value = destination
    modalActive.value = true
}

function updateNote() {

    if (noteInput.value === "") {
        errorInput.value = true
        return
    }

    modalActive.value = false
    updateNoteFromDestination(currentDestination.value, noteInput.value)
    noteInput.value = ""
}
</script>

<style scoped lang="scss">
.destinations {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 40px;

    .btn {
        margin-top: 16px;
    }
}

.note {
    margin-top: 20px;
    font-size: 1.2rem;
}

.dest {
    margin-bottom: 20px;
}

.review-text {
    margin-top: 10px;
}

.submit-btn {
    margin-top: 20px;
}

.remove-btn {
    margin-top: 20px;
}
</style>