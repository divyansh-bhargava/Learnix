import React from 'react'
import AuthTemplate from '../component/auth/AuthTemplate'
import imagelog from "../assets/image/1of3.png"
import Input from '../component/auth/Input'

function Login() {
  const data = <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h1>
  const form = <from></from>
  return (
    <div>
      <AuthTemplate data={data} photo={imagelog} form={form} />
    </div>
  )
}

export default Login