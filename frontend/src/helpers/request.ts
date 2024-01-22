import axios, { AxiosError, type AxiosResponse } from "axios";
import { useAuthStore } from "@/stores/authstore";

export default async function request(kind: string, path: string, data?: Object) {

    const authstore = useAuthStore()

    return axios({
        method: kind,
        url: import.meta.env.VITE_BACKEND_URL + path,
        headers: {
            "Authorization": authstore.token
        },
        data
    }).then((res: AxiosResponse) => {
        if (res.status === 403 && authstore.token) {
            authstore.logout()
        }

        if (res.status === 200) {
            return res.data
        } else {
            throw res
        }
    }).catch((err: AxiosError) => {
        if (err.response?.status === 403 && authstore.token) {
            authstore.logout()
        }
        throw err
    })
}