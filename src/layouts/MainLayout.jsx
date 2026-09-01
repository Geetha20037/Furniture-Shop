
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

export default function MainLayout() {
  return (
    <div className="page-shell min-h-screen">
      {/* Fixed Navbar */}
      <div className="fixed left-0 right-0 top-0 z-50">
        <Navbar />
      </div>

      {/* Main content */}
      <main className="w-full pt-[76px]">
        <Outlet />
      </main>

      <Footer />
      <Toast />
    </div>
  );
}