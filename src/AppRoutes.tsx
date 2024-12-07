import { Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Upcoming from "./pages/Upcoming";
import Attendance from "./pages/Attendance";
import Calendar from "./pages/Calendar";
import StickyWall from "./pages/StickyWall";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

export default function AppRoutes() {
  const [showNav, setShowNav] = useState(true);
  return (
    <>
      {showNav && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Login funcNav={setShowNav} />}></Route>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/stickyWall" element={<StickyWall />} />
      </Routes>
    </>
  );
}
