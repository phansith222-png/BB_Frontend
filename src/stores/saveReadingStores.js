import { create } from "zustand";
import { deleteJournal, getAllhistory, getJournal, getSavedReadings, saveReading } from "../api/mainapi";
import { toast } from "react-toastify";


const useSaveReadingstore = create((set, get) => ({
    history: [],
    saveRead: [],
    journalReading: [],
    isLoading: false,
    getHistory: async () => {
        set({ isLoading: true })
        try {
            const resp = await getAllhistory()
            return resp
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
            toast.error(errorMessage);
            set({ history: [] })
        } finally {
            set({ isLoading: false })
        }
    },
    saveReading: async (body) => {
        set({ isLoading: true })
        try {
            const resp = await saveReading(body)
            return resp
        } finally {
            set({ isLoading: false })
        }
    },
    getSavedReading: async () => {
        set({ isLoading: true })
        try {
            const resp = await getSavedReadings()
            set({ saveRead: resp.data.data || [] })
            return resp
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
            toast.error(errorMessage);
            set({ saveRead: [] })
        } finally {
            set({ isLoading: false })
        }
    },
    getJournal: async (id) => {
        set({ isLoading: true })
        try {
            const resp = await getJournal(id)
            set({ journalReading: resp.data.data })
            return resp
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false })
        }
    },
    deleteJournal: async (id) => {
        set({ isLoading: true })
        try {
            const resp = await deleteJournal(id)
            return resp
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false })
        }
    }
}))

export default useSaveReadingstore