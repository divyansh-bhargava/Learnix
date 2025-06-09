import React from 'react'
import Input from './Input'
import Btn from './Btn'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';

function LoginFrom() {

    const { register , handleSubmit , formState:{errors , isSubmitting} ,reset } = useForm()

    const onsubmit = async(data) => {
        
        reset()
    }


    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <Input 
                label={"Email"} 
                required={true} 
                type={"email"} 
                {...register("email" , {required:true})}
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
            <Input 
                label={"Password"} 
                required={true} 
                type={"Password"}
                {...register("password", {reguired: true})}
            />
            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
            <div className='text-sm font-edu-sa text-blue-300 h-fit flex justify-end m-1'><Link to={"/forget-password"}>Forget password</Link></div>
            <Btn text={"Sign in"} disabled={isSubmitting} type="submit"/>
        </form>
    )
}

export default LoginFrom