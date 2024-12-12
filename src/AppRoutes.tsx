import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Upcoming from "./pages/Upcoming";
import Attendance from "./pages/Attendance";
import Calendar from "./pages/Calendar";
import StickyWall from "./pages/StickyWall";
import Navbar from "./components/Navbar";
import SidebarLeft from "./components/SidebarLeft";
import { selectNavAndSideVisibility } from "./redux/navAndSide/navAndSideSelectors";
import Dashboard from "./pages/Dashboard";
import SidebarLeftSmall from "./components/SidebarLeftSmall";

export default function AppRoutes() {
  const showNavAndSide = useSelector(selectNavAndSideVisibility);
  return (
    <>
      {showNavAndSide && (
        <>
          <Navbar />
          <SidebarLeft />
          <SidebarLeftSmall />
        </>
      )}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/stickyWall" element={<StickyWall />} />
      </Routes>
    </>
  );
}
