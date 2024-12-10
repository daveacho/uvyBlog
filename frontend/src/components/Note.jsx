import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/"

export default function Note({ note }) {
    const date = new Date(note.created)
    const options = {month: "short", day: "numeric", year: "numeric"};
    const formattedD = new Intl.DateTimeFormat("en-US", options).format(date);
    // const formattedDate = new Date(note.created).toLocaleDateString()
    // Get the current date instead of the fetched date
    // const currentDate = new Date().toLocaleDateString();
    return (
        <div className="bg-white shadow-md
        hover:shadow-lg transition-shadow rounded-lg 
        overflow-hidden w-full border border-teal-500">
            <Link to={`/blog/${note.slug}`}> {/* Use note.slug directly */}
                <img src={note.featured_image ? `${API_URL}${note.featured_image}` : "img1.png"} alt="computer" className="
                h-[320px] sm:h-[220px] w-full object-cover
                hover:scale-105 transition-all duration-300"/>
                <div className="p-3">
                    <h1 className="truncate text-lg font-semibold text-slate-700 uppercase mb-5">{note.title}</h1> 
                    {/* <p className="mb-2">{note.body}</p> */}
                    
                    <div className="flex justify-between text-gray-500 mb-5">
                        <div className="md:flex md:flex-col lg:block">
                        <span className="mr-2 md:hidden xl:inline">Written By:</span>
                        <span className="hidden mr-2 md:inline xl:hidden">By:</span>
                        <span className="uppercase">{note.author}</span>
                        </div>
                        
                        <span className="mb-2 text-sx text-gray-600">{formattedD}</span>
                    </div>
                    <div className="mb-5">
                      <button className="bg-teal-500 p-1 text-white rounded-md italic text-xs">{note.category}</button>
                    </div>
                </div>
            </Link>
        </div>
    );
}
// sm:w-[300px]