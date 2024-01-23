import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Destination, type Review } from '@/types'

export const useDataStore = defineStore('dataStore', () => {
    const destinations = ref<Destination[]>([])
    const username = ref(localStorage.getItem("username"))
    const useremail = ref(localStorage.getItem("useremail"))
    const reviews = ref<Review[] | null>(null)

    return { destinations, username, useremail, reviews }
})
