import { useEffect, useState } from "react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SidebarRight from "./components/SidebarRight";
// import Login from "./login/Login";

function App() {
  const [darkMode, setDarkMode] = useState(() => (localStorage.getItem("flowbite-theme-mode"))==="dark"? true: false);

  useEffect(() => {
    // Toggle the 'dark' class on the root HTML element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <>
      <Flowbite>
        <Navbar />
        <Sidebar />
        <Dashboard />
        <SidebarRight />
        <div className="fixed z-30 top-2 right-[80px]">
          {/* Dark theme toggle button */}
          <DarkThemeToggle
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="focus:ring-0"
          />
        </div>
      </Flowbite>
    </>
  );
}

export default App;
