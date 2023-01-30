import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios'


declare module "axios" {
    interface AxiosResponse<T = any> {
        [Name: string]: any
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}



const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 4000
})

instance.interceptors.request.use((config) => {
    return config
}, (err) => {
    return Promise.reject(err)
})
instance.interceptors.response.use((res) => {
    return Promise.resolve(res.data)
}, (err) => {
    return Promise.reject(err)
})

export default instance