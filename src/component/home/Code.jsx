import React from 'react'
import Btn from './Btn'
import { TypeAnimation } from 'react-type-animation'
import { FaArrowRight } from "react-icons/fa";


function Code({title , subtitle , codeblock , btn1  , position ,backgroundGradient ,codecolor }) {
  return (
    <div className={` flex justify-around items-center gap-10 ${position}  text-white my-10`}>

        <div className='flex flex-col  w-[100%] lg:w-[45%] px-6 font-inter '>
            
            <div className='ml-5'>{title}</div>

            <p className='text-[1.050rem] text-richblack-200 w-[85%] m-5 mb-0'>{subtitle}</p>

            <div className='flex flex-row gap-5 mt-3 z-10'>
                <Btn active={btn1.active} linkto={btn1.link}>
                    <div className="flex items-center gap-2 text-white">
                        {btn1.btnText}
                        <FaArrowRight />
                    </div>
                </Btn>
                
            </div>
            
        </div>
        <div className='h-fit  flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] codeblock mx-8 '>
            {backgroundGradient}

            <div className="text-center flex flex-col  w-[10%] select-none text-richblack-400 font-inter font-bold ">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>
            <div className={`${codecolor} font-semibold `}>
                <TypeAnimation
                    sequence={[codeblock, 1000, ""]}
                    cursor={true}
                    repeat={Infinity}
                    style={{
                    whiteSpace: "pre-line",
                    display: "block", 
                    }}
                    omitDeletionAnimation={true}
                />
            </div>
        </div>
    </div>
  )
}

export default Code