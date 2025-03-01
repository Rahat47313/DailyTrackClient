import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import SidebarLeft from "./components/SidebarLeft";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Upcoming from "./pages/Upcoming";
import Attendance from "./pages/Attendance";
import Calendar from "./pages/Calendar";
import StickyWall from "./pages/StickyWall";
import Categories from "./pages/Categories";
import { selectNavAndSideVisibility } from "./redux/navAndSide/navAndSideSelectors";
import SidebarLeftSmall from "./components/SidebarLeftSmall";
import CategoryPage from "./components/Categories/CategoryPage";
import Users from "./pages/Users";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";

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
        <Route
          path="/upcoming"
          element={
            <ProtectedRoute>
              <Upcoming />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stickyWall"
          element={
            <ProtectedRoute>
              <StickyWall />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Users />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:category"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
