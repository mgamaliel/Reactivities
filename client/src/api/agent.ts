import axios, { AxiosResponse } from 'axios'
import { Activity } from '../types'

axios.defaults.baseURL = 'http://localhost:3000/api'

const delay = (ms: number) => (response: AxiosResponse) => {
    return new Promise<AxiosResponse>((resolve) => setTimeout(() => resolve(response), ms))
}

type Request = {
    get<T = any>(url: string): Promise<T>
    post<T = any>(url: string, body: {}): Promise<T>
    put<T = any>(url: string, body: {}): Promise<T>
    del<T = any>(url: string): Promise<T>
}
const request: Request = {
    get: (url) =>
        axios
            .get(url)
            .then(delay(1000))
            .then((response) => response.data),
    post: (url, body) =>
        axios
            .post(url, body)
            .then(delay(1000))
            .then((response) => response.data),
    put: (url, body) =>
        axios
            .put(url, body)
            .then(delay(1000))
            .then((response) => response.data),
    del: (url) =>
        axios
            .delete(url)
            .then(delay(1000))
            .then((response) => response.data)
}

type Activities = {
    list(): Promise<Activity[]>
    details(id: string): Promise<Activity>
    create(activity: Activity): Promise<void>
    update(activity: Activity): Promise<void>
    delete(id: string): Promise<void>
}
const activities: Activities = {
    list: () => request.get<Activity[]>('/activities'),
    details: (id) => request.get<Activity>(`/activities/${id}`),
    create: (activity) => request.post('/activities', activity),
    update: (activity) => request.put(`/activities/${activity.id}`, activity),
    delete: (id) => request.del(`/activities/${id}`)
}

export default { activities }
