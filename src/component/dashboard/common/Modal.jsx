import React from 'react';
import CtaBtn from "../../common/CtaBtn"

function Modal({data}) {
  return (
    <div className='absolute w-full bg-[#ebdfdf7c] h-[100svh] -top-[3.6rem] flex justify-center items-center z-20 shadow-richblack-600 backdrop-blur-sm'>
        <div className='p-10 bg-richblue-800 rounded-lg'>
          <p className='text-xl uppercase font-bold text-center text-gray-200 mb-2'>{data.text1}</p>
          <p className='text-lg font-sans text-gray-500'>{data.text2}</p>
        <div className='flex gap-5 mt-4 ml-2'>
          <CtaBtn text={data.btn1text} handler={data.btn1Handler}/>
          <button 
            className='text-gray-600 cursor-pointer'
            onClick={data.btn2Handler}>{data.btn2text}
            
          </button>
        </div>
        </div>
    </div>
  )
}

export default Modal