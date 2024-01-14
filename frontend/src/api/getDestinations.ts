import request from "@/helpers/request";
import type { DestinationResponse } from "@/types";
import { useDataStore } from "@/stores/dataStore";
import { storeToRefs } from "pinia";

export default async function getDestinations() {
    const { destinations } = storeToRefs(useDataStore())

    request("get", "/getdestinations").then((res: DestinationResponse) => {
        destinations.value = res.destinations
    }).catch(err => {
        console.log(err)
    })
}