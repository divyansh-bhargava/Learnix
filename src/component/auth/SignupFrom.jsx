import React, { useState } from 'react'
import Input from './Input'
import Btn from './Btn'
import Toggle from './toggle'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../../redux/slices/authSlice';

import { sendOTP } from '../../service/operation/authservices';

function SignupFrom() {

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()
    const [account, setaccount] = useState("Student")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onsubmit = async (data) => {

        if (data.password !== data.confirmPassword) {
            toast.error("password does not matched")
            reset()
            return
        }

        data.accountType = account
        dispatch(setUserData(data))
        dispatch(sendOTP(data.email, navigate))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <Toggle account={account} setaccount={setaccount} />
            <div className='flex gap-3'>
                <Input
                    label={"First Name"}
                    required={true}
                    type={"text"}
                    {...register("fname", { required: true })}
                />
                {errors.fname && <span className='text-red-500 text-sm'>{errors.fname.message}</span>}
                <Input
                    label={"Last Name"}
                    required={true}
                    type={"text"}
                    {...register("lname", { required: true })}
                />
                {errors.lname && <span className='text-red-500 text-sm'>{errors.lname.message}</span>}
            </div>
            <Input
                label={"Email"}
                required={true}
                type={"email"}
                {...register("email", { required: true })}
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
            <div className='flex gap-3'>
                <Input
                    label={"Password"}
                    required={true}
                    type={"Password"}
                    {...register("password", { reguired: true })}
                />
                {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
                <Input
                    label={"Confirm Password"}
                    required={true}
                    type={"Password"}
                    {...register("confirmPassword", { reguired: true })}
                />
                {errors.password && <span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>}
            </div>
            <Btn text={"Sign up"} disabled={isSubmitting} type="submit" />
        </form>
    )
}

export default SignupFrom