import axios from "axios";

export default async (file) =>{
    const formData = new FormData()
    formData.append('file',file)
    formData.append('upload_preset','bigbode_unsigned')
    const resp = await axios.post('https://api.cloudinary.com/v1_1/dvpcypwok/image/upload', formData)
   
   console.log('uploadCloud : resp', resp.data)
   return resp.data.secure_url
}