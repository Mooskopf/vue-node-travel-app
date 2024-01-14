<template>
    <div>
        <div v-if="level === 0">
            <h3>What is the name of the destination?</h3>
            <Input type="text" :errorEmpty="errorState" :updateInput="updateName" placehoder="Destination"
                @click="() => {errorState = false}" />
        </div>
        <div v-if="level === 1">
            <h3 class="text-big">What kind of vacation is this?</h3>
            <Select :error="errorState" :updateSelect="updateColor" placehoder="Destination" :options="options"
                @click="errorState = false" />
        </div>
        <button class="btn" @click="next">Confirm</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Select from '@/components/generic/Select.vue';
import Input from '@/components/generic/Input.vue';
import addDestination from '@/api/addDestination';

const errorState = ref(false)
const level = ref(0)
const name = ref("")
const color = ref("")

const options = ["City", "Beach", "Countryside"]

const props = defineProps<{
    closeModal: () => void
}>()

function updateName(value: string) {
    name.value = value
}

function updateColor(value: string) {
    switch (value) {
        case "City":
            color.value = "yellow"
            break
        case "Beach":
            color.value = "blue"
            break
        case "Countryside":
            color.value = "green"
    }
}

async function next() {
    if (level.value === 0 && name.value === "") {
        errorState.value = true
    } else if (level.value === 1 && color.value === "") {
        errorState.value = true
    } else {
        if (level.value === 1) {
            props.closeModal()
            const destination = {
                name: name.value,
                color: color.value
            }
            await addDestination(destination)
        } else {
            errorState.value = false
            level.value++
        }
    }
}

</script>

<style scoped lang="scss">
.text-big {
    margin-bottom: 20px;
}
</style>