import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://dam-final.vercel.app/api/',
    // baseURL: 'http://localhost:3000/api/',
    headers: {
        "Content-Type": "application/json",
    }
})