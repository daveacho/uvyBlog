import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";

const API_URL = "http://127.0.0.1:8000/token/";

async function login(userLogin) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json(); // Parse server response for detailed errors
      throw new Error(errorData.detail || "Failed login!");
    }

    const data = await res.json();
    localStorage.setItem(ACCESS_TOKEN, data.access);
    localStorage.setItem(REFRESH_TOKEN, data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user)); // Store user details as a string
    console.log("Login was successful: ", data);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage(null); // Clear previous errors

    const loginData = {
      email: email.trim(),
      password: password.trim(),
    };

    if (!loginData.email || !loginData.password) {
      setErrorMessage("Please provide both email and password.");
      return;
    }

    try {
      setIsLoading(true);
      await login(loginData);
      setIsLoading(false);
      navigate("/"); // Redirect to home after successful login
    } catch (error) {
      setErrorMessage(error.message); // Show error message from API
      setIsLoading(false);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto w-full">
      <h1 className="text-3xl mt-14 mb-10 text-center font-semibold">Login</h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="name@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-lg focus:outline-none
          focus:ring focus:ring-teal-500"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-lg focus:outline-none
          focus:ring focus:ring-teal-500"
        />
        <button
          className="uppercase bg-teal-500 rounded-lg p-3 hover:opacity-95 text-white"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      {errorMessage && (
        <div className="mt-4 text-red-600 rounded-lg bg-red-100 p-2">
          {errorMessage}
        </div>
      )}
      <div className="mt-4 mb-14 flex gap-2">
        <p>Don't have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-800">Sign up</span>
        </Link>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

// const API_URL = "http://127.0.0.1:8000/token/";

// async function loginUser(loginData) {
//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       body: JSON.stringify(loginData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Login failed");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// }

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setErrorMessage("");

//     if (!email || !password) {
//       return setErrorMessage("Please enter both email and password.");
//     }

//     const loginData = { email, password };

//     try {
//       setLoading(true);
//       const res = await loginUser(loginData);

//       // Store tokens and user info in localStorage
//       localStorage.setItem(ACCESS_TOKEN, res.access);
//       localStorage.setItem(REFRESH_TOKEN, res.refresh);
//       localStorage.setItem("user", JSON.stringify(res.user)); // Store user details as a string

//       setLoading(false);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Login failed. Please try again.");
//       setLoading(false);
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">{loading ? "Loading..." : "Login"}</button>
//       </form>
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   );
// }



// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";

// const API_URL = 'http://127.0.0.1:8000/token/'

// async function login(userLogin) {
//     try {
//         const res = await fetch(`${API_URL}`, {
//             method: "POST",
//             body: JSON.stringify(userLogin),
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         })
    
//         if (!res.ok) {
//             throw new Error("Failed login!!");    
//         }

//         localStorage.setItem(ACCESS_TOKEN, res.data.access)
//         localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
    
//         const data = await res.json()
//         console.log("Login was successful: ", data)
//         return data
//     } catch (error) {
//         console.error(error.message); throw error;    
//     }
// }

// export default function Login () {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [errorMessage, setErrorMessage] = useState("")
//     const [loading, setIsLoading] = useState("")

//     const navigate = useNavigate()

//     async function handleSubmit(e) {
//         e.preventDefault();
        
//         if (!email || !password) {
//             return setErrorMessage("lOGIN FAILED TRY AGAIN!!!")
//         }

//         const loginData = {email, password}

//         try {
//             setIsLoading(true)
//             await login(loginData)
//             setIsLoading(false)
//             navigate('/')
//         } catch (error) {
//             console.log(error)
//             alert('Login not successful. Please try again.');
//             setIsLoading(false)
//         }
//     }

    

//     return <main className="p-3 max-w-xl mx-auto">
//             <h1 className=" text-3xl my-7 text-center font-semibold">Login</h1>
//             <form className="flex flex-col gap-4 sm:gap-8" onSubmit={handleSubmit}>
//                 <input type="email" placeholder="name@gmail.com" value={email}
//                 onChange={(e)=>setEmail(e.target.value.trim())}
//                 className="p-3 rounded-xl border" />
//                 <input type="password" placeholder="*********" value={password}
//                 onChange={(e)=>setPassword(e.target.value.trim())}
//                 className="p-3 rounded-xl border" />
//                 <button className="uppercase
//                 bg-slate-600 rounded-xl p-3 text-white">
//                     {loading ? 'loading...' : 'Login'}
//                 </button>
//             </form>
//             {errorMessage && <div className="mt-8 text-red-600 rounded-lg">{errorMessage}</div>}
//             <div className="mt-4 flex gap-2">
//                 <p>Dont have an account?</p>
//                 <Link to={"/signup"}>
//                 <span className="text-blue-700">Sign up</span>
//                 </Link>
//             </div>
//            </main>
// }