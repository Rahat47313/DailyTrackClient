import { useEffect, useState } from "react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// import Login from "./login/Login";

// Define the interface for DarkThemeToggle props
interface DarkThemeToggleInterface {
  checked: boolean;
  onChange: () => void;
  className: string;
}

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
      <Flowbite>
        <Navbar />
        <Sidebar />
        <Dashboard />
        <div className="fixed z-30 top-2 right-[80px]">
          {/* Dark theme toggle button */}
          <DarkThemeToggle {...darkThemeToggleProps} />
        </div>
      </Flowbite>
    </>
  );
}

export default App;
