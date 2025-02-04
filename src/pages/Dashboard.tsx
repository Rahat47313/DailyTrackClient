import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setNavAndSideVisibility } from "../redux/navAndSide/navAndSideSlice";

// import { useState } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(setNavAndSideVisibility(false))
  })
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10 h-screen">
        <p className="text-3xl">Just a temporary landing page</p>
        <button className="bg-gray-950 rounded-md py-3 px-5">
          <NavLink to="/login" onClick={()=> dispatch(setNavAndSideVisibility(true))}>Go to Login</NavLink>
        </button>
      </div>
    </>
  );
}
