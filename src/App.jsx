import React from "react"
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import VerifyEmail from "./pages/Verify-email";
import Nav from "./component/nav/Navbar"
import ResetPasswordA from "./pages/resetPasswordA";
import ResetPasswordB from "./pages/ResetPasswordB";


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

      </Routes>

    </div>

  )
}

export default App
