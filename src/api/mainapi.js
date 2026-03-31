import axios from "axios";
import useUserStore from "../stores/userStores";

export const mainapi = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type' : 'application/json'
    }
})

mainapi.interceptors.request.use( config => {
  const token = useUserStore.getState().token
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export const initialRead = (body) => mainapi.post('/readings/init',body)

export const shuffleCard = (body) => mainapi.post('/readings/shuffle',body)

export const cutCard = (body) => mainapi.post('/readings/cut',body)

export const pickCard = (body) => mainapi.post('/readings/pick',body)

export const aiInterpret = (body) => mainapi.post(`/readings/ai-interpret`,body)

export const getAllSpread = () => mainapi.get('/readings/spread')
 
export const getSpreadIdApi = (id) => mainapi.get(`/readings/spread/${id}`)


export const saveReading = (body) => mainapi.post('/users/saved-readings',body)

export const getSavedReadings = () => mainapi.get('/users/saved-readings')

export const getJournal = (id) => mainapi.get(`/users/saved-readings/${id}`)

export const deleteJournal = (id) => mainapi.delete(`/users/saved-readings/${id}`)

export const getAllhistory = () =>mainapi.get('/users/history')





export const getCard = () => mainapi.get('/cards')