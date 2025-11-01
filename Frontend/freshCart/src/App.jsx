import Home from "./components/Home"
import Details from "./components/Details"
import { Route,Routes, useLocation } from "react-router-dom"
import SignUp from "./components/SignUp"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SignIn from "./components/SignIn"
import Dashboard from "./components/Dashboard"
import SearchResults from "./components/SearchResults"
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (

    <>
    {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/details/:id' element={<Details/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
