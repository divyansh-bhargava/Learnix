import { useState } from 'react';
import OtpInput from 'react-otp-input';
import Btn from '../component/auth/Btn';
import { RxCountdownTimer } from "react-icons/rx"
import { BiArrowBack } from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom';
import { sendOTP ,signUp } from '../service/operation/authservices'; 


import { useSelector, useDispatch } from 'react-redux';

function VerifyEmail() {

  const [otp, setOtp] = useState('');
  const dispatch = useDispatch()
  const { userData, loading } = useSelector((state) => (state.auth))
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = { ...userData ,otp}
    dispatch(signUp(data, navigate));

  }

  return (
    <div className='flex items-center justify-center h-[92vh]'>
      {
        loading ?
          (
            <div className='spinner'></div>
          )
          :
          (
            <div className='flex flex-col gap-4 items-center justify-center bg-gray-200 w-1/3 rounded-xl p-10 pb-15'>
              <div className='text-gray-800 text-2xl font-bold font-edu-sa border-b-2 border-b-blue-300 mb-4'>Verify Email</div>
              <div className='text-blue-300 text-lg font-edu-sa font-semibold text-center'>A verification code has been sent to you.<br></br> Enter the code below</div>

              <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3 w-[90%] '>

                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className='w-2'></span>}
                  renderInput={(props) =>
                    <input
                      {...props}
                      style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                      className="w-[40px] lg:w-[50px] border-1 border-gray-600 rounded-[0.5rem] text-richblack-300 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-blue-300"
                    />
                  }
                />

                <Btn text="Verify Email" type="submit" />

              </form>

              <div className="flex items-center justify-between w-[80%]">

                <Link to="/signup">
                  <p className="text-richblack-800 flex items-center">
                    <BiArrowBack /> Back To Signup
                  </p>
                </Link>

                <button
                  className="flex items-center text-blue-300 gap-x-2"
                  onClick={() => dispatch(sendOTP(userData.email))} >
                  <RxCountdownTimer />
                  Resend it
                </button>

              </div>
            </div>
          )
      }
    </div>
  )
}

export default VerifyEmail