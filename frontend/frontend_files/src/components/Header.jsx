import { Link } from "react-router-dom";
import PageNav from "./PageNav";
import { FaSearch } from "react-icons/fa";

export default function Header ({handlesearch, searchValue}) {
    return <header className="bg-slate-200 shadow-md">
              <div className="max-w-6xl mx-auto p-3 flex justify-between items-center">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <Link to={"/"}>
                    <span className="text-slate-500">UVY</span>
                    <span className="text-slate-700">BLOG</span>
                    </Link>
                </h1>
                <form className="bg-slate-100 p-3 rounded-xl flex items-center" >
                    <input type="text" placeholder="Search..." value={searchValue} 
                    onChange={(e) =>handlesearch(e.target.value)}
                    className="focus:outline-none bg-transparent
                    w-28 sm:w-64" />
                    <FaSearch className="text-slate-600"/>
                </form>
                <PageNav />
              </div>
          </header>
}