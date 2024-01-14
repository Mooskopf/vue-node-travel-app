import axios, { AxiosError, type AxiosResponse } from "axios";

export default async function request(kind: string, path: string, data?: Object) {

    return axios({
        method: kind,
        url: import.meta.env.VITE_BACKEND_URL + path,
        data
    }).then((res: AxiosResponse) => {
        if (res.status === 200) {
            return res.data
        } else {
            throw res
        }
    }).catch((err: AxiosError) => {
        throw err
    })
}