import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../features/pages/login";
import RegisterPage from "../features/pages/register";
import { DragonsListPage } from "../features/pages/dragonsListPage";
import { ForgotPassword } from "../components/ForgotPassword/ForgotPassword";
import { CreateDragonPage } from "../features/pages/createDragonPage";
import { Navbar } from "../components/Navbar/Navbar";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { UpdateDragonPage } from "../features/pages/updateDragonPage";

export function AppRoutes() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route
          path="/dragonsListPage"
          element={
            <ProtectedRoute>
              <DragonsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createDragonPage"
          element={
            <ProtectedRoute>
              <CreateDragonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateDragonPage/:id"
          element={
            <ProtectedRoute>
              <UpdateDragonPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}