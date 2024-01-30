import request from "@/helpers/request";
import { useDataStore } from "@/stores/datastore";
import getUserDestinationList from "./getUserDestinationList";

export default async function deleteFromUserDestinationList(destination: string) {
    const dataStore = useDataStore()

    const data = {
        destination: destination,
        useremail: dataStore.useremail
    }

    await request("delete", "/userdestinationlist", data)
        .catch(err => {
            console.log(err)
        })

    //Update List
    getUserDestinationList()

}