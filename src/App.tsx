
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import { Outlet } from "react-router"
import { Toaster } from "./components/ui/sonner"


function App() {
  return (
    <>
      <div className="space-y-20">
        <Navbar />

        <Outlet />

        <Footer />
      </div>
      <Toaster position="top-center" richColors />
    </>
  )
}

export default App
