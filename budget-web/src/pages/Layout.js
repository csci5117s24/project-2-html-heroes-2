import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
        <div>
            <Navbar />
            <Outlet />
        </div>
        <Footer />
    </>
  )
};

export default Layout;