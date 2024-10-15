import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// import Login from "./login/Login";

function App() {

  return (
    <>
    <div className="font-inter">
      {/* <Login /> */}
      <Navbar />
      <Sidebar />
      <Dashboard />
    </div>
    </>
  )
}

export default App
