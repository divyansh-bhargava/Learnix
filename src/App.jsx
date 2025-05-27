import React from "react"
import {Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import VerifyEmail from "./pages/Verify-email";

function App() {
  

  return (
    <div  className="w-screen min-h-screen flex flex-col  ">

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail/>} />

      </Routes>

    </div>

  )
}

export default App
