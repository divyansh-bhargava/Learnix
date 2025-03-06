import React from 'react'
import { Link } from 'react-router-dom'

function Btn({active , linkto ,children}) {
  return (
    <Link to={linkto}>
        <div className={`${active ? "bg-[#1FA2FF]" :  "bg-transparent" }  py-2 px-3 rounded-lg border btn  transition-all duration-600  m-5 `}>
          {children}
        </div>
    </Link>
  )
}

export default Btn