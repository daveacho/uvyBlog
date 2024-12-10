import { useEffect, useState } from "react";
import Note from "./Note";


const API_URL = "http://127.0.0.1:8000/blog_list/"; 

export default function PublishedNotes({ limit = 4 }) {
    const [notes, setNotes] = useState([]);

    // Fetch notes on component mount
    useEffect(() => {
        const getNotes = async () => {
            try {
                const response = await fetch(`${API_URL}`);
                const data = await response.json();
                console.log("API response:", data);
                setNotes(data.results);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };
        getNotes();
    }, []);

    // Limit the notes if a limit is set
     const displayedNotes = limit ? notes.slice(0, limit) : notes;

    return (
        //    <div className="p-7 flex flex-wrap gap-6 sm:items-center sm:justify-center lg:mb-16">
        <div className="p-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:p-0"> 
            {displayedNotes.length > 0 ? (
                displayedNotes.map((note, i) => <Note note={note} key={i} />) // Iterate over the `notes` state
            ) : (
                <p>No notes available.</p>
            )}
        </div>
    );
}


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const API_URL = "http://127.0.0.1:8000";

// export default function PublishedNotes({ limit = 4 }) {
//     const [notes, setNotes] = useState([]);

//     // Fetch notes
//     useEffect(() => {
//         const fetchNotes = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/notes/`);
//                 if (!response.ok) throw new Error("Failed to fetch notes");
//                 const data = await response.json();
//                 setNotes(data);
//             } catch (error) {
//                 console.error("Error fetching notes:", error);
//             }
//         };

//         fetchNotes();
//     }, []);

//     // Limit the notes if a limit is set
//     const displayedNotes = limit ? notes.slice(0, limit) : notes;

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {displayedNotes.map((note) => (
//                 <Link to={`/notes/${note.slug}`} key={note.id} className="block bg-white shadow-md p-4 rounded-md hover:shadow-lg">
//                     <h2 className="font-bold text-lg mb-2">{note.title}</h2>
//                     <p className="text-sm text-gray-500">{note.category}</p>
//                     <p className="text-xs text-gray-400 mt-1">{new Date(note.created).toLocaleDateString()}</p>
//                 </Link>
//             ))}
//         </div>
//     );
// }

// export default function NoteContainer() {
//     const [notes, setNotes] = useState([]); // Initialize as an empty array
//     const [loading, setLoading] = useState(true); // Track loading state
//     const [error, setError] = useState(null); // Track error state

//     useEffect(() => {
//         async function fetchNotes() {
//             try {
//                 const fetchedNotes = await getNotes();
//                 setNotes(fetchedNotes || []); // Set notes or default to an empty array
//             } catch (error) {
//                 console.error("Failed to fetch notes:", error);
//                 setError("Failed to fetch notes"); // Set error state
//             } finally {
//                 setLoading(false); // Stop loading when done or errored
//             }
//         }

//         fetchNotes();
//     }, []);

//     if (loading) return <p>Loading notes...</p>; // Show loading message
//     if (error) return <p>{error}</p>; // Show error message if there's an issue

//     return (
//         <div>
//             {notes.length > 0 ? (
//                 notes.map((note) => (
//                     <Note key={note.slug} note={note} />
//                 ))
//             ) : (
//                 <p>No notes available.</p> // Display message if notes are empty
//             )}
//         </div>
//     );
// }


  