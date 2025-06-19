
import * as Icons from "react-icons/vsc"
import { Link, matchPath, useLocation } from 'react-router-dom'


function SidebarLink({link}) {

  const Icon = Icons[link.icon] || (() => <span className="text-red-500">!</span>);
  const location = useLocation()

  function matchroute(path) {;
    return matchPath(path, location.pathname)
  }

  return (
    <div>
        <Link  to={link.path} className={`flex gap-5 relative px-4 py-2 items-center ${matchroute(link.path) ? "bg-amber-300 text-pure-grey-700 font-semibold" : "bg-transparent text-gray-300 hover:bg-[rgba(254,240,133,0.36)]"} text-lg rounded-sm  transition-colors duration-150`}>
          <span className={`absolute top-0 left-0 bottom-0 w-2 ${matchroute(link.path) ? "bg-amber-500" : "bg-transparent"}`}></span>
          <Icon className="text-lg"/>
          <p>{link.name}</p>
        </Link>
    </div>
  )
}

export default SidebarLink