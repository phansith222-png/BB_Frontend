import { create } from "zustand";
import { getCard } from "../api/mainapi";
import { toast } from "react-toastify";

const useCardStore = create((set, get) => ({
    card: [],
    isLoading: false,
    getCard: async () => {
        set({ isLoading: true })
        try {
            const resp = await getCard()
            set({ card: resp.data.data })
        } catch (error) {
            set({ isLoading: false })
            const errorMessage = error.response?.data?.message || error.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
            toast.error(errorMessage);
            throw error
        }
    }
}))


export default useCardStore