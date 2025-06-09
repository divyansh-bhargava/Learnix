import React from 'react'


function Btn({ text, disabled }) {
    return (
        <button className={`authBtn flex justify-center`} disabled={disabled}>
            <div>{text}</div>
            <div className="arrow-wrapper">
                <div className="arrow"></div>
            </div>           
        </button>
    )
}

export default Btn