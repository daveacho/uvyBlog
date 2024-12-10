// import { useEffect, useState } from "react";
// import NoteContainer from "../components/NoteContainer";
// import Filter from "../components/filter";

// const API_URL = "http://127.0.0.1:8000";

// export default function Search({ searchNotes }) {
//   const [filterNotes, setFilterNotes] = useState("");
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(false); // To handle loading state
//   const [error, setError] = useState(null); // To handle error state

//   // Handle filter value updates
//   function handleFilter(val) {
//     setFilterNotes(val);
//   }

//   // Function to fetch notes based on search query
//   async function fetchNotes() {
//     setLoading(true); // Start loading
//     setError(null); // Reset error
//     try {
//       const endpoint = searchNotes
//         ? `${API_URL}/searchblog/?search=${searchNotes}`
//         : `${API_URL}/blog_list/`;
//       const response = await fetch(endpoint);

//       if (!response.ok) throw new Error("Failed to fetch notes");

//       const data = await response.json();
//       console.log("API Response:", data);

//       // Ensure `data.results` exists and is an array
//       setNotes(Array.isArray(data) ? data : []); 

//       // setNotes(data); // Update notes state
//     } catch (error) {
//       setError(error.message); // Set error message
//       setNotes([]); // Clear notes
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   }

//   // Fetch notes when `searchNotes` changes
//   useEffect(() => {
//     fetchNotes();
//   }, [searchNotes]);

//   // Filter notes by category
//   const filteredNotes =
//     filterNotes === "BUSINESS"
//       ? notes.filter((note) => note.category === "BUSINESS")
//       : filterNotes === "PERSONAL"
//       ? notes.filter((note) => note.category === "PERSONAL")
//       : filterNotes === "IMPORTANT"
//       ? notes.filter((note) => note.category === "IMPORTANT")
//       : notes;

//   return (
//     <div>
//       {loading && (
//         <div className="flex items-center justify-center h-screen">
//           <h3 className="text-white">Loading...</h3>
//         </div>
//       )}
//       {!loading && error && (
//         <div className="flex items-center justify-center h-screen">
//           <h3 className="text-white">Error: {error}</h3>
//         </div>
//       )}
//       {!loading && !error && notes.length < 1 && (
//         <div className="flex items-center justify-center h-screen">
//           <h3 className="text-slate-600">
//             No Note found containing the word "{searchNotes}"
//           </h3>
//         </div>
//       )}
//       {!loading && !error && notes.length > 0 && (
//         <>
//           <Filter handlefilter={handleFilter} />
//           <NoteContainer filteredNotes={filteredNotes} />
//         </>
//       )}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import NoteContainer from "../components/NoteContainer";
// import Filter from "../components/Filter";

// const API_URL = "http://127.0.0.1:8000";

// export default function Search({ searchNotes }) {
//   const [filterNotes, setFilterNotes] = useState("");
//   const [notes, setNotes] = useState([]);

//   // Fetch notes based on search query
//   useEffect(() => {
//     const fetchNotes = async () => {
//       const endpoint = searchNotes
//         ? `${API_URL}/notes-search/?search=${searchNotes}`
//         : `${API_URL}/notes/`;
//       try {
//         const response = await fetch(endpoint);
//         if (!response.ok) throw new Error("Failed to fetch notes");
//         const data = await response.json();
//         setNotes(data);
//       } catch (error) {
//         console.error("Error fetching notes:", error);
//       }
//     };

//     fetchNotes();
//   }, [searchNotes]);

//   // Filter notes by category
//   const filteredNotes =
//     filterNotes === "BUSINESS"
//       ? notes.filter((note) => note.category === "BUSINESS")
//       : filterNotes === "PERSONAL"
//       ? notes.filter((note) => note.category === "PERSONAL")
//       : filterNotes === "IMPORTANT"
//       ? notes.filter((note) => note.category === "IMPORTANT")
//       : notes;

//   return (
//     <div>
//       {notes.length < 1 ? (
//         <div className="flex items-center justify-center h-screen">
//           <h3 className="text-white">
//             No Note found containing the word "{searchNotes}"
//           </h3>
//         </div>
//       ) : (
//         <Filter handlefilter={setFilterNotes} />
//       )}
//       <NoteContainer filteredNotes={filteredNotes} />
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import NoteContainer from "../components/NoteContainer";
// import Filter from "../components/filter";

// const API_URL = "http://127.0.0.1:8000";

