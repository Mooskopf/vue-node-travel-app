import request from "@/helpers/request";
import { useDataStore } from "@/stores/datastore";
import getUserDestinationList from "./getUserDestinationList";

export default async function addToUserDestinationList(destination: string): Promise<boolean> {
    const dataStore = useDataStore()

    const data = {
        destination: destination,
        useremail: dataStore.useremail
    }

    let out = true

    await request("post", "/addtouserdestinationlist", data)
        .catch(err => {
            console.log(err)
            out = false
        })

    //Update List
    getUserDestinationList()

    return out
}