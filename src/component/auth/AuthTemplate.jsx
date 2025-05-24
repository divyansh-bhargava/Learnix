import React from 'react'

function AuthTemplate({form , data , photo }) {
  return (
    <div className='flex flex-row justify-around items-center gap-10 bg-richblack-800 text-white w-full h-[90dvh]'>
        <div className=''>
          <div className=''>
              {data}
          </div>
          <div className='w-[400px] h-[500px] bg-amber-300 rounded-b-sm '>
             {form}
          </div>
            
        </div>

        <div className='w-[500px] h-[500px] bg-amber-300'>
            <img src={photo} alt="" />
        </div>
    </div>
  )
}

export default AuthTemplate