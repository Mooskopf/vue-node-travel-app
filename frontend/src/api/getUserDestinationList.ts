import request from "@/helpers/request";
import { useDataStore } from "@/stores/datastore";
import { storeToRefs } from "pinia";

export default async function getUserDestinationList() {
    const dataStore = useDataStore()
    const { userDestinationList, useremail } = storeToRefs(dataStore)

    const data = {
        useremail: useremail.value
    }

    request("post", "/getuserdestinationlist", data).then(res => {
        userDestinationList.value = res.destinations
    }).catch(err => {
        console.log(err)
    })
}