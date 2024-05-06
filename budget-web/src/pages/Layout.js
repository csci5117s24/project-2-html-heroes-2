import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
        <div className="flex flex-col h-screen">
          <div className="mb-auto">
            <Navbar />
            <Outlet />
          </div>
          <Footer />
        </div>
    </>
  )
};

export default Layout;