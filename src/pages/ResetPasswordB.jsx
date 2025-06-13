import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../service/operation/authservices'
import { useLocation, useNavigate } from 'react-router-dom'
import Input from '../component/auth/Input'
import Btn from '../component/auth/Btn'
import { Link } from 'react-router-dom'
import {BiArrowBack} from "react-icons/bi"
import toast from 'react-hot-toast'




function ResetPasswordB() {

    const { register, handleSubmit, reset } = useForm()
    
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const location = useLocation()
    
        const onsubmit = async (data) => {

            if(data.password !== data.confirmPassword){
                toast.error("password does not matched")
                reset()
                return
            }

            data.token = location.pathname.split("/").at(-1)
            dispatch(resetPassword(data , navigate))
            reset()
        }

    return (
        <div className='flex justify-center items-center h-[97vh]'>
            <div className='flex flex-col gap-3 items-center justify-center bg-gray-200 w-[30%] rounded-xl p-10 pb-15'>

            <div className='text-gray-800 text-3xl font-bold font-edu-sa'>
                Choose new password
            </div>

            <div className='text-gray-500 text-lg font-semibold'>
                Almost done. Enter your new password and youre all set.
            </div>

            <form onSubmit={handleSubmit(onsubmit)} className='w-[90%]'>
                <Input
                    label={"Password"}
                    required={true}
                    type={"Password"}
                    {...register("password", { required: true })}
                />
                
                <Input
                    label={"Confirm Password"}
                    required={true}
                    type={"Password"}
                    {...register("confirmPassword", { required: true })}
                />
                
                <Btn type="submit" text="Submit" />

            </form>

            <div className='flex justify-start w-full pl-7'>
                <Link to={"/logIn"} className='flex items-center gap-1'><BiArrowBack />back to LogIn</Link>
            </div>

        </div>
        </div>
    )
}

export default ResetPasswordB