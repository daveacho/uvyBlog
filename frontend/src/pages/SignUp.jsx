import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config";

// const API_URL = 'http://127.0.0.1:8000/signup/'

async function signUp(newSignUp) {
   try {
     const res = await fetch(`${API_URL}signup/`, {
       method: "POST",
       body: JSON.stringify(newSignUp),
       headers: {
         "Content-Type": "application/json",
       },
     });
 
     if (!res.ok) throw Error("Failed registering new user");
     const data = await res.json();
     console.log("New user added:", data);
     return data;
   } catch (error) {
     console.error(error.message);
     throw error;
   }
 }

export default function SignUp () {
   const [username, setUsername] = useState("")
   const [first_name, setFirstName] = useState("")
   const [last_name, setLastName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [errorMessage, setErrorMessage] = useState("")
   const [loading, setIsLoading] = useState(false)

   const navigate = useNavigate()

   async function handleSubmit (e) {
      e.preventDefault();

      if (!username || !first_name || !last_name || !email || !password) {
         return setErrorMessage("Please fill all fields.")
      }

      const newUser = {username, first_name, last_name, email, password}
      console.log("Created new user:", newUser)

      try {
         setIsLoading(true)
         setErrorMessage(null)
         await signUp(newUser); //wait for the new user to be added
         setIsLoading(false)

         navigate('/login')
         
         
      } catch (error) {
         console.log(error)
         alert('There was an error adding new user. Please try again.');
         setIsLoading(false)
      }

   }

    return <main className="p-3 max-w-lg mx-auto w-full">
            
             <h1 className="text-3xl text-center font-semibold mt-14 mb-10">
                Sign Up
             </h1>
             <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="username..." value={username} 
                onChange={(e)=>setUsername(e.target.value.trim())}
                className="border p-3 rounded-xl focus:outline-none focus:ring focus:ring-teal-500" />
                <input type="text" placeholder="firstname..." value={first_name} 
                onChange={(e) =>setFirstName(e.target.value.trim())}
                className="border p-3 rounded-xl focus:outline-none focus:ring focus:ring-teal-500"/>
                <input type="text" placeholder="lastname..." value={last_name} 
                onChange={(e) =>setLastName(e.target.value.trim())}
                className="border p-3 rounded-xl focus:outline-none focus:ring focus:ring-teal-500" />
                <input type="email" placeholder="email..." value={email} 
                onChange={(e)=>setEmail(e.target.value.trim())}
                className="border p-3 rounded-xl focus:outline-none focus:ring focus:ring-teal-500"/>
                <input type="password" placeholder="password..." value={password} 
                onChange={(e) =>setPassword(e.target.value.trim())}
                className="border p-3 rounded-xl focus:outline-none focus:ring focus:ring-teal-500"/>
                <button disabled={loading} className="bg-teal-500 p-3 
                rounded-xl text-white uppercase hover:opacity-95">
                  {loading ? 'Loading...' : 'sign up' }</button>
             </form>
             {errorMessage && <div className="bg-red-300 text-slate-700 mt-4 p-3 rounded-lg">{errorMessage}</div>}
             <div className="mt-4 mb-14 flex gap-2">
             <p>Have an account? </p> 
             <Link to={"/login"}>
             <span className="text-blue-800">Login</span></Link>
             </div>
            </main>
}