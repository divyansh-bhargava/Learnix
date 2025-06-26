import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RiEditBoxLine } from "react-icons/ri"


function MyProfile() {

  const { user } = useSelector((state) => (state.profile))

  return (
    <div className='flex flex-col gap-y-4'>
      <h1 className='text-2xl text-gray-100 mb-5 font-bold font-sans'> My Profile</h1>

      <div className='w-full border border-richblack-700 bg-richblack-800 flex justify-between px-7 py-5 items-center rounded-lg '>
        <div className=' flex gap-5'>
          <img src={user?.image} alt="" className='aspect-square w-15 rounded-full' />
          <div className='text-lg font-semibold  text-gray-200 space-y-1'>
            <p className='text-amber-200 font-serif'>{user?.fname + " " + user?.lname}</p>
            <p className='text-sm '>{user?.email}</p>
          </div>
        </div>

        <Link to={"/dashboard/settings"} className='' >
          <div className='bg-amber-300 text-lg px-4 py-1 rounded-sm flex items-center gap-x-2' >
            <RiEditBoxLine />
            <p>Edit</p>
          </div>
        </Link>

      </div>

      <div className="w-full border border-richblack-700 bg-richblack-800 flex justify-center px-7 py-5  rounded-lg flex-col ">

        <div className="flex  items-center justify-between">

          <p className="text-lg font-semibold text-richblack-5">About</p>
          <Link to={"/dashboard/settings"} className='' >
            <div className='bg-amber-300 text-lg px-4 py-1 rounded-sm flex items-center gap-x-2' >
              <RiEditBoxLine />
              <p>Edit</p>
            </div>
          </Link>

        </div>

        <p
          className={`${user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
            } text-sm font-medium mt-3`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>

      </div>

      <div className="w-full border border-richblack-700 bg-richblack-800 flex justify-center px-7 py-7  rounded-lg flex-col gap-y-6 ">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <Link to={"/dashboard/settings"} className='' >
            <div className='bg-amber-300 text-lg px-4 py-1 rounded-sm flex items-center gap-x-2' >
              <RiEditBoxLine />
              <p>Edit</p>
            </div>
          </Link>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.fname}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.profile?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lname}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.profile?.dateOfBirth ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default MyProfile