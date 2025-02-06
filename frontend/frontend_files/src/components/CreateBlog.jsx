import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constant";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import API_URL from "../config";

// const API_URL = "http://127.0.0.1:8000/create_blog/";
const token = localStorage.getItem(ACCESS_TOKEN);

export default function CreateBlogs() {
  const [blogImage, setBlogImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    body: "",
  });

  const navigate = useNavigate();

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle ReactQuill body change
  const handleBodyChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      body: value,
    }));
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title || !formData.category || !blogImage || !formData.body) {
      alert("Please fill out all fields.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("body", formData.body);
    data.append("featured_image", blogImage);

    try {
      const res = await fetch(`${API_URL}/create_blog/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
        body: data,
      });

      if (!res.ok) throw new Error("Failed to create blog");
      const result = await res.json();
      console.log("Blog created successfully:", result);
      console.log("Current Access Token:", token);

      navigate("/search"); // Navigate back after success to home page
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog. Please try again.");
    }
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen w-full">
      <h1 className="text-center text-3xl font-semibold my-10 uppercase">Create Blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 justify-between sm:flex-row">
          <input
            type="text"
            name="title"
            placeholder="Please enter a title"
            value={formData.title}
            onChange={handleChange}
            className="flex-1 p-3 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="rounded-lg p-3 focus:outline-none flex-1 focus:ring focus:ring-teal-500"
          >
            <option value="">Select a category</option>
            <option value="PROGRAMMING">Programming</option>
            <option value="CLOUD">Cloud</option>
            <option value="DEVOPS">Devops</option>
          </select>
        </div>
        <div className="flex items-center justify-between border border-teal-500 border-dotted p-3 border-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBlogImage(e.target.files[0])}
            className="rounded-md"
          />
        </div>
        <ReactQuill
          theme="snow"
          value={formData.body}
          onChange={handleBodyChange}
          placeholder="Write something..."
          className="mb-8"
        />
        <button type="submit" className="p-3 rounded-lg uppercase bg-teal-500 text-xl text-white">
          Create Blog
        </button>
      </form>
    </div>
  );
}



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN } from "../constant";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const API_URL = "http://127.0.0.1:8000/create_note/";
// const token = localStorage.getItem(ACCESS_TOKEN);

// async function createBlog(newBlog) {
//   try {
//     const res = await fetch(`${API_URL}`, {
//       method: "POST",
//       body: JSON.stringify(newBlog),
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//     });

//     if (!res.ok) throw Error("Failed adding note");
//     const data = await res.json();
//     console.log("New note added:", data);
//     return data;
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// }

// export default function CreateBlogs() {
//   const [blogImage, setBlogImage] = useState("");
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     blogImage: "",
//     body: "",
// });
  

//   const navigate = useNavigate();

//   function handleUploadImage () {
//     if (!blogImage) return
//     try {
      
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!title || !category || !blogImage || !body) return;

//     const newItem = { title,category, blogImage, body };
//     console.log("Submitting new note:", newItem);

//     try {
//       await createBlog(newItem); // Wait for note to be added
//       navigate(-1); // Go back to the previous page after successful submission
//     } catch {
//       alert("There was an error adding the note. Please try again.");
//     }
//   }

//   return (
//     <div className="p-3 max-w-3xl mx-auto min-h-screen">
//       <h1 className="text-center text-3xl font-semibold my-7 uppercase">Create blog</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-8">
//         <div className="flex flex-col gap-8 justify-between sm:flex-row">
//             <input
//               type="text"
//               placeholder="Please enter a title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="flex-1 p-3 rounded-lg focus:outline-none"
//             />
//             <select value={category} onChange={(e) => setCategory(e.target.value)} 
//             className="rounded-lg p-3 focus:outline-none">
//               <option value="Select">Select a category</option>
//               <option value="BUSINESS">Business</option>
//               <option value="PERSONAL">Personal</option>
//               <option value="IMPORTANT">Important</option>
//             </select>
//         </div>
//         <div className="flex items-center justify-between border
//         border-teal-500 border-dotted p-3 border-4">
//           <input type="file" accept="image/*"
//             onChange={(e) => setBlogImage(e.target.files[0])} 
//             className="rounded-md"
//           />
//           <button onClick={handleUploadImage} className="border border-green-400 p-2
//           rounded-lg text-lg">upload image</button>
//         </div>
//         <ReactQuill theme="snow" placeholder="write something..." 
//         className="mb-8"/>
//         <button type="submit" className="p-3 rounded-lg uppercase bg-teal-500 text-xl">create blog</button>
//       </form>
//     </div>
//   );
// }


// {/* <button onClick={(e) => {e.preventDefault(); navigate(-1)}}>Add Note</button> */}

// //when you click on the AddNote button, you are adding a new note to the notes in the notecontainer
// //and in react, to add an element to an array, you use the spread operator.
// //