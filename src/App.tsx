import { Toaster } from "sonner"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import { Outlet } from "react-router"


function App() {
  return (
    <>
      <div className="space-y-20">
        <Navbar />

        <Outlet />

        <Footer />
      </div>
      <Toaster richColors position="top-right" closeButton />
      
    </>
  )
}

export default App
