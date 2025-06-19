import React from 'react'
import DeleteProfile from './DeleteProfile'
import ChangePassword from './ChangePassword'
import UpdateProfile from './updateProfile'

function Settings() {
  return (
    <div className='space-y-5'>
      <h1 className='text-2xl text-gray-300 font-bold'>Settings</h1>
      <UpdateProfile/>
      <ChangePassword/>
      <DeleteProfile/>
    </div>
  )
}

export default Settings