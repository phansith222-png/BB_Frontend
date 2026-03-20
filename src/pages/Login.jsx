import { zodResolver } from "@hookform/resolvers/zod"
import { Star } from "lucide-react"
import { useForm } from "react-hook-form"
import { loginSchema } from "../validations/schema"
import { json, promise } from "zod"
import useUserStore from "../stores/userStores"
import { toast } from "react-toastify"
import RegisterForm from "../components/registerForm"

function Login() {
  const login = useUserStore(state => state.login)
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit"
  })
  const { errors } = formState

  const onSubmit = async (body) => {
    try {
      await new promise(resolve => setTimeout(resolve, 1000))
      const resp = await login(body)
      toast.success(JSON.stringify(resp.data.message))
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
      <div className="card-body flex flex-1 justify-center ">
        <div className=' flex flex-col gap-4 w-full px-40'>
          <div className=" relative">
            <Star className="absolute -top-4 -left-6 text-primary w-4 h-4 animate-[pulse_6s_infinite]" />
            <p className="text-5xl text-secondary font-serif font-extrabold mb-3">Welcome Back </p>
            <Star className="absolute -bottom-2 -right-8 text-primary w-3 h-3 animate-[pulse_6s_infinite]" />
          </div>
          <p className='text-base-content font-bold text-2xl mb-2 font-cormorant'>Please enter your details to sign in.</p>
          <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-col'>
            <div className='form-control'>
              <label className="floating-label transition-all duration-300">
                <span className="font-serif">Username</span>
                <input type="text " placeholder="Username" className=" text-2xl input input-lg input-primary w-full transition-all duration-300" />
              </label>
            </div>
            <div className="form-control">
              <label className="floating-label transition-all duration-300">
                <span className="font-serif">Password</span>
                <input type="password" placeholder="Password" className="text-2xl input input-lg input-primary w-full transition-all duration-300" />
              </label>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-2xl mt-2 font-extrabold text-red-400 font-cormorant">Forgot password?</a>
              </label>
            </div>
            <div className='flex w-full flex-col mt-2'>
              <button className="btn btn-primary text-secondary font-bold  btn-block text-2xl  rounded-lg shadow-lg h-16 font-serif">Log in</button>
              <div className="divider text-base-content/30 uppercase text-md tracking-widest my-4">OR</div>
              <button className="btn btn-ghost btn-block font-bold text-secondary text-xl hover:bg-primary/10 font-serif" onClick={() => document.getElementById('createUser-form').showModal()}>Create New Account</button>
            </div>
          </form>
        </div>
      </div>
      <dialog id="createUser-form" className="modal">
        <div className="modal-box">
          <RegisterForm />
        </div>
      </dialog>
    </div>
  )
}

export default Login