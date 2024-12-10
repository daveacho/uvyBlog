import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {  Description,Dialog, DialogPanel, DialogTitle } from "@headlessui/react"; // Import Dialog component from Headless UI
import { ACCESS_TOKEN } from "../constant";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const API_URL = "http://127.0.0.1:8000/";

export default function BlogDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [singleNote, setSingleNote] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    
    const token = localStorage.getItem(ACCESS_TOKEN);

    const formattedDate = new Date(singleNote.created).toLocaleDateString()
    

    useEffect(() => {
        
         // Get token and user from localStorage
         const token = localStorage.getItem(ACCESS_TOKEN);
         const storedUser = JSON.parse(localStorage.getItem("user"));
 
         setIsAuthenticated(!!token);
         setUser(storedUser || null);

        const getSingleNote = async () => {
            try {
                const res = await fetch(`${API_URL}blog_detail/${slug}/`);
                if (!res.ok) throw new Error("Failed to fetch the note.");
                const data = await res.json();
                console.log("single note",data)
                setSingleNote( data);
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };
        getSingleNote();
    }, [slug]);

    async function deleteNote() {
        try {
            const res = await fetch(`${API_URL}delete_blog/${slug}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) throw new Error("Failed deleting blog");

            console.log("Blog deleted successfully");
            setIsModalOpen(false); // Close modal after deletion
            navigate("/search"); // Redirect to search page after successful deletion
        } catch (error) {
            console.error("Error deleting blog:", error);
            throw error;
        }
    }

    function handleDelete() {
        setIsModalOpen(true); // Open modal on delete button click
    }

    return (
        <div className="p-3 max-w-6xl mx-auto w-full">
            {singleNote ? (   
                <div className="flex flex-col">
                    <h1 className="uppercase text-3xl mt-10 text-center font-serif
                    max-w-2xl mx-auto lg:text-4xl">{singleNote.title}</h1>
                    <Link className="self-center mt-5" to={"/search"}><button className="text-xs italic border-2 p-1 rounded-md">{singleNote.category}</button></Link>
                    <div className="w-72 h-72 mt-10 w-full max-h-[600px] object-cover">
                    <img src={singleNote.featured_image ? `${API_URL}${singleNote.featured_image}` : "img1.png"} alt="computer" className="
                      h-full w-full object-cover"/>
                    </div>
                    <div className="flex justify-between border-b
                    border-slate-400 p-7 max-w-2xl mx-auto w-full">
                        <span>{singleNote.author}</span>
                        <span>{formattedDate}</span>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: singleNote.body}} className="mt-10 p-3
                    max-w-2xl mx-auto w-full blog_content">
                    {/* <p>{singleNote.body}</p> */}
                    </div>
                    {isAuthenticated && user && singleNote.author === user.username && 
                    <div className="flex items-center justify-between my-8">
                        <Link to={`/blog/${slug}/edit`}>
                        <FaEdit />
                        </Link>
                        <MdDelete onClick={handleDelete} />
                    </div> }
                </div>    
            ) : (
                <p>Loading...</p>
            )}

            {/* Modal for delete confirmation */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                  <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                    <div className="bg-white rounded max-w-sm mx-auto p-6">
                        <DialogTitle className="text-lg font-medium">Confirm Deletion</DialogTitle>
                        <Description className="mt-2">
                           Are you sure you want to delete this note? This action cannot be undone.
                        </Description>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteNote}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                  </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}


// import { useEffect, useState } from "react"; "http://127.0.0.1:8000/getnotes/"
// import { Link, useNavigate, useParams } from "react-router-dom";

// const API_URL = "http://127.0.0.1:8000/notes";

// export default function NoteDetails() {
//     const { slug } = useParams();
//     const navigate = useNavigate();
//     const [singleNote, setSingleNote] = useState(null);

//     // Fetch the single note when the component mounts or when `slug` changes
//     useEffect(() => {
//         const getSingleNote = async () => {
//             try {
//                 const res = await fetch(`${API_URL}/${slug}`);
//                 if (!res.ok) throw new Error("Failed to fetch the note.");
//                 const data = await res.json();
//                 setSingleNote(data);
//             } catch (error) {
//                 console.error("Error fetching note:", error);
//             }
//         };
//         getSingleNote();
//     }, [slug]);

//     async function deleteNote() {
//         try {
//             const res = await fetch(`${API_URL}/${slug}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!res.ok) throw new Error("Failed deleting note");
            
//             console.log("Note deleted successfully");
//             navigate("/notes"); // Redirect after successful deletion
            
//         } catch (error) {
//             console.error("Error deleting note:", error);
//             throw error;
//         }
//     }

//     function handleDelete() {
//         if (window.confirm("Are you sure you want to delete this note?")) {
//             deleteNote();
//         }
//     }

//     return (
//         <div>
//             {singleNote ? (
//                 <div>
//                     <h2>{singleNote.title}</h2>
//                     <p>{singleNote.body}</p>
//                     <button>
//                         <Link to={`/notes/${slug}/edit`}>Edit</Link>
//                     </button>
//                     <button onClick={handleDelete}>Delete</button>
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//             <button className="btnn">
//                 <Link to="/notes">&larr; Back</Link>
//             </button>
//         </div>
//     );
// }
{/* <button className="uppercase">
                            <Link to={`/blog/${slug}/edit`}>Edit</Link>
                        </button>
                        <button className="uppercase" onClick={handleDelete}>Delete</button> */}
