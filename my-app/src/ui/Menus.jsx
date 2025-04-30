
import { Link, useLocation } from 'react-router-dom';


import { LuLayoutDashboard } from "react-icons/lu";
import { FaListCheck } from "react-icons/fa6";



const navLinks = [
  {
      name : "Dashboard",
      href : "/dashboard",
      icon : <LuLayoutDashboard className="h-5 w-5 text-primary-600" />
  },
  {
      name : "Manage Tasks",
      href : "/tasks",
      icon : <FaListCheck className="h-5 w-5 text-primary-600" />
  },
  
]


export default function Menus() {

    const pathname = useLocation()


    return (
        <nav>
        <h5 className='text-gray-500 text-sm'>Menu</h5>
        <ul className="flex flex-col  h-full text-md " >
            {navLinks.map((link) => (
                <li key={link.name}>
                    <Link 
                    className={`py-2 px-5
                    hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200  ${pathname === link.href ? 'bg-primary-900' : ''}`}
                    to={link.href}
                    
                    >
                    {link.icon} 
                    <span>{link.name}</span>
                    </Link>
                </li>
            ))}

        </ul>
    </nav>
    )
}
