import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


function RegisterForm() {
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver,
        mode: 'onChange'
    })

    const { errors } = formState

    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-4xl">Sign Up</p>
                <form method="dialog">
                    <button onClick={() => reset()} className="btn">Close</button>
                </form>
            </div>
            <div>
                <h4>Let's get you all sign up so you can access your personal account</h4>
            </div>
        </div>
    )
}

export default RegisterForm