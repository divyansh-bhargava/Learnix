
function Toggle({account , setaccount}) {

    const toggle = (type) => {
        if(type !== account){
            setaccount(type)
        }
    }

    return (
       <div  className='flex relative font-sans text-sm text-gray-600 border-1 border-[#8b8989] gap-5 rounded-full w-[37%] px-3 py-2 shadow-amber-50 font-semibold'>
            <span className={`absolute border-3 border-blue-300 rounded-full w-[50%] top-0 left-0 h-full ${account === "Instructer" ? "translate-x-[100%] " : ""} transition-all duration-200 `}></span>
            <div className={`${account === "Student" ? "text-blue-300" : "text-gray-600"} pointer`} onClick={()=> {toggle("Student")}} >Student</div>
            <div className={`${account === "Instructer" ? "text-blue-300" : "text-gray-600"} pointer`} onClick={()=> {toggle("Instructer")}} >Instructer</div>
       </div>
    )
}

export default Toggle