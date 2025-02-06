import { useState } from "react";
import { Link, NavLink,  useNavigate  } from "react-router-dom"

export default function PageNav () {
    const [ isToggle, setIsToggle ] = useState("")

    const navigate = useNavigate();

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user")); // Parse the stored user details

    function handleLogout() {
      // Clear localStorage and navigate to the login page
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
      localStorage.removeItem("user");
      navigate("/login");
    }

    function handleToggle () {
      setIsToggle(true)
    }

    function handleToggleReset () {
      setIsToggle(false)
    }

    return <ul className="flex gap-4">
             <li>
             <div className="relative ">
                {user && <button className="uppercase font-bold" onClick={handleToggle}>@{user.username}</button> }
                {isToggle ? (<div className="flex flex-col absolute p-3 top-full
                bg-slate-500 mt-2 rounded-lg" onClick={handleToggleReset}>

                  <button className="uppercase text-white" onClick={handleToggleReset}><Link to={`/profile/${user.username}`}>Profile</Link></button>
                  <button className="uppercase text-white" onClick={handleToggleReset}><Link to={"/createblog"}>createblog</Link></button>
                </div>) : ""}
            </div>                                                
             </li>
             <li className="hidden sm:inline text-slate-800 hover:text-teal-500 uppercase font-semibold"><NavLink to={"/"} className={({isActive}) => isActive ? "text-teal-500 font-semibold" : ""}>Home</NavLink></li>
             <li className="hidden sm:inline text-slate-800 hover:text-teal-500 uppercase font-semibold"><NavLink to={"about"}  className={({isActive}) => isActive ? "text-teal-500 font-semibold" : ""}>About</NavLink></li>
             <li className="hover:text-teal-500 uppercase border text-slate-800 pr-8 sm:pr-0 font-semibold">{user ? <button className="uppercase font-semibold" onClick={handleLogout}>Logout</button>
             :<NavLink to={"login"}  className={({isActive}) => isActive ? "text-teal-500 font-semibold" : ""}>Login</NavLink>}</li>
             {/* <li className="text-slate-700 hover:text-green-300 uppercase font-semibold">{user ? (<> <span className="hover:text-slate-600">{user.username}!</span>
             <button className="mx-2 uppercase" onClick={handleLogout}>Logout</button></>) : <NavLink to={"login"}  className={({isActive}) => isActive ? "text-green-300 font-bold" : ""}>Login</NavLink>}</li> */}
             
           </ul>
}

{/* <li>{user ? <span>Welcome, {user.username}!</span> : <NavLink to="/login">Logout</NavLink>}</li> */}

// function handleToggleReset () {
//   setIsToggle(false)
// }
{/* <div>
    {user && <button className="uppercase font-bold" onClick={handleToggle}>@{user.username}</button> }
    {isToggle && (<div className="flex flex-col">
      <button onClick={handleToggleReset}><Link to={"/profile"}>Profile</Link></button>
      <button onClick={handleToggleReset}><Link to={"/createblog"}>create blog</Link></button>
    </div>)}
</div> */}
