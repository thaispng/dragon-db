import { AuthForm } from "../AuthForm/AuthForm"
import { Input } from "../Input/input"
import { Link } from "react-router-dom" 
export function RegisterForm() {
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
          required
        />
      </div>
    </AuthForm>
  )
}
