import React from 'react'
import DeleteProfile from './DeleteProfile'
import ChangePassword from './ChangePassword'
import UpdateProfile from './updateProfile'
import UpdateDP from "./UpdateDP"

function Settings() {
  return (
    <div className='space-y-5'>
      <h1 className='text-2xl text-gray-50 font-bold '>Settings</h1>
      <UpdateDP/>
      <UpdateProfile/>
      <ChangePassword/>
      <DeleteProfile/>
    </div>
  )
}

export default Settings