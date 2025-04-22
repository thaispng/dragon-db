import { useState } from "react";
import { AuthForm } from "../AuthForm/AuthForm";
import { Input } from "../Input/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      navigate("/dragonsListPage");
    }
  };

  return (
    <AuthForm
      title="Crie sua conta"
      subtitle="Preencha seus dados para se cadastrar"
      buttonText="Cadastrar"
      showForgotPassword={false}
      footerText={
        <>
          Já tem uma conta?{" "}
          <Link to="/login" className="signup-link">
            Entrar
          </Link>
        </>
      }
      onSubmit={handleSubmit}
      isLoading={loading}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      emailValue={email}
      passwordValue={password}
    >
      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          Confirmar Senha
        </label>
        <Input
          id="confirmPassword"
          type="password"
          className="form-input"
          placeholder="Digite sua senha novamente"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          variant={error ? "error" : "default"}
        />
        {error && <div className="input__helper-text input__helper-text--error">{error}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nome
        </label>
        <Input
          id="name"
          type="text"
          className="form-input"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
    </AuthForm>
  );
}
