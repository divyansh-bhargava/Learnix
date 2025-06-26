import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateProfile as service } from '../../../service/operation/settingsService'

function UpdateProfile() {

  const { register, handleSubmit, reset , formState: { errors } } = useForm()

  const user = useSelector((state) => state.profile.user)

  const token = useSelector((state) => state.auth.token)

  const dispatch = useDispatch()

  function submitForm(data) {
    console.log(data);
    console.log(user?.profile?.dob);
    try {
      dispatch(service(token, data))
      reset()
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className=' w-full border border-richblack-600 bg-richblack-800  rounded-lg'>
      <form onSubmit={handleSubmit(submitForm)} className='flex flex-col gap-y-4 px-7 py-5'>

        <div className=' flex justify-between w-full mb-5'>
          <div className='text-xl font-semibold text-gray-200'>Update Profile</div>
          <button
            type='submit'
            className='bg-amber-300 text-lg px-4 py-1 rounded-sm'
          >
            Submit
          </button>
        </div>

        <div className='flex flex-col'>
          <div className=' flex justify-evenly mb-4'>
            <div className="relative flex flex-col gap-2 lg:w-[48%] input-group">
              <label htmlFor="fname" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="fname"
                id="fname"
                placeholder="First Name"
                className="form-sytle w-4/5"
                defaultValue={user?.fname}
                {...register("fname", { required: true })}
              />
              {errors.fname && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your First Name.
                </span>
              )}
            </div>

            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="fname" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                id="lname"
                placeholder="Last Name"
                className="form-sytle w-4/5"
                defaultValue={user?.lname}
                {...register("lname", { required: true })}
              />
              {errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Last Name.
                </span>
              )}
            </div>
          </div>

          <div className=' flex justify-evenly mb-4'>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="email" className="lable-style">
                Email
              </label>
              <div
                name="email"
                id="email"
                className="form-sytle w-4/5"
              >
                <p className='pt-2'>{user?.email}</p>
              </div>
            </div>

            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact No:
              </label>
              <input
                type="text"
                name="contactNumber"
                id="contactNumber"
                placeholder="Contact Number"
                className="form-sytle w-4/5"
                defaultValue={user?.contactNumber}
                {...register("contactNumber", { required: true })}
              />
              {errors.fname && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Contact no:
                </span>
              )}
            </div>
          </div>

          <div className=' flex justify-evenly mb-4'>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                placeholder="First Name"
                className="form-sytle w-4/5"
                defaultValue={user?.gender}
                {...register("gender", { required: true })}
              >
                <option value="male" className='text-black'>Male</option>
                <option value="female" className='text-black'>Female</option>
                <option value="Prefer Not TO Say" className='text-black'>Prefer Not TO Say</option>
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Select your Gender.
                </span>
              )}
            </div>

            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dob" className="lable-style">
                Date Of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                placeholder="Date of Birth "
                className="form-sytle w-4/5"
                defaultValue={user?.profile?.dob}
                {...register("dob", { required: true })}
              />
              {errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Select Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <label htmlFor="about" className="lable-style w-full">
              About
            </label>
            <textarea
              type="text"
              name="about"
              id="about"
              placeholder="Write Something About Yourself"
              className="form-sytle w-10/11"
              defaultValue={user?.profile?.about}
              {...register("about", { required: true })}
            >
            </textarea>
            {errors.gender && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Select your Gender.
              </span>
            )}
          </div>
        </div>

      </form>
    </div>
  )
}

export default UpdateProfile