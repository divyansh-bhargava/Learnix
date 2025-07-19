import React from "react"
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import VerifyEmail from "./pages/Verify-email";
import Nav from "./component/nav/Navbar"
import ResetPasswordA from "./pages/resetPasswordA";
import ResetPasswordB from "./pages/ResetPasswordB";
import Footer from './component/common/Footer';
import About from "./pages/About";
import Dashboard from "./pages/Dashboard"
import MyProfile from "./component/dashboard/common/MyProfile"
import Cart from "./component/dashboard/cart/cart"
import Settings from "./component/dashboard/settings/Settings";
import MyCourse from "./component/dashboard/common/MyCourse";


function App() {
  

  return (
    <div  className="w-screen min-h-screen flex flex-col bg-richblack-800 overflow-x-hidden">

      <Nav/>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path="/forget-password" element={<ResetPasswordA/>} />
        <Route path="/resetpassword/:id" element={<ResetPasswordB/>} />
        <Route path="/about" element={<About/>} />

        <Route element={<Dashboard/>}>
          <Route path="/dashboard/my-profile" element={<MyProfile/>} />
          <Route path="/dashboard/cart" element={<Cart/>} />
          <Route path="/dashboard/settings" element={<Settings/>} />
          <Route path="/dashboard/my-courses" element={<MyCourse/>} />
        </Route>
      

      </Routes>

      <Footer/>

    </div>

  )
}

export default App
