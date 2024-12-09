import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setNavAndSideVisibility } from "../redux/navAndSide/navAndSideSlice";

// import { useState } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const apiCall = () => {
    axios.get("http://localhost:3000").then((data) => {
      console.log(data);
    });
  };

  useEffect(()=> {
    dispatch(setNavAndSideVisibility(false))
  })
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10 h-screen">
        <p className="text-3xl">Just a temporary landing page</p>
        <button onClick={apiCall} className="bg-gray-950 rounded-md py-3 px-5">
          <NavLink to="/login" onClick={()=> dispatch(setNavAndSideVisibility(true))}>Call API & Login</NavLink>
        </button>
      </div>
    </>
  );
}
