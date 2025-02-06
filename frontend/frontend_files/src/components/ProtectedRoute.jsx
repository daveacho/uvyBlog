import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import { useState, useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) throw new Error("No access token found");

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp * 1000; // Convert to milliseconds
        const now = Date.now();

        if (tokenExpiration < now) {
          // Token is expired, attempt to refresh
          await refreshToken();
        } else {
          // Token is valid
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        handleUnauthenticated();
      }
    };

    checkAuth();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) throw new Error("No refresh token found");

    try {
      const res = await api.post("/refresh/", { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      handleUnauthenticated();
    }
  };

  const handleUnauthenticated = () => {
    // Clear tokens and redirect to login
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsAuthorized(false);
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Render a loading state while checking authorization
  }

  if (!isAuthorized) {
    navigate("/login", { replace: true }); // Redirect to login if unauthorized
    return null;
  }

  return children; // Render the protected content if authorized
}



// import { useNavigate } from 'react-router-dom'
// import {jwtDecode} from 'jwt-decode'
// import api from '../api'
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constant'
// import { useState, useEffect } from 'react'

// export default function ProtectedRoute ({children}) {
//     const [isAuthorized, setIsAuthorized] = useState(null)

//     const navigate = useNavigate()

//     useEffect(() => {
//         auth().catch(() => setIsAuthorized(false))
//     }, [])

//     const refreshToken = async () => {
//         const refreshToken = localStorage.getItem(REFRESH_TOKEN)
//         try {
//             const res = await api.post('/refresh/', {refresh: refreshToken});
//             if (res.status === 200) {
//                 localStorage.setItem(ACCESS_TOKEN, res.data.access)
//                 setIsAuthorized(true)
//             } else {
//                 setIsAuthorized(false)
//             }
            
//         } catch (error) {
//             console.log(error)
//             setIsAuthorized(false)
            
//         }
//     }

//     const auth = async () => {
//         const token = localStorage.getItem(ACCESS_TOKEN)
//         if (!token) {
//             setIsAuthorized(false)
//             return
//         }
//         const decoded = jwtDecode(token)
//         const tokenExpiration = decoded.exp
//         const now = Date.now()
//         if (tokenExpiration < now){
//             await refreshToken()
//         } else {
//             setIsAuthorized(true)
//         }
//     }

//     if (isAuthorized === null) return <div>Loading...</div>

//     return isAuthorized ? children : navigate('/login')
// }