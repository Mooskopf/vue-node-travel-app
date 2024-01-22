import request from "@/helpers/request";
import type { User } from "@/types";
import { useAuthStore } from "@/stores/authstore";

export default async function register(userObject: User, password: string) {
    const authstore = useAuthStore()

    const data = {
        user: userObject,
        password: password
    }

    let out = false

    await request("post", "/register", data).then(() => {
        authstore.login(userObject.email, password)
    }).catch(err => {
        if (err.response.status === 500) {
            if (err.response.data.msg === "Email exists") {
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