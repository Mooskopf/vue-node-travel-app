<template>
    <div class="input-container">
        <div class="input" :class="{ err: error || errorEmpty }">
            <div class="placeholder" v-if="value !== ''">{{ props.placehoder }}</div>
            <input :type="type" v-model="value" @change="updateInput(value)" :placeholder="props.placehoder" />
        </div>
        <div class="error-text" v-if="error && error !== ''">{{ error }}</div>
        <div class="error-text" v-if="errorEmpty">Please fill out this field</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    type: "text" | "password" | "email",
    error?: string,
    errorEmpty: boolean,
    placehoder: string,
    updateInput: (input: string) => void
}>()

const value = ref("")

</script>

<style scoped lang="scss">
.placeholder {
    font-size: 0.8rem;
    color: var(--clr-text-disabled);
}

.input-container {
    margin: 10px 0px;
}

.input {
    padding: 4px 10px;
    border: 2px solid black;
    border-radius: 16px;

    &::placeholder {
        font-size: 0.8rem;
        color: var(--clr-text-disabled);
    }
}

input {
    border: none;
    outline: none;
    width: 100%;
}
</style>