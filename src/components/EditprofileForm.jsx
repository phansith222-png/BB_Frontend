import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast, ToastContainer, Zoom } from "react-toastify"
import { mainapi } from "../api/mainapi"
import { updateMeSchema } from "../validations/schema"

function EditprofileForm() {
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(updateMeSchema),
        mode: "onSubmit",
        defaultValues: {
            firstName: '', lastName: '', zodiac: '', dateOfBirth: '', identity: ''
        }
    })
    const { errors } = formState

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 3000))
            const resp = await mainapi.patch('/users/me', data)
            document.getElementById('register-form').close()
            toast.success(resp.data?.message, { transition: Zoom, autoClose: 4000 })
            reset()
        } catch (error) {
            console.dir(error)
            const errMsg = error.response?.data.message || error.message
            toast.error(errMsg, {
                transition: Zoom, autoClose: 3000, containerId: 'editprofile-form', position: 'top-center'
            })
        }
    }
    return (
        <div>
            <ToastContainer containerId="editprofile-form" />
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Please Insert Your Details</h2>
                <p className="text-gray-500 mt-2 text-sm">Fill in the information to update your profile</p>
            </div>
            <div className="divider my-6 border-t border-gray-100"></div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center flex-col p-3">
                    <div className="w-24  h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50 hover:border-primary transition-colors cursor-pointer">
                        <span className="text-gray-400">Photo</span>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Firstname</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
                            placeholder="Firstname"
                            {...register('firstName')}
                        />
                        <p className="text-sm text-error">{errors.firstName?.message}</p>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Lastname</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
                            placeholder="Lastname"
                            {...register('lastName')}
                        />
                        <p className="text-sm text-error">{errors.lastName?.message}</p>
                    </div>
                </div>
                <div className="flex w-full flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Zodiac</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
                        placeholder="e.g. Aries"
                        {...register("zodiac")}
                    />
                    <p className="text-sm text-error">{errors.zodiac?.message}</p>
                </div>
                <div className="flex w-full flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Date of Birth</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
                        placeholder="23/01/2545"
                        {...register('dateOfBirth')}
                    />
                    <p className="text-sm text-error">{errors.dateOfBirth?.message}</p>
                </div>
                <div className="flex w-full flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Mobile</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
                        placeholder="080-5151983"
                        {...register('identity')}
                    />
                    <p className="text-sm text-error">{errors.identity?.message}</p>
                </div>
                <div className="flex w-full flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50"
                        placeholder="aa@gmail.com"
                        {...register('identity')}
                    />
                    <p className="text-sm text-error">{errors.identity?.message}</p>
                </div>
                <button className="w-full bg-secondary hover:bg-primary-focus text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98]">Save Changes</button>
                <button className="btn btn-ghost w-full text-secondary font-bold  btn-block text-lg  rounded-lg shadow-lg h-12 font-serif" onClick={() => reset()}>Clear</button>
            </form>
            <div>
            </div>
        </div>
    )
}
export default EditprofileForm