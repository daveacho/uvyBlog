import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ACCESS_TOKEN } from "../constant";
import API_URL from "../config";

// const API_URL = "http://127.0.0.1:8000/";
const token = localStorage.getItem(ACCESS_TOKEN);

export default function UpdateBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("BUSINESS");
  const [blogImage, setBlogImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`${API_URL}/blog_detail/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch blog");

        const data = await res.json();
        setTitle(data.title);
        setCategory(data.category);
        setPreviewImage(`${API_URL}${data.featured_image}`);
        setBody(data.body);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }

    fetchBlog();
  }, [slug]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBlogImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !body || !category) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("category", category);
    if (blogImage) {
      formData.append("featured_image", blogImage);
    }

    try {
      const res = await fetch(`${API_URL}/update_blog/${slug}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed updating blog");
      const data = await res.json();
      console.log("Blog updated:", data);
      navigate("/search");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("There was an error updating the blog. Please try again.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto min-h-screen w-full p-3">
      <h1 className="text-center text-3xl font-semibold my-10 uppercase">Update Blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <input
            type="text"
            placeholder="Please enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-md p-3 focus:outline-none
            focus:ring focus:ring-teal-500 flex-1"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md p-3 flex-1 focus:ring focus:ring-teal-500"
          >
            <option value="PROGRAMMING">Programming</option>
            <option value="CLOUD">Cloud</option>
            <option value="DEVOPS">Devops</option>
          </select>
        </div>
        <div className="border-2 border-4 border-dotted border-teal-500
        flex items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="rounded-md mb-5 p-3"
          />
          </div>
          <img
            src={previewImage || "img1.png"}
            alt="blog preview"
            className="h-48 w-full mb-5 object-center"
          />
        
        <ReactQuill
          theme="snow"
          placeholder="Write something ..."
          value={body}
          onChange={setBody} // Directly use setBody
          className=""
        />
          <button type="submit" className="uppercase text-white bg-teal-500 text-xl rounded-lg p-3 mb-20">
            Update Blog
          </button>
      </form>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { ACCESS_TOKEN } from "../constant";

// const API_URL = "http://127.0.0.1:8000/";
// const token = localStorage.getItem(ACCESS_TOKEN);

// export default function UpdateBlog() {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [category, setCategory] = useState("BUSINESS");
//   const [blogImage, setBlogImage] = useState(null);

//   const { slug } = useParams();
//   const navigate = useNavigate();

//   // Fetch blog details on component mount
//   useEffect(() => {
//     async function fetchBlog() {
//       try {
//         const res = await fetch(`${API_URL}blog_detail/${slug}`);
//         if (!res.ok) throw new Error("Failed to fetch blog");
        
//         const data = await res.json();
//         console.log("fetched data: ", data)
        
//         // Set the initial state with fetched data
//         setTitle(data.title);
//         setCategory(data.category);
//         setBlogImage(data.featured_image)
//         setBody(data.body);
        
        
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//       }
//     }

//     fetchBlog();
//   }, [slug]); // Dependency on `slug` ensures it runs on mount and when `slug` changes

//   async function updateBlog(updatedBlog) {
//     try {
//       const res = await fetch(`${API_URL}update_blog/${slug}/`, {
//         method: "PUT",
//         body: JSON.stringify(updatedBlog),
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//       });

//       if (!res.ok) throw new Error("Failed updating blog");
//       const data = await res.json();
//       console.log("Blog updated:", data);
//       return data;
//     } catch (error) {
//       console.error("Error updating blog:", error);
//       throw error;
//     }
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!title || !body || !category) return;

//     const updatedBlog = { title, category, blogImage, body };
//     console.log("Submitting updated blog:", updatedBlog);

//     try {
//       await updateBlog(updatedBlog);
//       navigate("/search");
//     } catch {
//       alert("There was an error updating the blog. Please try again.");
//     }
//   }

//   return (
//     <div className="max-w-lg mx-auto min-h-screen">
//       <h1>Update Blog</h1>
//       <form onSubmit={handleSubmit} >
//           <div className="">
//             <input
//               type="text"
//               placeholder="Please enter a title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="input"
//             />
//             <select value={category} onChange={(e) => setCategory(e.target.value)} className="grow focus:outline-none rounded-md">
//               <option value="BUSINESS">Business</option>
//               <option value="PERSONAL">Personal</option>
//               <option value="IMPORTANT">Important</option>
//             </select>
//           </div>
//           <div>
//           <img src={ blogImage ? `${API_URL}${blogImage}` : "img1.png"} alt="computer" className="
//                 h-[320px] sm:h-[220px] w-full object-cover"/>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setBlogImage(e.target.files[0])}
//             className="rounded-md"
//             />
//           </div>
//           <ReactQuill
//            theme="snow"
//            placeholder="write something ..."
//            value={body}
//            onChange={(e) => setBody(e.target.value)}   
//            />

//           <div><button type="submit" className="uppercase text-white bg-teal-500">Update Blog</button></div>
//         </form>
//         </div>  
//        ); 
//     }    
      