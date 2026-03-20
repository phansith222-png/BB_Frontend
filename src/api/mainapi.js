import axios from "axios";

export const mainapi = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type' : 'application/json'
    }
})

export const apiRegister = async (body) => {
    return await mainapi.post('/api/auth/register',body)
}
