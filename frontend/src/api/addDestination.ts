import request from "@/helpers/request";
import type { Destination } from "@/types";
import { useDataStore } from "@/stores/dataStore";
import { storeToRefs } from "pinia";

export default async function addDestination(destination: Destination) {
    const { destinations } = storeToRefs(useDataStore())
    const data = {
        destination
    }

    request("post", "/adddestination", data).then(() => {
        destinations.value.push(destination)
    }).catch(err => {
        console.log(err)
    })
}