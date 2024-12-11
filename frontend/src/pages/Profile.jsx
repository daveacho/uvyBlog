import { Link, useParams } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ACCESS_TOKEN } from "../constant";
import { useEffect, useState } from "react";
import API_URL from "../config";

// const API_URL = "http://127.0.0.1:8000/"
const token = localStorage.getItem(ACCESS_TOKEN)

// const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';


export default function UserProfile () {
    const [ userBio, setUserBio ] = useState("")
    const {slug} = useParams()

    async function userprofile() {
      try {
        const res = await fetch(`${API_URL}user_info/${slug}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        if (!res.ok) throw new Error("Not able to fetch user profile");
        const data = await res.json()
        console.log(data)
        setUserBio(data)
        
      } catch (error) {
        console.error(error)
      }
      
    }

    useEffect(()=>{
      userprofile()
    }, [slug])

    const userImage = userBio.image ? `${API_URL}${userBio.image}` : `${API_URL}media/default_images/img2.png`;
    // src={userBio.image ? `${API_URL}${userBio.image}` : "img1.png"}
    
    return <div className="min-h-screen max-w-lg mx-auto mt-10">
              <div>
                  {userBio && (<div>  
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-32 h-32 m-6"><img className="w-full h-full rounded-full 
                        border-4 border-teal-500 shadow-md" 
                        src={userImage} alt="computer" /></div>
                        <div className="uppercase italic flex justify-center gap-2 text-xs ">
                          <span>{userBio.first_name}</span>
                          <span>{userBio.last_name}</span>
                          </div>
                      </div>
                      
                      <h1 className="text-3xl font-semibold my-7 text-center uppercase text-slate-700">{userBio.bio}</h1>
                      
                      <div className="text-xl my-10 text-gray-500 text-center">
                      <p className="text-base sm:text-lg text-gray-500">{userBio.about}</p>
                      </div>
                  </div>)}
                  <div className="flex items-center justify-center text-gray-500">
                  
                  <div className="flex items-center justify-center gap-3 mb-16">
                    <FaInstagram className="w-8 h-8" />
                    <FaFacebook className="w-8 h-8" />
                    <FaTwitter className="w-8 h-8" />
                    <FaLinkedin className="w-8 h-8" />
                    <FaGithub className="w-8 h-8" />
                  </div>
                  </div>
                  <div className="bg-teal-500 p-3 text-center rounded-lg text-white mb-20">
                  <button className="mr-10 "><Link to={`/profileUpdate/${userBio.username}`}><button className="uppercase">Update Profile</button></Link></button>
                  </div>
              </div>
              {/* <button className="mr-10"><Link to={`/profileUpdate/${userBio.username}`}><FaEdit /></Link></button> */}
           </div>
}

// /${userBio.username}