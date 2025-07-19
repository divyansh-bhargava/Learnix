import data from "../../data/nav-data"
import { Link } from 'react-router-dom'
import NavBtn from './NavBtn';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useLocation, matchPath } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getAllcategory } from "../../service/operation/courseServices";
import ProfileDropdown from "./ProfileDropdown";



function Navbar() {

  const token = useSelector((state) => (state.auth.token))
  const user = useSelector((state) => (state.profile.user))
  const totalItem = useSelector((state) => (state.cart.toatalItem))
  const dispatch = useDispatch()

  const location = useLocation()

  const [loading, setLoading] = useState(false)
  const [catalog, setcatalog] = useState([])


  // const catalog = [
  //   {
  //     title: "Python",
  //     path: "./"
  //   },
  //   {
  //     title: "Machine learning",
  //     path: "./login"
  //   }
  // ]


  function matchroute(path) {
    return matchPath(path, location.pathname)
  }

  useEffect(() => {
    setLoading(true)
    dispatch(getAllcategory(setcatalog))
    setLoading(false)
  }, [])


  return (
    <div className='bg-richblack-800 w-full h-15 flex items-center z-10'>
      <div className='flex justify-between text-gray-100 w-11/12 mx-auto'>

        <div className=' font-extrabold text-2xl '>Learnix</div>

        <ul className='pl-5 flex gap-6 pt-1'>
          {
            data.map((val, index) => (

              val.title === "Catalog" ? (

                <li key={index} >
                  <div className='group overflow-visible '>
                    <div className='flex gap-2 justify-center items-center'>
                      <div>Catalog</div>
                      <IoMdArrowDropdown />
                    </div>
                    <div className='invisible absolute  z-[1000] flex w-45 translate-x-[-50%]  flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-100 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-70'>
                      <div className="absolute  left-[70%] top-0 -z-10 h-6 w-6 translate-x-[-12%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      <ul>

                        {loading ? (<li className="text-black">loading</li>) :
                          (
                            catalog?.map((val, index) => (
                              <Link to={`/catalog/${val.name}`}>
                                <li key={index} className={`text-lg h-10 font-semibold p-2 transition-all duration-150 hover:bg-richblack-200 rounded-lg first-letter:uppercase font-serif ${matchroute(`/catalog/${val.name}`) ? "text-amber-600" : "text-black"}`}>{val.name} </li>
                              </Link>
                            ))
                          )}

                      </ul>

                    </div>
                  </div>
                </li>

              ) : (

                <li key={index} className={`${matchroute(val.path) ? "text-amber-300" : "text-white"}`}>
                  <Link to={val.path}>
                    {val.title}
                  </Link>
                </li>

              )

            ))
          }
        </ul>

        <div >
          {
            token !== null ? (
              <div className='flex gap-5 items-center'>
                {
                  user && user.accountType !== "Instructor" &&
                  (
                    <Link to={"/dashboard/cart"}>
                      <div className="relative ">
                        <AiOutlineShoppingCart />
                        {totalItem > 0 && (<span className="absolute">{totalItem}</span>)}
                      </div>
                    </Link>
                  )
                }
                <ProfileDropdown />
              </div>
            ) :
              (
                <div className='flex gap-5'>
                  <NavBtn children={"LogIn"} linkto={"/logIn"} />
                  <NavBtn children={"SignUp"} linkto={"/signUp"} />
                </div>
              )
          }
        </div>

      </div>
    </div>
  )
}

export default Navbar