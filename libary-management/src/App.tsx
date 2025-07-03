import { ModeToggle } from "./components/mode-toggle"
import { Button } from "./components/ui/button"
import { Outlet } from "react-router"

function App() {
  return (
    <>
      <Button>Adnan</Button>
      <ModeToggle />
      <Outlet />
    </>
  )
}

export default App
