import React from 'react'
import { useForm } from 'react-hook-form'
import { UpdatePassword } from '../../../service/operation/settingsService'
import { useDispatch, useSelector } from 'react-redux'




function ChangePassword() {

    const { register, handleSubmit, reset , formState: { errors } } = useForm()

    const {token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    function ChangePasswordHandler(data) {
        try {
            dispatch(UpdatePassword(token , data))
            reset()
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='flex flex-col gap-y-4 w-full border border-richblack-600 bg-richblack-800 px-7 py-5 rounded-lg'>
            <h1 className='text-xl text-gray-100 mb-5 font-bold font-sans'>Change Password</h1>
            <form onSubmit={handleSubmit(ChangePasswordHandler)}>
                
                <div className=' flex justify-between items-center'>
                    
                    <div className=' flex gap-15'>
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="oldPassword" className="lable-style">
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="oldPassword"
                                id="oldPassword"
                                placeholder="Enter Current Password"
                                className="form-sytle"
                                {...register("oldPassword", { required: true })}
                            />
                            {errors.oldPassword && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Current Password.
                                </span>
                            )}
                        </div>

                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="oldPassword" className="lable-style">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                placeholder="Enter New Password"
                                className="form-sytle"
                                {...register("newPassword", { required: true })}
                            />
                            {errors.newPassword && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your New Password.
                                </span>
                            )}
                        </div>

                    </div>
                    
                    <button
                        type='submit'
                        className='bg-amber-300 text-lg px-4 py-1 rounded-sm '
                    >
                        Submit
                    </button>

                </div>
            </form>

        </div>
    )
}

export default ChangePassword