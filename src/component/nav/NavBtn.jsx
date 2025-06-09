import React from 'react'
import { Link } from 'react-router-dom'

function NavBtn({children ,linkto}) {
  return (
      <Link to={linkto}>
        <div className='navBtn'>
          <span>{children}</span>
        </div>
      </Link>
  )
}

export default NavBtn