import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import Highlight from '../component/home/Highlight';
import banner from '../assets/image/banner.mp4';
import image1 from '../assets/image/1of3.png'
import image2 from '../assets/image/2of3.png'
import image3 from '../assets/image/3of3.png'
import ladder1 from '../assets/image/1of4.png'
import ladder2 from '../assets/image/2of4.png'
import ladder3 from '../assets/image/3of4.png'
import ladder4 from '../assets/image/4of4.png'
import ladder from '../assets/image/mappic.png'
import teacher from '../assets/image/teacher.png'
import Code from '../component/home/Code';
import Btn from "../component/home/Btn"



const Home = () => {
    return (
        <div className='flex flex-col items-center w-full '>


            <div className='w-full flex flex-col items-center  gap-4 bg-richblack-800'>

                <Link to="/signup" >
                    <div className=" group border-4 m-6 mt-10 border-richblack-800 rounded-full bg-richblack-900 text-richblack-200 shadow-[1px_-1px_20px_-1px] shadow-blue-200 hover:scale-90 hover:bg-richblack-900 transition-all duration-200 hover:shadow-none ">
                        <div className="loader transition-all duration-200 px-4 pl-8 py-2">
                            <p>Become an</p>
                            <div class="words">
                                <span class="word"><Highlight text={"Instructor"} /></span>
                                <span class="word"><Highlight text={"Student"} /></span>
                                <span class="word"><Highlight text={"Instructor"} /></span>
                                <span class="word"><Highlight text={"Student"} /></span>
                                <span class="word"><Highlight text={"Instructor"} /></span>
                            </div>
                            <div className="flex items-center justify-center rounded-full bg-richblack-5 ml-4 w-7 h-7">
                                <FaArrowRight className='-rotate-45 text-[1.025rem] text-richblack-600' />
                            </div>

                        </div>

                    </div>
                </Link>

                <div className=' flex flex-col  items-center gap-8  m-2 '>
                    <div className="text-4xl font-bold leading-relaxed text-white mx-auto">
                        Empower Your Future with <Highlight text={"Coding Skills"} />
                    </div>
                    <p className='text-lg text-richblack-300 mx-auto font-semibold w-3/4 px-4 text-center'>
                        With our online coding courses, you can learn at your own pace,
                        from anywhere in the world, and get access to a wealth of resources,
                        including hands-on projects, quizzes, and personalized feedback from instructors
                    </p>
                </div>

                <div className='w-[80%] mt-10 rounded-lg h-[90%]  '>
                    <video
                        className=""
                        muted
                        loop
                        autoPlay
                    >
                        <source src={banner} type="video/mp4" />
                    </video>
                </div>


                <div className='flex flex-col items-center gap-8 w-full mt-25'>
                    <Code
                        position={"lg:flex-row"}
                        title={
                            <div className="text-[2.25rem] font-semibold w-fit leading-12 font-inter">
                                Unlock your
                                <Highlight text={" coding potential"} /> with our online
                                courses.
                            </div>
                        }
                        subtitle={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        btn1={{
                            btnText: "Try it Yourself",
                            link: "/signup",
                            active: true,
                        }}
                        btn2={{
                            btnText: "Learn More",
                            link: "/signup",
                            active: false,
                        }}
                        codeColor={"text-yellow-25"}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> \n<a href="/one">One</a> <a href="/two">Two</a>\n</nav>\n</body>`}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}
                    />

                    <Code
                        position={"lg:flex-row-reverse"}
                        title={
                            <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                                Start
                                <Highlight text={" coding in seconds"} />
                            </div>
                        }
                        subtitle={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        btn1={{
                            btnText: "Continue Lesson",
                            link: "/signup",
                            active: true,
                        }}
                        codeColor={"text-yellow-25"}
                        codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                    />
                    <div />

                </div>

            </div>

            <div className='flex flex-col items-center bg-pure-grey-25'>

                <div className='flex w-[100dvw] flex-col lg:flex-row lg:justify-evenly items-center m-5 mt-10' >
                    <div className='flex flex-col gap-5 m-5 relative ladder bg-transparent z-10'>
                        <div className="flex flex-row gap-5 m-5">
                            <div className='rounded-full bg-white p-5 flex justify-center items-center aspect-square '>
                                <img src={ladder1} />
                            </div>
                            <div>
                                <div className='text-lg font-medium '>Leadership</div>
                                <div className=' text-richblack-800'>Fully committed to the success company</div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-5 m-5">
                            <div className='rounded-full bg-white p-5 flex justify-center items-center aspect-square'>
                                <img src={ladder2} />
                            </div>
                            <div>
                                <div className='text-lg font-medium '>Responsibility</div>
                                <div className=' text-richblack-800'>Students will always be our top priority</div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-5 m-5">
                            <div className='rounded-full bg-white p-5 flex justify-center items-center aspect-square'>
                                <img src={ladder3} />
                            </div>
                            <div>
                                <div className='text-lg font-medium '>Flexibility</div>
                                <div className=' text-richblack-800'>The ability to switch is an important skills</div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-5 m-5">
                            <div className='rounded-full bg-white p-5 flex justify-center items-center aspect-square'>
                                <img src={ladder4} />
                            </div>
                            <div>
                                <div className='text-lg font-medium '>Solve the problem</div>
                                <div className=' text-richblack-800'>The ability to switch is an important skills</div>
                            </div>
                        </div>

                    </div>
                    <div className='shadow-[-1px_-1px_10px_3px] shadow-blue-200'>
                        <img src={ladder} alt="" className='bg-cover w-[40vw] h-auto rounded-sm' />
                    </div>

                </div>

                <div className='lg:mt-15 mb-10'>

                    <div className='text-center mt-5' >
                        <div className='text-4xl  font-semibold'>
                            Your swiss knife for <Highlight text={"learning any language"} />
                        </div>
                        <p className=' text-center text-richblack-700 font-medium lg:w-[80%] mx-auto text-base mt-2'>
                            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center items-center lg:flex-row mt-8 lg:-mt-5 photo">
                        <img src={image1} alt="" className=' object-contain lg:-mr-31 scale-98 ' />
                        <img src={image2} alt="" className=' object-contain lg:-ml-11 scale-97 ' />
                        <img src={image3} alt="" className=' object-contain lg:-ml-38 scale-98 ' />
                    </div>

                    <Btn children={"learn more"} css={"w-[8vw] mx-auto"} linkto={"/signup"} />


                </div>








            </div>


            <div className=' w-full bg-richblack-800'>

                <div className='w-full bg-richblack-800 flex flex-col lg:flex-row lg:justify-evenly items-center p-5 pt-10 text-white gap-5 lg:mt-15 mb-10'>
                    <div className='w-[35%] shadow-[-1px_-1px_10px_3px] shadow-blue-200 '>
                        <img src={teacher} alt="" />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='text-4xl font-bold pl-5'>Become an <Highlight text={"instructor"} /></div>
                        <div className='text-lg text-richblack-200 pl-5 w-[45vw]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
                        <Btn children={"Start Teaching Today"} css={"w-[13vw]"} />
                    </div>
                </div>

                <div>
                    <div className='text-center text-4xl text-gray-100'><Highlight text={"Review "} /> from other learner</div>
                </div>

            </div>




        </div>
    );
};

export default Home;