import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import Highlight from '../component/home/Highlight';
import banner from '../assets/image/banner.mp4';
import Code from '../component/home/Code';


const Home = () => {
    return (
        <div className='flex flex-col items-center w-full gap-4'>

            <Link to="/signup" >
                <div className=" group border-4  m-4 mt-10 border-richblack-800 rounded-full bg-richblack-900 text-richblack-200 shadow-[1px_-2px_25px_-1px] shadow-blue-200 hover:scale-90 hover:bg-richblack-900 transition-all duration-200 hover:shadow-none ">
                    <div className="loader transition-all duration-200 px-4 pl-8 py-2">
                        <p>Become an</p>
                        <div class="words">
                            <span class="word"><Highlight text={"Instructor"}/></span>
                            <span class="word"><Highlight text={"Student"}/></span>
                            <span class="word"><Highlight text={"Instructor"}/></span>
                            <span class="word"><Highlight text={"Student"}/></span>
                            <span class="word"><Highlight text={"Instructor"}/></span>
                        </div>
                        <div className="flex items-center justify-center rounded-full bg-richblack-5 ml-4 w-7 h-7">
                            <FaArrowRight className='-rotate-45 text-[1.025rem] text-richblack-600' />
                        </div>

                    </div>

                </div>
            </Link>

            <div className=' flex flex-col  items-center gap-8  m-2 '>
                <div className="text-4xl font-bold leading-relaxed text-white mx-auto ">
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

            </div>


            



        </div>
    );
};

export default Home;