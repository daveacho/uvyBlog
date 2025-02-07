import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer () {
    return <footer className="border-t-8 border-teal-500">
            <div className="w-full max-w-6xl mx-auto">
             <div className="sm:flex sm:gap-2 sm:justify-between p-7">
                    <div className="mt-7">
                        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <Link to={"/"}>
                        <span className="text-slate-500">UVY</span>
                        <span className="text-slate-900">BLOG</span>
                        </Link>
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 my-8 sm:gap-20">

                    <div>
                         <div className="flex flex-col gap-2 sm:gap-6">
                            <h1 className="uppercase font-semibold text-slate-600">Contact</h1>
                            <p className="text-gray-500 text-xs sm:text-sm">60 east-west road, London</p>
                            <p className="text-gray-500 text-xs sm:text-sm"><a href="tel:01202-897-8899">01202-897-8899</a> </p>
                            <p className="text-gray-500 text-xs sm:text-sm"><a href="mailto:info@uvyblog.com">info@uvyblog.com</a></p>
                         </div>  
                        </div>
                        
                        <div>
                         <div className="flex flex-col gap-2 sm:gap-6">
                            <h1 className="uppercase font-semibold text-slate-600">Account</h1>
                            <p className="text-gray-500 text-xs sm:text-sm"><Link to={"signup"}>Create Account</Link></p>
                            <p className="text-gray-500 text-xs sm:text-sm"><Link to={"/login"}>Login</Link></p>
                         </div>  
                        </div>
                        <div>
                        <div className="flex flex-col gap-2 sm:gap-6">
                            <h1 className="uppercase font-semibold text-slate-600">Follow Us</h1>
                            <p className="text-gray-500 text-xs sm:text-sm"><a href="#">Discord</a></p>
                            <p className="text-gray-500 text-xs sm:text-sm"><a href="#">Slack</a></p>
                            <p className="text-gray-500 text-xs sm:text-sm"><a href="#">LinkedIn</a></p>
                            </div>
                        </div>
                        <div>
                        <div className="flex flex-col gap-2 sm:gap-6">
                            <h1 className="uppercase font-semibold text-slate-600">Legal</h1>
                            <p className="text-gray-500 text-xs sm:text-sm"><a href="#">Private Policy</a></p>
                            <p className="text-gray-500 text-xs sm:text-sm"><a href="#">Term & Condition</a></p>
                            <p className="text-gray-500 text-xs sm:text-sm"><a href="#">Help Center</a></p>                            
                          </div>
                        </div>
                    </div>
             </div>
             <div className="flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between border-slate-200 border-t-2 p-3">
               <p  className="text-gray-400 text-xs sm:text-sm"> &copy; Copyright {new Date().getFullYear()} by UvyBlog Inc.</p>
               <div className="flex gap-6 mt-4 sm:mt-0 p-3">
                 <FaFacebook />
                 <FaInstagram />
                 <FaTwitter />
                 <FaGithub />
                 <FaLinkedin />
               </div>
             </div>  
             </div>  
           </footer>
}