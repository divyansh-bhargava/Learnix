import React, { useEffect, useState } from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2"
import { RiEarthFill } from "react-icons/ri"
import { IoCall } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import CountryCode from "../data/countyCode.js"
import Footer from '../component/common/Footer';
import { apiConnector } from '../service/apiconnector.js'
import { contactEndpoint } from '../service/api.js'


function ContactUs() {

    const arr = [
        {
            title: "Chat on us",
            description: "Our friendly team is here to help. \n info@Learnix.com",
            icon: <HiChatBubbleLeftRight />
        },
        {
            title: "Visit us",
            description: "Come and say hello at our office HQ. \n Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, \n Bangalore-560016",
            icon: <RiEarthFill />
        },
        {
            title: "Call us",
            description: "Mon - Fri From 8am to 5pm. \n +1234 567 869",
            icon: <IoCall />
        }
    ]

    const {CONTACTUS_API} = contactEndpoint

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm()
    const [loading, setLoading] = useState();


    const submitContactForm = async (data) => {
        console.log("Form Data - ", data)
        try {
            setLoading(true)
            await apiConnector("POST" , CONTACTUS_API , data)
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)

        }
        setLoading(false)
    }

    // useEffect(() => {
    //     if (isSubmitSuccessful) {
    //         reset({
    //             email: "",
    //             firstname: "",
    //             lastname: "",
    //             message: "",
    //             phoneNo: "",
    //         })
    //     }
    // }, [reset, isSubmitSuccessful])

    return (
        <div>
            <div className='flex justify-between text-white mx-30 my-10 gap-10 '>
            <div className='flex flex-col w-[40%] bg-richblack-700 rounded-xl space-y-3 h-fit lg:p-10'>
                {
                    arr.map((iteam, idx) => (
                        <div key={idx} className=' flex flex-col space-y-1 py-5'>
                            <div className='flex gap-2 items-center'>
                                <span className='text-xl text-gray-300'>{iteam.icon}</span>
                                <h1 className='text-xl font-semibold text-gray-100'>{iteam.title}</h1>
                            </div>
                            <p className='text-gray-300 whitespace-pre-line'>{iteam.description}</p>
                        </div>
                    ))
                }
            </div>
            <div className='w-[60%] bg-richblack-900  border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col'>
                <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
                    Got a Idea? We've got the skills. Let's team up
                </h1>
                <p className="">
                    Tell us more about yourself and what you're got in mind.
                </p>

                <form
                    className="flex flex-col gap-7"
                    onSubmit={handleSubmit(submitContactForm)}
                >
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstname" className="lable-style">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="Enter first name"
                                className="form-sytle"
                                {...register("firstname", { required: true })}
                            />
                            {errors.firstname && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your name.
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="lastname" className="lable-style">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="Enter last name"
                                className="form-sytle"
                                {...register("lastname")}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="lable-style">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email address"
                            className="form-sytle"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your Email address.
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="phonenumber" className="lable-style">
                            Phone Number
                        </label>

                        <div className="flex gap-5">
                            <div className="flex w-[81px] flex-col gap-2">
                                <select
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    placeholder="Enter first name"
                                    className="form-sytle"
                                    {...register("countrycode", { required: true })}
                                >
                                    {CountryCode.map((ele, i) => {
                                        return (
                                            <option key={i} value={ele.code}>
                                                {ele.code} -{ele.country}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                                <input
                                    type="number"
                                    name="phonenumber"
                                    id="phonenumber"
                                    placeholder="12345 67890"
                                    className="form-sytle"
                                    {...register("phoneNo", {
                                        required: {
                                            value: true,
                                            message: "Please enter your Phone Number.",
                                        },
                                        maxLength: { value: 12, message: "Invalid Phone Number" },
                                        minLength: { value: 10, message: "Invalid Phone Number" },
                                    })}
                                />
                            </div>
                        </div>
                        {errors.phoneNo && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.phoneNo.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="lable-style">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            cols="30"
                            rows="7"
                            placeholder="Enter your message here"
                            className="form-sytle"
                            {...register("message", { required: true })}
                        />
                        {errors.message && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your Message.
                            </span>
                        )}
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                            ${!loading &&
                            "transition-all duration-200 hover:scale-95 hover:shadow-none"
                            }  disabled:bg-richblack-500 sm:text-[16px] `
                        }
                    >
                        Send Message
                    </button>
                </form>
            </div>

        </div>
        <Footer/>
        </div>
    )
}

export default ContactUs
