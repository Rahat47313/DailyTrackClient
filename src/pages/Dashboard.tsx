import axios from "axios";
import { NavLink } from "react-router-dom";

// import { useState } from "react";

export default function Dashboard() {
  const apiCall = () => {
    axios.get("http://localhost:3000").then((data) => {
      console.log(data);
    });
  };
  return (
    <>
      <div className="text-gray-900 dark:text-white p-4 md:ml-64 mt-[60px]">
      <button
            onClick={apiCall}
            className="fixed top-1.5 left-1/2 z-[100] text-white bg-gray-950 rounded-md py-3 px-5"
          >
            <NavLink to="/login">Call API & Login</NavLink>
          </button>
      </div>
    </>
  );
}