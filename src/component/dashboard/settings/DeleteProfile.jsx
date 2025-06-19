import React from 'react'
import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../../../service/operation/settingsService';


function DeleteProfile() {

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()


    function handleClick() {
        try {
            dispatch(deleteProfile(token , navigate))
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='w-full border border-pink-600 bg-pink-700 flex px-7 py-5 items-center rounded-lg'>
            <div className='flex justify-center items-center aspect-square w-14 rounded-full bg-pink-500 mx-6 mr-13'>
                <FiTrash2 className='text-2xl text-pink-100' />
            </div>
            <div className='flex flex-col space-y-4'>
                <h1 className='text-lg text-richblack-5 font-semibold'>Delete Account</h1>
                <div className='text-pink-50 space-y-2 w-3/5'>
                    <p>Would you like to delete account?</p>
                    <p>
                        This account may contain Paid Courses. Deleting your account is
                        permanent and will remove all the contain associated with it.
                    </p>
                </div>
            </div>
            <button
                type="button"
                className="w-fit cursor-pointer italic text-pink-300 m-4"
                onClick={handleClick}
            >
                Delete
            </button>
        </div>
    )
}

export default DeleteProfile