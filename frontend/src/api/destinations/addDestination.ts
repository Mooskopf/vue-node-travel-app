import request from "@/helpers/request";
import type { Destination } from "@/types";
import { useDataStore } from "@/stores/datastore";
import { storeToRefs } from "pinia";

export default async function addDestination(destination: Destination): Promise<boolean> {
    const { destinations } = storeToRefs(useDataStore())
    const data = {
        destination
    }

    let out = false

    await request("post", "/destinations/add", data).then(() => {
        destinations.value.push(destination)
    }).catch(err => {
        if (err.response.status === 500) {
            if (err.response.data.msg === "Destination exists") {
                out = true
            } else {
                console.log(err)
            }
        } else {
            console.log(err)
        }
    })

    return out
}