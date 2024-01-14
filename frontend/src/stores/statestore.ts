import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useStateStore = defineStore('stateStore', () => {
    const user = ref<User | null>(null)

    return { user }
})
