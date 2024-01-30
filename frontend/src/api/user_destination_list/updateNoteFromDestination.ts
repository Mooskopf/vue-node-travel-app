import request from "@/helpers/request";
import { useDataStore } from "@/stores/datastore";
import getUserDestinationList from "./getUserDestinationList";

export default async function addToUserDestinationList(destination: string, note: string): Promise<boolean> {
    const dataStore = useDataStore()

    const data = {
        destination: destination,
        useremail: dataStore.useremail, 
        note: note
    }

    let out = true

    await request("put", "/userdestinationlist/updatenote", data)
        .catch(err => {
            console.log(err)
            out = false
        })

    //Update List
    getUserDestinationList()

    return out
}