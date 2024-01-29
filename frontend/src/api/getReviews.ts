import request from "@/helpers/request";
import type { ReviewResponse } from "@/types";
import { useDataStore } from "@/stores/datastore";
import { storeToRefs } from "pinia";

export default async function getReviews() {
    const { reviews, username } = storeToRefs(useDataStore())

    const data = {
        username: username.value
    }

    request("post", "/reviews", data).then((res: ReviewResponse) => {
        reviews.value = res.reviews
    }).catch(err => {
        console.log(err)
    })
}