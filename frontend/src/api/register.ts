import request from "@/helpers/request";
import { useStateStore } from "@/stores/statestore";
import { storeToRefs } from "pinia";
import type { User } from "@/types";

export default async function register(userObject: User, password: string) {
    const { user } = storeToRefs(useStateStore())

    const data = {
        userObject,
        password
    }

    request("post", "/register", data).then(() => {
        user.value = userObject
    }).catch(err => {
        console.log(err)
    })
}