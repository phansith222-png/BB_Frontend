import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { forgotPasswordSchema } from "../validations/schema"
import useUserStore from "../stores/userStores"

function ForgotPasswordForm() {
    const forgotPassword = useUserStore(state => state.forgotPassword)
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onTouched"
    })
    const { errors, isSubmitting } = formState

    const onSubmit = async (data) => {
        try {
            const resp = await forgotPassword(data)
            toast.success(resp.data.message)
            document.getElementById("forgotPassword-form").close()
            reset()
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message
            toast.error(errMsg)
        }
    }

    return (
        <div className="flex flex-col gap-4 my-2">
            <div className="flex justify-between w-full items-center">
                <p className="text-4xl font-bold font-cormorant text-gray-900">Forgot Password</p>
                <form method="dialog">
                    <button onClick={() => reset()} className="btn btn-sm btn-circle btn-ghost text-gray-500">
                        <X size={20} />
                    </button>
                </form>
            </div>
            <p className="text-gray-500 text-sm font-light mt-1">
                Enter your email or username and we'll send you a reset link.
            </p>
            <div className="divider text-base-content/30 uppercase text-xs tracking-widest my-0"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="flex flex-col gap-4" disabled={isSubmitting}>
                    <div className="form-control">
                        <label className="floating-label transition-all duration-300">
                            <span className="font-serif">Email or Username</span>
                            <input
                                type="text"
                                placeholder="Email or Username"
                                className={`input bg-white border-gray-200 focus:border-[#B59F84] focus:ring-1 focus:ring-[#B59F84] w-full transition-all duration-300 ${errors.identity ? "input-error" : ""}`}
                                {...register("identity")}
                            />
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
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        animate={isSubmitting ? { boxShadow: ["0px 0px 0px rgba(181,159,132,0)", "0px 0px 20px rgba(181,159,132,0.45)", "0px 0px 0px rgba(181,159,132,0)"] } : {}}
                        transition={{ boxShadow: { duration: 1.4, repeat: Infinity, ease: "easeInOut" } }}
                        className="btn btn-primary w-full text-secondary font-bold text-lg rounded-lg shadow-lg h-12 font-serif"
                    >
                        {isSubmitting ? <><span className="loading loading-ring loading-sm" />Sending...</> : "Send Reset Link"}
                    </motion.button>
                </fieldset>
            </form>
        </div>
    )
}

export default ForgotPasswordForm
