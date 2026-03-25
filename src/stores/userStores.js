import { create } from "zustand"
import { mainapi } from "../api/mainapi"
import { createJSONStorage, persist } from "zustand/middleware"

const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: '',
            profile: null,
            login: async (body) => {
                const resp = await mainapi.post('/auth/login', body)
                set({
                    token: resp.data.token, user: resp.data.user, profile: resp.data.userInfo
                })
                return resp
            },
            logout: () => {
                set({ token: '', user: null ,profile:null})
            }
        }),
        {
            name: 'userState',
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default useUserStore