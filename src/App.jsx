import AppRouter from "./routes/AppRoutes"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <AppRouter/>
      <ToastContainer position="bottom-right" style={{zIndex: 9999}}/>
    </>
  )
}

export default App
