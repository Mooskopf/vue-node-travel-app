<template>
    <div class="modal">
        <div class="modal-content">
            <div class="close" @click="props.closeModal()">X</div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    closeModal: Function,
}>()

</script>

<style scoped lang="scss">

.modal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.close{
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    font-size: 1.4rem;
}

.modal-content{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 80px 40px;
    width: fit-content;
}
    
</style>