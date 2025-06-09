import React from 'react'
import AuthTemplate from '../component/auth/AuthTemplate'

function Login() {
  
  return (
    <div>
      <AuthTemplate 
        title="Welcome Back"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        formType="login"
      />
    </div>
  )
}

export default Login