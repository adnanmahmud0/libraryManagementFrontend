// import { ModeToggle } from "./components/mode-toggle"

import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import { Outlet } from "react-router"

function App() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  )
}

export default App
