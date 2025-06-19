import { useState } from 'react'
import {sidebarLinks} from "../../../data/Dashboard"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from "./sidebarLink"
import { useNavigate } from 'react-router-dom'
import {logOut} from "../../../service/operation/authservices"
import  Modal from "./Modal"
import {VscSignOut} from "react-icons/vsc"

function Sidebar() {

  const { loading: authloading } = useSelector((state) => (state.auth))
  const { user , loading: profileLoading } = useSelector((state) => (state.profile))
  
  const [confirmationModal , setConfirmationModal] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  if (authloading || profileLoading) {
    return (
      <div className='flex h-[97vh] items-center justify-center spinner'>
      </div>
    )
  }

  return (
    <div className='border-r-1 border-r-richblack-500 '>

      <div className="flex flex-col gap-2 p-1 border-b border-richblack-700 mx-2 pb-4">
        {
          sidebarLinks.map((link) => {

            if (link.type && user?.accountType !== link.type) return null

            return( 
              <SidebarLink link={link} key={link.id}/>
            )

          })
        }
      </div>

      <div className="flex gap-2 flex-col p-1 mx-2">
          <SidebarLink link={{name : "Settings" , path: "/dashboard/settings" , icon :"VscSettingsGear"}} />

          <button 
            className='bg-red-400 px-4 py-2 rounded-sm  font-semibold text-richblack-500'
            onClick={() => {
              setConfirmationModal({
                text1:"!! confirm !!",
                text2:"You want to logged out from these device",
                btn1text:"Ok",
                btn2text:"Cancel",
                btn1Handler:() => {dispatch(logOut(navigate))},
                btn2Handler: () => {setConfirmationModal(null)}
            })
            }}
          >
            <div className='flex gap-2 items-center '>
              <VscSignOut className='text-lg text-black'/>
              <p className='text-lg text-black '>LogOut</p>
            </div>
          </button>

      </div>

      {confirmationModal && <Modal data={confirmationModal}/>}

    </div>
  )
}

export default Sidebar