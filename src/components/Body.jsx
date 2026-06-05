import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Body = () => {
  return (
    <div className="flex-1">
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body