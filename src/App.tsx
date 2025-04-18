import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./features/pages/login"
import RegisterPage from "./features/pages/register"
import {DragonsListPage} from "./features/pages/dragonsListPage"
import {ForgotPassword} from "./components/ForgotPassword/ForgotPassword"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dragonsListPage" element={<DragonsListPage/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
