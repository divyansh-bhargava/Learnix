import React, { useState } from 'react'
import Input from '../component/auth/Input'
import Btn from '../component/auth/Btn'
import { useDispatch } from 'react-redux'
import { resetPasswordLink } from '../service/operation/authservices'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {BiArrowBack} from "react-icons/bi"


function ResetPasswordA() {

    const { register, handleSubmit, reset } = useForm()

    const dispatch = useDispatch()
    const [sendMail, setSendMail] = useState(false)

    const onsubmit = async (data) => {
        console.log(data.email);
        dispatch(resetPasswordLink(data, setSendMail))
        reset()
    }

    return (
        <div className='flex items-center justify-center h-[92vh]'>

            <div className='flex flex-col gap-3 items-center justify-center bg-gray-200 w-[30%] rounded-xl p-10 pb-15'>
                {
                    !sendMail ?
                        (
                            <>
                                <div className='text-gray-800 text-3xl font-bold font-edu-sa'>
                                    Reset your password
                                </div>

                                <div className='text-gray-500 text-lg font-semibold'>
                                    Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery
                                </div>

                                <form onSubmit={handleSubmit(onsubmit)} className='w-[90%]'>
                                    <Input
                                        label={"Email"}
                                        required={true}
                                        type={"email"}
                                        {...register("email", { required: true })}
                                    />
                                    <Btn type="submit" text="Submit" />

                                </form>

                                <div className='flex justify-start w-full pl-7'>
                                    <Link to={"/logIn"} className='flex items-center gap-1'><BiArrowBack />back to LogIn</Link>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                <div className='text-gray-800 text-3xl font-bold font-edu-sa'>
                                    Reset your password
                                </div>

                                <div className='text-gray-500 text-lg font-semibold'>
                                    Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery
                                </div>

                                <div className='flex justify-start w-full pl-7'>
                                    <Link to={"/logIn"} className='flex items-center gap-1' ><BiArrowBack /> back to LogIn</Link>
                                </div>
                            </>
                        )
        }
            </div>

        </div>
    )
}

export default ResetPasswordA