import { create } from "zustand";
import { getAllhistory, getSavedReadings, saveReading } from "../api/mainapi";


const useSaveReadingstore = create((set,get)=>({
    history:[],
    saveRead:[],
    isLoading:false,
    getHistory: async () =>{
        set({isLoading:true})
        try {
            const resp = await getAllhistory()
            console.log(resp.data.data)
        } catch(error){
            console.error("Failed to fetch history:", error)
            set({history:[]})
        }finally {
            set({isLoading:false})
        }
    },
    saveReading: async (body) => {
        set({isLoading:true})
        try {
            const resp = await saveReading(body)
            console.log('resp', resp)
            return resp
        } finally {
            set({isLoading:false})
        }
    },
    getSavedReading: async () =>{
        set({isLoading:true})
        try {
            const resp = await getSavedReadings()
            set({ saveRead: resp.data.data || [] })
        } catch (error) {
            console.error("Failed to fetch saved readings:", error)
            set({saveRead:[]})
        }finally{
            set({isLoading:false})
        }
    }
}))

export default useSaveReadingstore