import type React from "react"
import { Button } from "../../../components/Button/button"
import { Input } from "../../../components/Input/input"
import "./Login.css"

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  return (
    <div className={`login-form-container ${className || ""}`} {...props}>
      <div className="login-card">
        <div className="login-card-content">
          <form className="login-form">
            <div className="login-form-inner">
              <div className="login-header">
                <h1 className="login-title">Dragões DB</h1>
                <p className="login-subtitle">
                  Acesse sua conta para continuar
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Input id="email" type="email" className="form-input" placeholder="seuemail@exemplo.com" required />
              </div>
              <div className="form-group">
                <div className="password-header">
                  <label htmlFor="password" className="form-label">
                    Senha
                  </label>
                  <a href="#" className="forgot-password">
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input id="password" type="password" className="form-input" required />
              </div>
              <Button type="submit" variant="primary" size="medium" isLoading={false}>
                Entrar
              </Button>
              <div className="signup-prompt">
                Não tem uma conta?{" "}
                <a href="#" className="signup-link">
                  Cadastre-se
                </a>
              </div>
            </div>
          </form>

          <div className="login-image-container">
            <video className="login-video" src="/motion-video.mp4" autoPlay loop muted playsInline />
          </div>
        </div>
      </div>
      <div className="terms-text">
        Ao clicar em continuar, você concorda com nossos <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  )
}
