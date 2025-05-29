import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https:/dam-final.vercel.app/api/',
    headers: {
        "Content-Type": "application/json",
    }
})