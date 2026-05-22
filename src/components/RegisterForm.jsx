import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { Eye, EyeOff, X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { mainapi } from "../api/mainapi"
import { Slide, toast } from "react-toastify"
import { registerSchema } from "../validations/schema"

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched',
        defaultValues: {
            identity: "", username: "", password: "", zodiac: "", dateOfBirth: "", firstName: "", lastName: "", confirmPassword: ""
        }
    })

    const { errors, isSubmitting } = formState

    const onSubmit = async (data) => {
        try {
            const resp = await mainapi.post('/auth/register', data)
            toast.success(resp.data.message, { transition: Slide, autoClose: 2000 })
            document.getElementById("createUser-form").close()
            reset()
        } catch (error) {
            console.dir(error)
            const errMsg = error.response?.data?.message || error.message
            toast.error(errMsg)
        }
    }

    return (
        <div className="flex flex-col gap-4 my-2">
            <div className="flex justify-between w-full items-center">
                <p className="text-4xl font-bold font-cormorant text-gray-900">Sign Up</p>
                <form method="dialog">
                    <button onClick={() => reset()} className="btn btn-sm btn-circle btn-ghost text-gray-500">
                        <X size={20} />
                    </button>
                </form>
            </div>
            <div className="text-gray-500 text-sm font-light mt-2">
                <h4>Let's get you all sign up so you can access your personal account</h4>
            </div>
            <div className="divider text-base-content/30 uppercase text-xs tracking-widest my-0"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="flex flex-col gap-4" disabled={isSubmitting}>
                    <div className="form-control flex gap-5">
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Firstname</span>
                            <input type="text" placeholder="Firstname" className="input bg-white border-gray-200 focus:border-[#B59F84] w-full transition-all duration-300"
                                {...register('firstName')} />
                        </label>
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Lastname</span>
                            <input type="text" placeholder="Lastname" className="input bg-white border-gray-200 focus:border-[#B59F84] w-full transition-all duration-300"
                                {...register('lastName')} />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Email or Phone Number</span>
                            <input type="text" placeholder="Email or Phone Number"
                                className={`input bg-white border-gray-200 focus:border-[#B59F84] w-full transition-all duration-300 ${errors.identity ? 'input-error' : ''}`}
                                {...register('identity')} />
                            <AnimatePresence>
                                {errors.identity?.message && (
                                    <motion.p key="identity-err" className="text-sm text-error mt-1"
                                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}>
                                        {errors.identity.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Zodiac</span>
                            <input type="text" placeholder="Zodiac" className="input bg-white border-gray-200 focus:border-[#B59F84] w-full transition-all duration-300"
                                {...register('zodiac')} />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="floating-label transition-all duration-300">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Date of birth</span>
                            <input type="date" className="input bg-white border-gray-200 focus:border-[#B59F84] w-full transition-all duration-300"
                                {...register("dateOfBirth")} />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Username</span>
                            <input type="text" placeholder="Username"
                                className={`input bg-white border-gray-200 focus:border-[#B59F84] w-full transition-all duration-300 ${errors.username ? 'input-error' : ''}`}
                                {...register('username')} />
                            <AnimatePresence>
                                {errors.username?.message && (
                                    <motion.p key="username-err" className="text-sm text-error mt-1"
                                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}>
                                        {errors.username.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Password</span>
                            <div className="relative w-full">
                                <input type={showPassword ? "text" : "password"} placeholder="Password"
                                    className={`input bg-white border-gray-200 focus:border-[#B59F84] w-full transition-all duration-300 pr-10 ${errors.password ? 'input-error' : ''}`}
                                    {...register('password')} />
                                <button type="button" tabIndex={-1}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(v => !v)}>
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <AnimatePresence>
                                {errors.password?.message && (
                                    <motion.p key="password-err" className="text-sm text-error mt-1"
                                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}>
                                        {errors.password.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Confirm Password</span>
                            <div className="relative w-full">
                                <input type={showConfirm ? "text" : "password"} placeholder="Confirm Password"
                                    className={`input bg-white border-gray-200 focus:border-[#B59F84] w-full transition-all duration-300 pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                                    {...register("confirmPassword")} />
                                <button type="button" tabIndex={-1}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowConfirm(v => !v)}>
                                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <AnimatePresence>
                                {errors.confirmPassword?.message && (
                                    <motion.p key="confirm-err" className="text-sm text-error mt-1"
                                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}>
                                        {errors.confirmPassword.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </label>
                    </div>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        animate={isSubmitting ? { boxShadow: ["0px 0px 0px rgba(181,159,132,0)", "0px 0px 20px rgba(181,159,132,0.45)", "0px 0px 0px rgba(181,159,132,0)"] } : {}}
                        transition={{ boxShadow: { duration: 1.4, repeat: Infinity, ease: "easeInOut" } }}
                        className="btn btn-primary w-full text-secondary font-bold btn-block text-lg rounded-lg shadow-lg h-12 font-serif"
                    >
                        {isSubmitting ? <><span className="loading loading-ring loading-sm" />Signing up...</> : "Sign up"}
                    </motion.button>
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => reset()}
                        className="btn btn-ghost btn-block font-bold text-secondary text-md hover:bg-primary/10 font-serif"
                    >
                        Clear
                    </motion.button>
                </fieldset>
            </form>
        </div>
    )
}

export default RegisterForm
