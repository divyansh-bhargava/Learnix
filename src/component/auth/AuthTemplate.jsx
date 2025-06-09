import React from 'react'
import LoginFrom from './LoginFrom'
import SignupFrom from './SignupFrom'

function AuthTemplate({ formType, title, description1, description2 }) {
  return (

    <div className='flex items-center justify-center h-[92vh]'>

      <div className='flex flex-col gap-3 items-center justify-center bg-gray-200 w-1/3 rounded-xl p-10 pb-15'>
        <div className='text-gray-800 text-3xl font-bold font-edu-sa'>{title}</div>
        <div className='text-gray-500 text-lg font-semibold'>{description1}</div>
        <div className='text-blue-300 text-lg font-edu-sa font-semibold '>{description2}</div>


        {
          formType === "login" ?
            (
              <LoginFrom />
            )
            :
            (
              <SignupFrom/>
            )
        }


      </div>

    </div>

  )
}

export default AuthTemplate