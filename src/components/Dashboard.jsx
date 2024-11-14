import { useSelector } from "react-redux";
import Upcoming from "./Upcoming";
import Attendance from "./Attendance/Attendance";
import Calendar from "./Calendar/Calendar";
import StickyWall from "./StickyWall";
import { selectPage } from "../redux/pages/pagesSelectors";

// import { useState } from "react";

export default function Dashboard() {
  const page = useSelector(selectPage)
  return (
    <>
      <div className="text-gray-900 dark:text-white p-4 md:ml-64 mt-[60px]">
        {page === "upcoming" && <Upcoming />}
        {page === "attendance" && <Attendance />}
        {page === "calendar" && <Calendar />}
        {page === "sticky wall" && <StickyWall />}
      </div>
    </>
  );
}
