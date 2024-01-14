import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Destination } from '@/types'

export const useDataStore = defineStore('stateStore', () => {
    const destinations = ref<Destination[]>([])

    return { destinations }
})
