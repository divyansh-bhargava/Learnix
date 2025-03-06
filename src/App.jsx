import React from "react"
import {Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import Login from "./pages/login";

function App() {
  

  return (
    <div  className="w-screen min-h-screen bg-richblack-900 flex flex-col  ">

      <div>hy</div>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>

    </div>

  )
}

export default App
