import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { Eye, EyeOff, Star } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router"
import { toast } from "react-toastify"
import { resetPasswordSchema } from "../validations/schema"
import useUserStore from "../stores/userStores"

function ResetPasswordPage() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const navigate = useNavigate()
    const resetPassword = useUserStore(state => state.resetPassword)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onTouched"
    })
    const { errors, isSubmitting } = formState

    const onSubmit = async (data) => {
        try {
            const resp = await resetPassword({ ...data, token })
            toast.success(resp.data.message)
            navigate('/login')
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message
            toast.error(errMsg)
        }
    }

    if (!token) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="flex min-h-screen items-center justify-center bg-gradient-to-r from-white to-primary/50 p-8">
                <div className="card bg-white shadow-sm p-10 max-w-md w-full text-center rounded-3xl flex flex-col gap-4">
                    <p className="text-3xl font-cormorant font-bold text-gray-900">ลิงก์ไม่ถูกต้อง</p>
                    <p className="text-gray-500 font-light">ลิงก์สำหรับรีเซ็ตรหัสผ่านไม่ถูกต้องหรือหมดอายุแล้ว</p>
                    <button className="btn btn-primary text-secondary font-bold font-serif" onClick={() => navigate('/login')}>
                        กลับไปหน้าเข้าสู่ระบบ
                    </button>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex min-h-screen items-center justify-center bg-gradient-to-r from-white to-primary/50 p-8">
            <div className="flex flex-col gap-6 w-full max-w-md">
                <div className="relative text-center mb-4">
                    <Star className="absolute -top-4 -left-6 text-primary w-4 h-4 animate-[pulse_6s_infinite]" />
                    <p className="text-5xl text-gray-900 font-cormorant font-bold mb-3 tracking-wide">Reset Password</p>
                    <Star className="absolute -bottom-2 -right-8 text-primary w-3 h-3 animate-[pulse_6s_infinite]" />
                </div>
                <p className="text-gray-500 font-light text-lg text-center">Enter your new password below.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="flex flex-col gap-5" disabled={isSubmitting}>
                        <div className="form-control">
                            <label className="floating-label transition-all duration-300">
                                <span className="text-gray-500 font-medium">New Password</span>
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New Password"
                                        className={`input input-lg w-full bg-white border-gray-200 focus:border-[#B59F84] focus:ring-1 focus:ring-[#B59F84] transition-all duration-300 rounded-xl pr-12 ${errors.password ? 'input-error' : ''}`}
                                        {...register('password')}
                                    />
                                    <button type="button" tabIndex={-1}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(v => !v)}>
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {errors.password?.message && (
                                        <motion.p key="password-err" className="text-sm text-error mt-1 ml-1"
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
                                <span className="text-gray-500 font-medium">Confirm Password</span>
                                <div className="relative w-full">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        className={`input input-lg w-full bg-white border-gray-200 focus:border-[#B59F84] focus:ring-1 focus:ring-[#B59F84] transition-all duration-300 rounded-xl pr-12 ${errors.confirmPassword ? 'input-error' : ''}`}
                                        {...register('confirmPassword')}
                                    />
                                    <button type="button" tabIndex={-1}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowConfirm(v => !v)}>
                                        {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {errors.confirmPassword?.message && (
                                        <motion.p key="confirm-err" className="text-sm text-error mt-1 ml-1"
                                            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}>
                                            {errors.confirmPassword.message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary text-secondary font-bold btn-block text-2xl rounded-lg shadow-lg h-16 font-serif mt-2">
                            {isSubmitting ? <><span className="loading loading-spinner loading-sm" />Resetting...</> : "Reset Password"}
                        </button>
                    </fieldset>
                </form>
            </div>
        </motion.div>
    )
}

export default ResetPasswordPage
