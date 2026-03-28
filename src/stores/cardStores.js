import { create } from "zustand";
import { getCard } from "../api/mainapi";

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
            console.error("fail to generate card data", error)
            throw error
        }
    }
}))


export default useCardStore