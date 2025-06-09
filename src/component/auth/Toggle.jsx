import React from 'react'

function Toggle() {
    return (
       <div className='flex relative font-sans text-sm text-gray-600 gap-1 border w-1/3 px-1 py-2'>
            <span className='absolute'></span>
            <label>
                Student
                <input type='radio' name='toogle' defaultChecked className=''/>
            </label>
            <label>
                Instructer
                <input type='radio' name='toogle' className=''/>
            </label>
       </div>
    )
}

export default Toggle