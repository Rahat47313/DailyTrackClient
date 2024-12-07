import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import axios from "axios";
import AppRoutes from "./AppRoutes"
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// import Login from "./login/Login";

// Define the interface for DarkThemeToggle props
interface DarkThemeToggleInterface {
  checked: boolean;
  onChange: () => void;
  className: string;
}

const apiCall = () => {
  axios.get("http://localhost:3000").then((data) => {
    console.log(data);
  });
};

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("flowbite-theme-mode") === "dark" ? true : false
  );

  useEffect(() => {
    // Toggle the 'dark' class on the root HTML element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Ensure props for DarkThemeToggle are typed correctly
  const darkThemeToggleProps: DarkThemeToggleInterface = {
    checked: darkMode,
    onChange: () => setDarkMode(!darkMode),
    className: "focus:ring-0",
  };

  return (
    <>
      <BrowserRouter>
        <Flowbite>
          <AppRoutes />
          <div className="fixed z-30 top-2 right-[80px]">
            {/* Dark theme toggle button */}
            <DarkThemeToggle {...darkThemeToggleProps} />
          </div>
          <button
            onClick={apiCall}
            className="fixed top-1.5 left-1/2 z-[100] text-white bg-gray-950 rounded-md py-3 px-5"
          >
            Make API call
          </button>
        </Flowbite>
      </BrowserRouter>
    </>
  );
}

export default App;
