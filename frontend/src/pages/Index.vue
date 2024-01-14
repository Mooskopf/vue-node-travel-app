<template>
    <div class="destinations">
        <Destination v-for="(destination, index) in destinations" :key="index" :destination="destination">
        </Destination>
    </div>
    <button class="btn" @click="modalActive = true">Add Destination</button>
    <Modal v-if="modalActive" :closeModal="closeModal">
        <AddDestination :closeModal="closeModal" />
    </Modal>
</template>

<script setup lang="ts">
import Destination from "@/components/destination/Destination.vue";
import Modal from "@/components/generic/Modal.vue";
import AddDestination from "@/components/destination/AddDestination.vue";
import { ref } from "vue";
import { useDataStore } from "@/stores/dataStore";
import { storeToRefs } from "pinia";

const { destinations } = storeToRefs(useDataStore())
const modalActive = ref(false)

function closeModal(){
    modalActive.value = false
}

</script>

<style scoped lang="scss">
.destinations {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
}
</style>