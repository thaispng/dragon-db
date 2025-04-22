import { useState } from 'react';
import { AuthForm } from "../AuthForm/AuthForm";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dragonsListPage";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <AuthForm
      title="Dragões DB"
      subtitle="Acesse sua conta para continuar"
      buttonText="Entrar"
      footerText={
        <>
          Não tem uma conta?{" "}
          <Link to="/register" className="signup-link">
            Cadastre-se
          </Link>
        </>
      }
      onSubmit={handleSubmit}
      isLoading={loading}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      emailValue={email}
      passwordValue={password}
    />
  );
}
