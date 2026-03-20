import { create } from "zustand"
import { mainapi } from "../api/mainapi"

const useUserStore = create((set,get)=> ({
    user:null,
    token: '',
    login: async (body) => {
        const resp = await mainapi.post('/api/auth/login',body)
        set({token : resp.data.token,user:resp.data.user,profile:resp.data.userInfo})
        return resp
    },
    logout: () => {set({token: '',user:null})}
}))

export default useUserStore