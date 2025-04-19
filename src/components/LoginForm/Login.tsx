import { AuthForm } from "../AuthForm/AuthForm"
import { Link } from "react-router-dom" 

export function LoginForm() {
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
    />
  )
}
