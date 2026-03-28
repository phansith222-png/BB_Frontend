import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { mainapi } from "../api/mainapi"
import { Slide, toast } from "react-toastify"
import { registerSchema } from "../validations/schema"


function RegisterForm() {
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
        defaultValues: {
            identity: "", username: "", password: "", zodiac: "", dateOfBirth: "", firstName: "", lastName: "", confirmPassword: ""
        }
    })

    const { errors, isSubmitting } = formState

    const onSubmit = async (data) => {
        try {
            console.log(data)
            await new Promise(resolve => setTimeout(resolve, 2000))
            const resp = await mainapi.post('/auth/register', data)
            toast.success(JSON.stringify(resp.data.message), { transition: Slide, autoClose: 2000 })
            document.getElementById("createUser-form").close()
            reset()
        } catch (error) {
            console.dir(error)
            const errMsg = error.response.data?.message || error.message
            toast.error(JSON.stringify(errMsg, { transition: Slide, autoClose: 2000 }))
        }
    }
    return (
        <div className="flex flex-col gap-4 my-2 ">
            <div className="flex justify-between w-full items-center">
                <p className="text-5xl font-bold flex gap-4 h-full">Sign Up
                    {isSubmitting && <span className="loading loading-ring loading-xl mt-2"></span>}
                </p>
                <form method="dialog">
                    <button onClick={() => reset()} className="btn">Close</button>
                </form>
            </div>
            <div>
                <h4>Let's get you all sign up so you can access your personal account</h4>
            </div>
            <div className="divider text-base-content/30 uppercase text-xs tracking-widest my-0"></div>
            <form onSubmit={handleSubmit(onSubmit)}  >
                <fieldset className="flex flex-col gap-4" disabled={isSubmitting} >
                    <div className='form-control flex gap-5'>
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Firstname</span>
                            <input type="text " placeholder="Firstname" className="input input-lg input-primary w-full transition-all duration-300"
                                {...register('firstName')} />

                        </label>
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Lastname</span>
                            <input type="text " placeholder="Lastname" className="input input-lg input-primary w-full transition-all duration-300"
                                {...register('lastName')} />
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Email or Phone Number</span>
                            <input type="text " placeholder="Email or Phone Number" className="input input-lg input-primary w-full transition-all duration-300"
                                {...register('identity')} />
                            <p className="text-md text-red-400">{errors.identity?.message}</p>
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">zodiac</span>
                            <input type="text " placeholder="zodiac" className="input input-lg input-primary w-full transition-all duration-300"
                                {...register('zodiac')} />
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Date of birth</span>
                            <input type="date" placeholder="Date of birth" className="input input-lg input-primary w-full transition-all duration-300"
                                {...register("dateOfBirth")} />
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Username</span>
                            <input type="text " placeholder="Username" className="input input-lg input-primary w-full transition-all duration-300"
                                {...register('username')} />
                            <p className="text-md text-red-400">{errors.username?.message}</p>
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Password</span>
                            <input type="text " placeholder="Password" className="input input-lg input-primary w-full transition-all duration-300"
                                {...register('password')} />
                            <p className="text-md text-red-400">{errors.password?.message}</p>
                        </label>
                    </div>
                    <div className='form-control'>
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Confirm Password</span>
                            <input type="text " placeholder="Confirm Password" className="input input-lg input-primary w-full transition-all duration-300"
                                {...register("confirmPassword")} />
                            <p className="text-md text-red-400">{errors.confirmPassword?.message}</p>
                        </label>
                    </div>
                    <button className="btn btn-primary w-full text-secondary font-bold  btn-block text-lg  rounded-lg shadow-lg h-12 font-serif">Sign up</button>
                    <button onClick={() => reset()} className="btn btn-ghost btn-block font-bold text-secondary text-md hover:bg-primary/10 font-serif" >Clear</button>
                </fieldset>
            </form>
        </div>
    )
}

export default RegisterForm