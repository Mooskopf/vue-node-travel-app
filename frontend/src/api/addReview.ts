import request from "@/helpers/request";
import type { Review } from "@/types";
import { useDataStore } from "@/stores/datastore";
import { storeToRefs } from "pinia";

export default async function addReview(review: Review, name: string) {
    const { destinations } = storeToRefs(useDataStore())

    const data = {
        destination: name,
        review: review
    }

    request("post", "/addreview", data).then(() => {
        destinations.value.forEach(destination => {
            if(destination.name === name){
                destination.reviews.push(review)
            }
        })
    }).catch(err => {
        console.log(err)
    })
}