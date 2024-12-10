import { Link } from "react-router-dom";
import PublishedNotes from "../components/publishedNotes";

export default function HomePage() {
    return (
        <main>
            <div className="flex flex-col gap-6 max-w-6xl mx-auto p-28 px-3">
                <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
                    Welcome to the <span className="text-slate-500">best</span> <br /> Blog website
                </h1>
                <div className="text-gray-400 text-sm sm:text-lg">
                    Uvy blog is designed for everyone to share their thoughts with the world.
                </div>
                <Link to={"/search"} className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
                    Start reading now...
                </Link>
            </div>
            <div className="w-full max-w-6xl mx-auto mb-20">
                <div className="w-full h-[350px] overflow-hidden rounded-lg">
                    <img src="new_img2.jpg" alt="computer" className="h-full w-full object-center" />
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-8">
                <div className="flex flex-col gap-2 mb-4">
                    <h2 className="text-2xl font-semibold text-slate-600">Recent Blogs</h2>
                    <Link to={"/search"} className="text-blue-800 text-sm font-bold hover:underline">
                        Show more blogs
                    </Link>
                </div>
             <section className="max-w-6xl mx-auto">
                 <PublishedNotes limit={4} />
             </section>
             <section className="max-w-6xl mx-auto bg-red-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 my-28">
                    <div className="flex flex-col gap-4 items-center justify-center w-full p-7 bg-slate-200">
                        <h2 className="text-2xl text-slate-800 font-semibold">Be part of the best Blog</h2>
                        <p className="text-lg">come join us and build the world together</p>
                        <button className="border-2 border-teal-500 p-3 bg-white hover:bg-slate-200 hover:text-slate-900">Try for Free</button>
                    </div>
                    <div className=""><img className="w-full" src="img1.png" alt="computer" /></div>
                </div>
             </section>
            </div>
        </main>
    );
}


// import { Link } from "react-router-dom";
// import PublishedNotes from "../components/publishedNotes";

// export default function HomePage () {
//     return <main>
//              <div className="flex flex-col gap-6 max-w-6xl mx-auto  p-28 px-3 ">
//                 <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">Welcome to the <span className="text-slate-500">best</span> <br/>Blog website</h1>
//                 <div className="text-gray-400 text-xs sm:text-sm">
//                     Uvy blog is design for everyone to share their thoughts with the world.
//                 </div>
//                 <Link to={"/search"} className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">Start reading now...</Link>
//              </div>
//              <div className="w-full max-w-6xl mx-auto">
//                 <div className="w-full h-[300px] overflow-hidden rounded-lg">
//                     <img src="img1.png" alt="computer" className="h-full w-full object-cover object-center" />
//                 </div>
//              </div> 
//              <div className="max-w-6xl mx-auto">
//                 <div>
//                     <h1>Recent Blogs</h1>
//                     <Link to={"/search"}>Show more blogs</Link>
//                 </div>
//                 <div>
//                     <PublishedNotes />
//                 </div>
//              </div>
             
//           </main>
// }

{/* <div className="w-full h-[300px] overflow-hidden rounded-lg bg-teal-600 flex flex-col
                gap-6 items-center justify-center">
                
                        <h2 className="text-white text-sm">Be part of the best Blog</h2>
                        <p className="text-white text-xl">come join us and build the world together</p>
                        <button className="bg-white p-3 text-teal-500 font-semibold">signup</button>
                        </div> */}
                        