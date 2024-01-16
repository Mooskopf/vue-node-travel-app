import request from "@/helpers/request";
import type { User } from "@/types";
import { useAuthStore } from "@/stores/authstore";

export default async function register(userObject: User, password: string) {
    const authstore = useAuthStore()

    const data = {
        user: userObject,
        password: password
    }

    request("post", "/register", data).then(() => {
        authstore.login(userObject.email, password)
    }).catch(err => {
        console.log(err)
    })
}