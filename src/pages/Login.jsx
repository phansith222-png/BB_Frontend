import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { Eye, EyeOff, Star } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { loginSchema } from "../validations/schema"
import useUserStore from "../stores/userStores"
import { toast } from "react-toastify"
import RegisterForm from "../components/RegisterForm"
import ForgotPasswordForm from "../components/ForgotPasswordForm"

function Login() {
  const login = useUserStore(state => state.login)
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched"
  })
  const { errors, isSubmitting } = formState
  const onSubmit = async (body) => {
    try {
      const resp = await login(body)
      toast.success(resp.data.message)
      reset()
    } catch (err) {
      console.dir(err)
      const errMsg = err.response?.data.message || err.message
      toast.error(errMsg)
    }
  }
  return (
    <div className="card lg:card-side relative shadow-sm flex  w-full bg-gradient-to-r min-h-screen from-white to-primary/50 ">

      <figure className='hidden lg:flex w-1/2 h-screen relative overflow-hidden'>
        <img className='w-full h-full object-cover transition-transform duration-700 hover:scale-105'
          src="https://images.unsplash.com/photo-1600429753199-5376c2738737?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Album" />
      </figure>
      <div className="flex flex-1 justify-center items-center p-8 lg:p-0 ">
        <div className=' flex flex-col gap-6 w-full max-w-md'>
          <div className=" relative text-center lg:text-left mb-4">
            <Star className="absolute -top-4 -left-6 text-primary w-4 h-4 animate-[pulse_6s_infinite]" />
            <p className="text-5xl lg:text-6xl text-gray-900 font-cormorant font-bold mb-3 tracking-wide">Welcome Back </p>
            <Star className="absolute -bottom-2 -right-8 text-primary w-3 h-3 animate-[pulse_6s_infinite]" />
          </div>
          <p className='text-gray-500 font-light text-lg'>Please enter your details to sign in.</p>
          <form onSubmit={handleSubmit(onSubmit)} >
            <fieldset className='flex flex-col gap-5' disabled={isSubmitting}>
              <div className='form-control'>
                <label className="floating-label transition-all duration-300">
                  <span className="text-gray-500 font-medium">Username</span>
                  <input type="text" placeholder="Username" className={`input input-lg w-full bg-white border-gray-200 focus:border-[#B59F84] focus:ring-1 focus:ring-[#B59F84] transition-all duration-300 rounded-xl ${errors.username ? 'input-error' : ''}`}
                  {...register('username')}/>
                  <AnimatePresence>
                    {errors.username?.message && (
                      <motion.p key="username-err" className="text-sm text-error mt-1 ml-1"
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
                  <span className="text-gray-500 font-medium">Password</span>
                  <div className="relative w-full">
                    <input type={showPassword ? "text" : "password"} placeholder="Password" className={`input input-lg w-full bg-white border-gray-200 focus:border-[#B59F84] focus:ring-1 focus:ring-[#B59F84] transition-all duration-300 rounded-xl pr-12 ${errors.password ? 'input-error' : ''}`}
                    {...register('password')}/>
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(v => !v)}
                    >
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
                <button type="button"
                  className="text-sm text-gray-400 font-light mt-2 self-end underline underline-offset-2 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => document.getElementById('forgotPassword-form').showModal()}>
                  Forgot password?
                </button>
              </div>
              <div className='flex w-full flex-col mt-2'>
                <button type="submit" className="btn btn-primary text-secondary font-bold  btn-block text-2xl  rounded-lg shadow-lg h-16 font-serif">
                  {isSubmitting ? <><span className="loading loading-spinner loading-sm" />Signing in...</> : "Log in"}
                </button>
                <div className="divider text-base-content/30 uppercase text-md tracking-widest my-4">OR</div>
                <button type="button" className="btn btn-ghost btn-block font-bold text-secondary text-xl hover:bg-primary/10 font-serif" onClick={() => document.getElementById('createUser-form').showModal()}>Create New Account</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <dialog id="createUser-form" className="modal ">
        <div className="modal-box rounded-3xl p-8">
          <RegisterForm />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="forgotPassword-form" className="modal">
        <div className="modal-box rounded-3xl p-8">
          <ForgotPasswordForm />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Login