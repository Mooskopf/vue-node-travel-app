<template>
    <div class="select">
        <div class="selected" :class="{ err: error }" @click="extended = !extended">
            <div v-if="selected !== ''">{{ selected }}</div>
            <div class="placeholder" v-else>{{ props.placehoder }}</div>
            <ChevronDown :class="{rotate: extended}" />
        </div>
        <div v-if="extended" class="extended">
            <div class="option" v-for="(option, index) in props.options" :key="index"
                :class="{ border: index !== props.options.length - 1 }" @click="select(option)">
                {{ option }}
            </div>
        </div>
        <div class="error-text" v-if="error">Please choose an option</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChevronDown from '../icons/ChevronDown.vue';

const extended = ref(false)
const selected = ref("")

const props = defineProps<{
    error: boolean,
    placehoder: string,
    options: string[],
    updateSelect: (option: string) => void
}>()

function select(option: string) {
    extended.value = false
    selected.value = option
    props.updateSelect(option)
}
</script>

<style scoped lang="scss">
.select {
    cursor: pointer;
    margin: 10px 0px;
}

.selected {
    min-width: 200px;
    padding: 8px 16px;
    border: 2px solid black;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    svg{
        width: 16px;
        height: auto;
        justify-self: right;
        align-self: center;
        transition: 0.2s ease-in-out;
    }
}

.rotate{
    transform: rotate(-180deg);
}

.placeholder{
    color: var(--clr-text-disabled)
}

.extended {
    border-bottom: 2px solid black;
    border-left: 2px solid black;
    border-right: 2px solid black;
    border-radius: 8px;
}

.option {
    padding: 6px 16px;
}

.border {
    border-bottom: 1px solid var(--clr-text-disabled)
}
</style>