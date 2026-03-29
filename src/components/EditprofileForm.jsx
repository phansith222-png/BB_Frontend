import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast, ToastContainer, Zoom } from "react-toastify"
import { mainapi } from "../api/mainapi"
import { updateMeSchema } from "../validations/schema"
import { useState } from "react"
import uploadCloud from "../utils/uploadCloud"
import useUserStore from "../stores/userStores"

function EditprofileForm() {
    const getProfile = useUserStore(state => state.getProfile)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(updateMeSchema),
        mode: "onSubmit",
        defaultValues: {
            firstName: '', lastName: '', zodiac: '', dateOfBirth: '', identity: ''
        }
    })
    const { errors } = formState

    const handleFilechange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            setPreview(URL.createObjectURL(selectedFile))
        }
    }
    const onSubmit = async (data) => {
        let imageUrl = ''
        setLoading(true)
        try {
            if (file) {
                imageUrl = await uploadCloud(file)
            }
            await new Promise((resolve) => setTimeout(resolve, 3000))
            const payload = {
                ...data,
                ...(imageUrl && { profileImage: imageUrl })
            }
            const resp = await mainapi.patch('/users/me', payload)
            await getProfile()
            toast.success(resp.data?.message, { transition: Zoom, autoClose: 4000 })
            reset()
            setFile(null)
            setPreview(null)
        } catch (error) {
            console.dir(error)
            const errMsg = error.response?.data.message || error.message
            toast.error(errMsg, {
                transition: Zoom, autoClose: 3000, containerId: 'editprofile-form', position: 'top-center'
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="w-full">
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-start mb-8 border-b border-base-200 pb-6">
                    <label className="btn btn-outline border-base-300 btn-sm text-base-content cursor-pointer hover:bg-base-200 transition-colors">
                        <input type="file" accept="image/*" className="hidden" onChange={handleFilechange} />
                        Upload new avatar
                    </label>
                    {file && <span className="text-xs text-primary mt-2">File selected: {file.name}</span>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-widest text-base-content/50 mb-2">First Name</label>
                        <input type="text" className="input input-bordered w-full bg-transparent" {...register('firstName')} />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-widest text-base-content/50 mb-2">Last Name</label>
                        <input type="text" className="input input-bordered w-full bg-transparent" {...register('lastName')} />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-widest text-base-content/50 mb-2">Zodiac</label>
                        <input type="text" className="input input-bordered w-full bg-transparent" {...register("zodiac")} />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold uppercase tracking-widest text-base-content/50 mb-2">Date of Birth</label>
                        <input type="text" placeholder="DD/MM/YYYY" className="input input-bordered w-full bg-transparent" {...register('dateOfBirth')} />
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-base-content/50 mb-2">Contact Info (Mobile/Email)</label>
                        <input type="text" className="input input-bordered w-full bg-transparent" {...register('identity')} />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => reset()} className="btn btn-ghost text-base-content">
                        Clear
                    </button>
                    <button type="submit" disabled={loading} className="btn btn-primary text-primary-content px-8">
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>

            </form>
        </div>
        // <div>
        //     <ToastContainer containerId="editprofile-form" />
        //     <div className="text-center mb-6">
        //         <h2 className="text-3xl font-bold text-gray-800">Please Insert Your Details</h2>
        //         <p className="text-gray-500 mt-2 text-sm">Fill in the information to update your profile</p>
        //     </div>
        //     <div className="divider my-6 border-t border-gray-100"></div>
        //     <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        //         <div className="flex items-center flex-col p-3">
        //             <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50 hover:border-primary transition-colors cursor-pointer overflow-hidden">
        //                 <input
        //                     type="file"
        //                     accept="image/*"
        //                     className="hidden"
        //                     onChange={handleFilechange}
        //                 />
        //                 {preview ? (
        //                     <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
        //                 ) : (
        //                     <span className="text-gray-400">Photo</span>
        //                 )}
        //             </label>
        //         </div>
        //         <div className="flex">
        //             <div className="flex-1">
        //                 <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Firstname</label>
        //                 <input
        //                     type="text"
        //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
        //                     placeholder="Firstname"
        //                     {...register('firstName')}
        //                 />
        //                 <p className="text-sm text-error">{errors.firstName?.message}</p>
        //             </div>
        //             <div className="flex-1">
        //                 <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Lastname</label>
        //                 <input
        //                     type="text"
        //                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
        //                     placeholder="Lastname"
        //                     {...register('lastName')}
        //                 />
        //                 <p className="text-sm text-error">{errors.lastName?.message}</p>
        //             </div>
        //         </div>
        //         <div className="flex w-full flex-col">
        //             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Zodiac</label>
        //             <input
        //                 type="text"
        //                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
        //                 placeholder="e.g. Aries"
        //                 {...register("zodiac")}
        //             />
        //             <p className="text-sm text-error">{errors.zodiac?.message}</p>
        //         </div>
        //         <div className="flex w-full flex-col">
        //             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Date of Birth</label>
        //             <input
        //                 type="text"
        //                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
        //                 placeholder="23/01/2545"
        //                 {...register('dateOfBirth')}
        //             />
        //             <p className="text-sm text-error">{errors.dateOfBirth?.message}</p>
        //         </div>
        //         <div className="flex w-full flex-col">
        //             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Mobile</label>
        //             <input
        //                 type="text"
        //                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
        //                 placeholder="080-5151983"
        //                 {...register('identity')}
        //             />
        //             <p className="text-sm text-error">{errors.identity?.message}</p>
        //         </div>
        //         <div className="flex w-full flex-col">
        //             <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
        //             <input
        //                 type="email"
        //                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
        //                 placeholder="aa@gmail.com"
        //                 {...register('identity')}
        //             />
        //             <p className="text-sm text-error">{errors.identity?.message}</p>
        //         </div>
        //         <button disabled={loading} className="w-full bg-secondary hover:bg-primary-focus text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50">
        //             {loading ? "Saving..." : "Save Changes"}
        //         </button>
        //         <button className="btn btn-ghost w-full text-secondary font-bold  btn-block text-lg  rounded-lg shadow-lg h-12 font-serif" onClick={() => reset()}>Clear</button>
        //     </form>
        //     <div>
        //     </div>
        // </div>
    )
}
export default EditprofileForm