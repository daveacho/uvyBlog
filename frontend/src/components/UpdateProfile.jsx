import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ACCESS_TOKEN } from "../constant";
import API_URL from "../config";

// const API_URL = "http://127.0.0.1:8000/";
const token = localStorage.getItem(ACCESS_TOKEN);


export default function UpdateProfile() {
const [image, setImage] = useState(null);
const [imageFileURL, setImageFileURL] = useState(null);
const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const [bio, setBio] = useState("");
const [about, setAbout] = useState("");

const { slug } = useParams();
const navigate = useNavigate();
const filePickerRef = useRef();

// const userImage = userBio.image ? `${API_URL}${userBio.image}` : `${API_URL}/media/default_images/img2.png`;

// Fetch user profile data and populate form
useEffect(() => {
async function fetchUserProfile() {


    try {
        const res = await fetch(`${API_URL}/user_info/${slug}`, {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
        });
        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data = await res.json();
        console.log("updated data:", data)
        
        setEmail(data.email);
        setUsername(data.username);
        setFirstname(data.first_name);
        setLastname(data.last_name);
        setBio(data.bio);
        setAbout(data.about);

        const userImage = data.image ? `${API_URL}${data.image}` : `${API_URL}media/default_images/img2.png`;

        setImageFileURL(userImage);

        // if (data.image) {
        //                         setImageFileURL(`${API_URL}${data.image}`);
        //                 }
        
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
}

fetchUserProfile();
}, [slug])

const handleImageChange = (e) => {
const file = e.target.files[0];
if (file) {
    setImage(file);
    setImageFileURL(URL.createObjectURL(file))
  }
};


async function handleSubmit(e) {
    e.preventDefault();

    const formDataObj = new FormData();
    
    formDataObj.append("email", email);
    formDataObj.append("username", username);
    formDataObj.append("first_name", firstname);
    formDataObj.append("last_name", lastname);
    formDataObj.append("bio", bio);
    formDataObj.append("about", about);

    if (image) {
        formDataObj.append("image", image);
      }

    try {
        const res = await fetch(`${API_URL}/update_profile/`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`, // Only include Authorization
            },
            body: formDataObj,
        });

        if (!res.ok) throw new Error("Failed to update profile");
        const data = await res.json();
        console.log("Profile updated successfully:", data);
        navigate(`/profile/${slug}`);
    } catch (error) {
        console.error("Error updating profile:", error);
    }
}


return (
<div className="max-w-lg mx-auto w-full p-3 mb-14">
    <h1 className=" mt-20 text-center text-3xl font-semibold">Update Profile</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
        <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
        />
        <div
            className="w-32 h-32 self-center mb-6"
            onClick={() => filePickerRef.current.click()}
        >
            <img
                className="w-full h-full rounded-full border-4 shadow-lg border-teal-500"
                src={imageFileURL}
                alt="Profile"
            />
        </div>
        <input
            type="email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            placeholder="Email..."
            className="rounded-lg p-3 focus:outline-none
            focus:ring focus:ring-teal-500"
        />
        <input
            type="text"
            value={username}
            onChange={(e) =>setUsername(e.target.value)}
            placeholder="Username..."
            className="rounded-lg p-3 focus:outline-none
            focus:ring focus:ring-teal-500"
        />
        <input
            type="text"
            value={firstname}
            onChange={(e) =>setFirstname(e.target.value)}
            placeholder="First Name..."
            className="rounded-lg p-3 focus:outline-none
            focus:ring focus:ring-teal-500"
        />
        <input
            type="text"
            value={lastname}
            onChange={(e) =>setLastname(e.target.value)}
            placeholder="Last Name..."
            className="rounded-lg p-3 focus:outline-none
            focus:ring focus:ring-teal-500"
        />
        <input
            type="text"
            value={bio}
            onChange={(e) =>setBio(e.target.value)}
            placeholder="Bio..."
            className="rounded-lg p-3 focus:outline-none
            focus:ring focus:ring-teal-500"
        />
        <textarea
            name="about"
            value={about}
            onChange={(e) =>setAbout(e.target.value)}
            placeholder="About..."
            className="rounded-lg p-3 focus:outline-none
            focus:ring focus:ring-teal-500 mb-10"
        />
        <button
            type="submit"
            className="uppercase bg-teal-500 text-white 
            py-2 px-4 rounded-lg hover:opacity-95 mb-10"
        >
            Update
        </button>
    </form>
</div>
);
}





// import { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ACCESS_TOKEN } from "../constant";

// const API_URL = "http://127.0.0.1:8000/";

// export default function UpdateProfile() {
//     const [imageFile, setImageFile] = useState(null);
//     const [imageFileURL, setImageFileURL] = useState(null);
//     const [formData, setFormData] = useState({
//         image: "",
//         email: "",
//         username: "",
//         firstname: "",
//         lastname: "",
//         bio: "",
//         about: "",
//     });

//     const { slug } = useParams();
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     const navigate = useNavigate();

//     const filePickerRef = useRef();

//     // Fetch user profile data and populate form
//     useEffect(() => {
//         async function fetchUserProfile() {
//             try {
//                 const res = await fetch(`${API_URL}user_info/${slug}`, {
//                     method: "GET",
//                     headers: {
//                         "Authorization" : `Bearer ${token}`
//                     },
//                 });
//                 if (!res.ok) throw new Error("Failed to fetch user profile");

//                 const data = await res.json();
//                 setFormData((prev) => ({
//                     ...prev,
//                     image: data.image || "",
//                     email: data.email || "",
//                     username: data.username || "",
//                     firstname: data.first_name || "",
//                     lastname: data.last_name || "",
//                     bio: data.bio || "",
//                     about: data.about || "",
//                 }));
//                 if (data.image) {
//                     setImageFileURL(`${API_URL}${data.image}`);
//                 }
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//             }
//         }

//         fetchUserProfile();
//     }, [slug]);

//     function handleImageFile(e) {
//         const file = e.target.files[0];
//         if (file) {
//             setImageFile(file);
//             setImageFileURL(URL.createObjectURL(file)); // Preview selected image
//         }
//     }

//     function handleChange(e) {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
    
//         const formDataObj = new FormData();
//         formDataObj.append("image", imageFile); // File upload
//         formDataObj.append("email", formData.email);
//         formDataObj.append("username", formData.username);
//         formDataObj.append("firstname", formData.firstname);
//         formDataObj.append("lastname", formData.lastname);
//         formDataObj.append("bio", formData.bio);
//         formDataObj.append("about", formData.about);
    
//         try {
//             const res = await fetch(`${API_URL}update_profile/`, {
//                 method: "PUT",
//                 headers: {
//                     "Authorization": `Bearer ${token}`, // Only include Authorization
//                 },
//                 body: formDataObj,
//             });
    
//             if (!res.ok) throw new Error("Failed to update profile");
//             const data = await res.json();
//             console.log("Profile updated successfully:", data);
//             navigate(`/profile/${slug}`);
//         } catch (error) {
//             console.error("Error updating profile:", error);
//         }
//     }
    

//     // async function handleSubmit(e) {
//     //     e.preventDefault();

//     //     const updatedFormData = new FormData();
//     //     if (imageFile) updatedFormData.append("image", imageFile);
//     //     for (const [key, value] of Object.entries(formData)) {
//     //         updatedFormData.append(key, value);
//     //     }

//     //     try {
//     //         const res = await fetch(`${API_URL}update_profile/`, {
//     //             method: "PUT",
//     //             headers: {
//     //                 Authorization: `Bearer ${token}`,
//     //             },
//     //             body: updatedFormData,
//     //         });

//     //         if (!res.ok) throw new Error("Failed to update profile");

//     //         console.log("Profile updated successfully");
//     //         navigate(`/profile/${slug}`); // Redirect to profile page 
//     //     } catch (error) {
//     //         console.error("Error updating profile:", error);
//     //     }
//     // }


//     // async function handleSubmit(e) {
//     //     e.preventDefault();
    
//     //     const updatedFormData = new FormData();
//     //     if (imageFile) updatedFormData.append("image", imageFile); // Add the image file
//     //     for (const [key, value] of Object.entries(formData)) {
//     //         updatedFormData.append(key, value); // Add other fields
//     //     }
    
//     //     try {
//     //         const res = await fetch(`${API_URL}update_profile/`, {
//     //             method: "PUT",
//     //             headers: {
//     //                 Authorization: `Bearer ${token}`, // Authorization token
//     //                 // Do NOT set 'Content-Type' manually
//     //             },
//     //             body: updatedFormData, // Send FormData directly
//     //         });
    
//     //         if (!res.ok) throw new Error("Failed to update profile");
    
//     //         console.log("Profile updated successfully");
//     //         navigate(`/profile/${slug}`); // Redirect to profile page
//     //     } catch (error) {
//     //         console.error("Error updating profile:", error);
//     //     }
//     // }
    


//     return (
//         <div className="max-w-lg mx-auto w-full p-3 mb-14">
//             <h1 className=" my-8 text-center text-3xl font-semibold">Update Profile</h1>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 <input
//                     className="hidden"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageFile}
//                     ref={filePickerRef}
//                 />
//                 <div
//                     className="w-32 h-32 self-center mb-6"
//                     onClick={() => filePickerRef.current.click()}
//                 >
//                     <img
//                         className="w-full h-full rounded-full"
//                         src={imageFileURL || "img1.png"}
//                         alt="Profile"
//                     />
//                 </div>
//                 <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email..."
//                     className="rounded-lg p-3 border"
//                 />
//                 <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="Username..."
//                     className="rounded-lg p-3 border"
//                 />
//                 <input
//                     type="text"
//                     name="firstname"
//                     value={formData.firstname}
//                     onChange={handleChange}
//                     placeholder="First Name..."
//                     className="rounded-lg p-3 border"
//                 />
//                 <input
//                     type="text"
//                     name="lastname"
//                     value={formData.lastname}
//                     onChange={handleChange}
//                     placeholder="Last Name..."
//                     className="rounded-lg p-3 border"
//                 />
//                 <input
//                     type="text"
//                     name="bio"
//                     value={formData.bio}
//                     onChange={handleChange}
//                     placeholder="Bio..."
//                     className="rounded-lg p-3 border"
//                 />
//                 <textarea
//                     name="about"
//                     value={formData.about}
//                     onChange={handleChange}
//                     placeholder="About..."
//                     className="rounded-lg p-3 border"
//                 />
//                 <button
//                     type="submit"
//                     className="uppercase bg-teal-500 text-white 
//                     py-2 px-4 rounded-lg hover:opacity-95"
//                 >
//                     Update
//                 </button>
//             </form>
//         </div>
//     );
// }



// import { useState, useEffect, useRef } from "react";
// import { ACCESS_TOKEN } from "../constant";
// import { useNavigate, useParams } from "react-router-dom";

// const API_URL = "http://127.0.0.1:8000/";

// // Check if user is logged in
// const user = JSON.parse(localStorage.getItem("user")); // Parse the stored user details

// export default function UpdateProfile() {
//     const [imageFile, setImageFile] = useState(null);
//     const [imageFileURL, setImageFileURL] = useState(null);
//     const [formData, setFormData] = useState({
//         image: "",
//         email: "",
//         username: "",
//         firstname: "",
//         lastname: "",
//         bio: "",
//         about: "",
//     });

//     const {slug} = useParams()

//     const filePickerRef = useRef();
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     const navigate = useNavigate(); // For redirecting after update

//     // Handle file input
//     function handleImageFile(e) {
//         const file = e.target.files[0];

//         if (file) {
//             setImageFile(file);
//             setImageFileURL(URL.createObjectURL(file)); // Preview the image
//         }
//     }

//     // Handle text inputs
//     function handleChange(e) {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     }

//      // Fetch blog details on component mount
//   useEffect(() => {
//     async function fetchUserInfo() {
//       try {
//         const res = await fetch(`${API_URL}user_info/${slug}`);
//         if (!res.ok) throw new Error("Failed to fetch user info");
        
//         const data = await res.json();
        
//         // Set the initial state with fetched data
//         setFormData(data.image)
//         setFormData(data.email)
//         setFormData(data.username)
//         setFormData(data.first_nME)
//         setFormData(data.last_name)
//         setFormData(data.bio)
        
//       } catch (error) {
//         console.error("Error fetching note:", error);
//       }
//     }

//     fetchUserInfo();
//   }, [slug])

//     // Handle form submission
//     async function handleSubmit(e) {
//         e.preventDefault();

//         const updatedFormData = new FormData();
//         if (imageFile) updatedFormData.append("image", imageFile); // Add image if selected
//         for (const [key, value] of Object.entries(formData)) {
//             updatedFormData.append(key, value); // Add other fields
//         }

//         try {
//             const res = await fetch(`${API_URL}update_profile/`, {
//                 method: "PUT",
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Authorization token
//                 },
//                 body: updatedFormData, // Send FormData directly
//             });

//             if (!res.ok) throw new Error("Profile update failed");

//             const data = await res.json();
//             console.log("Profile updated successfully:", data);

//             // Redirect to profile page
//             navigate(`/profile/${user.username}`);
//         } catch (error) {
//             console.error("Error updating profile:", error);
//         }
//     }

//     return (
//         <div className="max-w-lg mx-auto m-6">
//             <h1 className="mb-3 text-center">Update Profile</h1>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 <input
//                     className="hidden"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageFile}
//                     ref={filePickerRef}
//                 />
//                 <div
//                     className="w-32 h-32 self-center"
//                     onClick={() => filePickerRef.current.click()}
//                 >
//                     <img
//                         className="w-full h-full rounded-full"
//                         src={imageFileURL || "img1.png"}
//                         alt="Profile"
//                     />
//                 </div>
//                 <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email..."
//                 />
//                 <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="Username..."
//                 />
//                 <input
//                     type="text"
//                     name="firstname"
//                     value={formData.firstname}
//                     onChange={handleChange}
//                     placeholder="First Name..."
//                 />
//                 <input
//                     type="text"
//                     name="lastname"
//                     value={formData.lastname}
//                     onChange={handleChange}
//                     placeholder="Last Name..."
//                 />
//                 <input
//                     type="text"
//                     name="bio"
//                     value={formData.bio}
//                     onChange={handleChange}
//                     placeholder="Bio..."
//                 />
//                 <textarea
//                     name="about"
//                     value={formData.about}
//                     onChange={handleChange}
//                     placeholder="About..."
//                 />
//                 <button
//                     type="submit"
//                     className="uppercase bg-slate-600 rounded-lg p-2 text-white"
//                 >
//                     Update
//                 </button>
//             </form>
//         </div>
//     );
// }



// import { useState, useRef } from "react";
// import { ACCESS_TOKEN } from "../constant";
// import { Link } from "react-router-dom";

// const API_URL = "http://127.0.0.1:8000/update_profile/";

// // Check if user is logged in
// const user = JSON.parse(localStorage.getItem("user")); // Parse the stored user details

// export default function UpdateProfile() {
//     const [imageFile, setImageFile] = useState(null);
//     const [imageFileURL, setImageFileURL] = useState(null);

//     const filePickerRef = useRef();
//     const token = localStorage.getItem(ACCESS_TOKEN);

//     function handleImageFile(e) {
//         const file = e.target.files[0];

//         if (file) {
//             setImageFile(file);
//             setImageFileURL(URL.createObjectURL(file)); // Preview the image
//         }
//     }

//     console.log(imageFile, imageFileURL)

//     async function handleSubmit(e) {
//         e.preventDefault();
//         await uploadingImage();
//     }

//     async function uploadingImage() {
//         if (!imageFile) {
//             console.log("No file selected");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("image", imageFile); // Matches the backend field name

//         try {
//             const res = await fetch(`${API_URL}`, {
//                 method: "PUT",
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Authorization token
//                 },
//                 body: formData, // Send FormData directly
//             });

//             if (!res.ok) throw new Error("Upload failed");

//             const data = await res.json();
//             console.log("Upload successful:", data);

//             if (data.image) {
//                 setImageFileURL(data.image); // Update image preview
//             }
//         } catch (error) {
//             console.error("Error uploading image:", error);
//         }
//     }

//     return (
//         <div className="max-w-lg mx-auto m-6">
//             <h1 className="mb-3 text-center">Update Profile</h1>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 <input
//                     className="hidden"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageFile}
//                     ref={filePickerRef}
//                 />
//                 <div
//                     className="w-32 h-32 self-center"
//                     onClick={() => filePickerRef.current.click()}
//                 >
//                     <img
//                         className="w-full h-full rounded-full"
//                         src={imageFileURL || "img1.png"}
//                         alt="Profile"
//                     />
//                 </div>
//                 <input
//                     type="email"
//                     placeholder="email..."
//                 />
//                 <input
//                     type="text"
//                     placeholder="username..."
//                 />
//                 <input
//                     type="text"
//                     placeholder="firstname..."
//                 />
//                 <input
//                     type="text"
//                     placeholder="lastname..."
//                 />
//                 <input
//                     type="text"
//                     placeholder="bio..."
//                 />
//                 <input
//                     type="text"
//                     placeholder="about..."
//                 />
//                 <button type="submit" className="uppercase bg-slate-600
//                 rounded-lg p-2"><Link to={`/profile/${user.username}`}>Update</Link></button>
//             </form>
//         </div>
//     );
// }
