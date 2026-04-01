import { create } from "zustand"
import { mainapi } from "../api/mainapi"
import { createJSONStorage, persist } from "zustand/middleware"
import useReadStore from "./readStores"
import { toast } from "react-toastify"
const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: '',
            profile: null,
            login: async (body) => {
                const resp = await mainapi.post('/auth/login', body)
                set({
                    token: resp.data.token, user: resp.data.user, profile: { user: resp.data.user, userInfo: resp.data.userInfo }
                })
                return resp
            },
            logout: () => {
                set({ token: '', user: null, profile: null })
                useReadStore.getState().clearDaily();
            },
            getProfile: async () => {
                try {
                    const resp = await mainapi.get("/users/me")
                    set({ profile: resp.data })
                    return resp
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
                    toast.error(errorMessage);
                }
            }
        }),
        {
            name: 'userState',
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default useUserStore