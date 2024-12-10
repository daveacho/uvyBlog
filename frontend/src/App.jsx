import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateProfile from './components/UpdateProfile';
import UserProfile from './pages/profile';
import CreateBlogs from './components/CreateBlog';
import BlogDetail from './components/BlogDetails';
import UpdateBlog from './components/EditNote';
// import Logout from './pages/Logout';

// function Logout() {
//   localStorage.clear();
//   return <Navigate to={'/login'} />;
// }

function App() {
  const [searchNotes, setSearchNotes] = useState("");

  // Handle search value updates
  const handleSearch = (val) => setSearchNotes(val);

  return (
    <BrowserRouter>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Header handlesearch={handleSearch} searchValue={searchNotes} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="profileupdate/:slug" element={<UpdateProfile />} />
          {/* <Route path='logout' element={<Logout />} /> */}
          <Route path="signup" element={<SignUp />} />
          <Route path="createblog" element={<CreateBlogs />} />
          <Route path="search" element={<Search searchNotes={searchNotes} />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path='blog/:slug/edit' element={<UpdateBlog />} />

          {/* Protected Routes */}
          <Route
            path="profile/:slug"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;


// import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
// import { useState } from 'react';
// import PageNotFound from './pages/PageNotFound'
// import HomePage from './pages/HomePage'
// import About from './pages/About'
// import Login from './pages/Login'
// import SignUp from './pages/SignUp'
// import Search from './pages/Search'
// import Header from './components/Header'
// import Footer from './components/footer'
// import NoteDetails from './components/NoteDetails';
// import ProtectedRoute from './components/ProtectedRoute';
// import UserProfile from './pages/UserProfile';


// function Logout () {
//   localStorage.clear()
//   const navigate = useNavigate()
//   return navigate('/login')
// }

// function RegisterAndLogout () {
//   localStorage.clear()
//   return <SignUp />
// }

// export default function App () {
//   const [searchNotes, setSearchNotes] = useState("");

//     // Handle search value updates
//   const handleSearch = (val) => setSearchNotes(val);
//   return <BrowserRouter >
//             <div className='grid grid-rows-[auto_1fr_auto] h-screen'>
//             <Header handlesearch={handleSearch} searchValue={searchNotes} />
//             <Routes>
//               <Route path='/' element={<HomePage />} />
//               <Route path='about' element={<About />} />
//               <Route path='login' element={<Login />} />
//               <Route path='signup' element={<SignUp />} />
//               <Route path='userprofile' element={<UserProfile />} />
//               <Route path='search' element={<Search searchNotes={searchNotes} />} />
//               <Route path='notes/:slug' element={<NoteDetails />} />
//               <Route path='*' element={<PageNotFound />} />
//             </Routes>
//             <Footer />
//             </div>
//         </BrowserRouter>
// }


