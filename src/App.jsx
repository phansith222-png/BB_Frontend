import AppRouter from "./routes/AppRoutes"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
        style={{ zIndex: 9999, marginBottom: '20px' }} />
    </>
  )
}

export default App
