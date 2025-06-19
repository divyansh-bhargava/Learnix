import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../component/dashboard/common/Sidebar'
import { useSelector } from 'react-redux'


function Dashboard() {

  const { loading: authloading } = useSelector((state) => (state.auth))
  const { loading: profileLoading } = useSelector((state) => (state.profile))

  if (authloading || profileLoading) {
    return (
      <div className='flex h-[97vh] items-center justify-center spinner'>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[97vh]">
      <Sidebar />
      <div className="h-[97vh] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}


export default Dashboard