// export default function Search ({searchNotes}) {

//  const [filterNotes, setFilterNotes] = useState("")
//  const [notes, setNotes] = useState([])

//  // Handle filter value updates
//  function handleFilter(val) {
//   setFilterNotes(val)
//  }
 
//  // Function to fetch notes based on search query
//  async function searchNote() {
//   try {
//     const response = await fetch(`${API_URL}/searchblog/?search=${searchNotes}`);
//     if (!response.ok) throw new Error("Failed to blog notes");
//     const data = await response.json();
//     console.log("API Response:", data);
//     setNotes(data);
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//   }
// }

// // Fetch notes on searchNotes change
// useEffect(() => {
//   if (searchNotes) searchNote();
// }, [searchNotes]);

// // Fetch notes on component mount
// useEffect(() => {
//   const get_blogs = async () => {
//   try {
//       const response = await fetch(`${API_URL}/blog_list/`);
//       const data = await response.json();
//       console.log("API Response:", data.results);
//       setNotes(data.results);
//   } catch (error) {
//       console.error("Error fetching blogs:", error);
//   }
//   };
//   get_blogs();
// }, []);

// const filteredNotes = filterNotes === "BUSINESS" ? notes.filter((note) => (note.category === "BUSINESS"))
// : filterNotes === "PERSONAL" ? notes.filter((note)=>(note.category === "PERSONAL"))
// : filterNotes === "IMPORTANT" ? notes.filter((note) =>(note.category === "IMPORTANT")) : notes

//   return <div>
//             {notes.length < 1 ? <div className="flex items-center justify-center h-screen"> <h3 className="text-slate-700">No Note found containing the word "{searchNotes}"</h3> </div> :
//             <Filter handlefilter = {handleFilter} /> }
//             <NoteContainer filteredNotes = {filteredNotes} />
//          </div>
// }


import { useEffect, useState } from "react";
import NoteContainer from "../components/NoteContainer";
import Filter from "../components/filter";

const API_URL = "http://127.0.0.1:8000";

export default function Search({ searchNotes }) {
    const [filterNotes, setFilterNotes] = useState("");
    const [notes, setNotes] = useState([]);
    const [nextPage, setNextPage] = useState(null); // URL for the next page
    const [prevPage, setPrevPage] = useState(null); // URL for the previous page
    const [loading, setLoading] = useState(false);

    // Handle filter value updates
    function handleFilter(val) {
        setFilterNotes(val);
    }

    // Function to fetch notes
    async function fetchNotes(url) {
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch blogs");
            const data = await response.json();
            console.log("API Response:", data);
            setNotes(data.results);
            setNextPage(data.next); // Set next page URL
            setPrevPage(data.previous); // Set previous page URL
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    }

    // Fetch notes on searchNotes change
    useEffect(() => {
        if (searchNotes) {
            fetchNotes(`${API_URL}/searchblog/?search=${searchNotes}`);
        } else {
            fetchNotes(`${API_URL}/blog_list/`);
        }
    }, [searchNotes]);

    // Filter notes by category
    const filteredNotes =
        filterNotes === "BUSINESS"
            ? notes.filter((note) => note.category === "BUSINESS")
            : filterNotes === "PERSONAL"
            ? notes.filter((note) => note.category === "PERSONAL")
            : filterNotes === "IMPORTANT"
            ? notes.filter((note) => note.category === "IMPORTANT")
            : notes;

    return (
        <div>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <h3 className="text-slate-700">Loading...</h3>
                </div>
            ) : notes.length < 1 ? (
                <div className="flex items-center justify-center h-screen">
                    <h3 className="text-slate-700">
                        No Note found containing the word "{searchNotes}"
                    </h3>
                </div>
            ) : (
                <>
                    <Filter handlefilter={handleFilter} />
                    <NoteContainer filteredNotes={filteredNotes} />
                </>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between mb-14 p-7">
                <button
                    disabled={!prevPage}
                    onClick={() => fetchNotes(prevPage)}
                    className={`px-4 py-2 bg-gray-300 rounded ${
                        !prevPage && "opacity-50 cursor-not-allowed"
                    }`}
                >
                    Previous
                </button>

                <button
                    disabled={!nextPage}
                    onClick={() => fetchNotes(nextPage)}
                    className={`px-4 py-2 bg-gray-300 rounded ${
                        !nextPage && "opacity-50 cursor-not-allowed"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
