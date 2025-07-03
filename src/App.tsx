// import { ModeToggle } from "./components/mode-toggle"
import Navbar from "./components/navbar/Navbar"
import { Outlet } from "react-router"

function App() {
  return (
    <>
      <Navbar />
      {/* <ModeToggle /> */}
      <Outlet />
    </>
  )
}

export default App
