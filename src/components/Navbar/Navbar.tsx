import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "../ThemeToggle";
import "./navbar.css";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-content">
          {isAuthenticated ? (
            <>
              <div className="navbar-actions">
                <ThemeToggle />
                <button className="logout-button" onClick={logout}>
                  Sair
                </button>
              </div>
            </>
          ) : (
            <div className="navbar-actions">
              <ThemeToggle />
              <Link to="/login" className="login-button">
                Login
              </Link>
              <Link to="/register" className="register-button">
                Cadastre-se
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}