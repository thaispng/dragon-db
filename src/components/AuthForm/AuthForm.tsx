"use client"

import type React from "react"
import { Button } from "../Button/button"
import { Input } from "../Input/input"
import "./Auth.css"
import { Link } from "react-router-dom"

interface AuthFormProps {
  title: string
  subtitle: string
  buttonText: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  children?: React.ReactNode
  footerText?: React.ReactNode
  className?: string
  showForgotPassword?: boolean
  showPasswordField?: boolean 
}

export function AuthForm({
  title,
  subtitle,
  buttonText,
  onSubmit,
  children,
  footerText,
  className,
  showForgotPassword = true,
  showPasswordField = true, 
  ...props
}: AuthFormProps) {
  return (
    <div className={`login-form-container ${className || ""}`} {...props}>
      <div className="login-card">
        <div className="login-card-content">
          <form className="login-form" onSubmit={onSubmit}>
            <div className="login-form-inner">
              <div className="login-header">
                <h1 className="login-title">{title}</h1>
                <p className="login-subtitle">{subtitle}</p>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Input id="email" type="email" className="form-input" placeholder="seuemail@exemplo.com" required />
              </div>
              {showPasswordField && (
                <div className="form-group">
                  <div className="password-header">
                    <label htmlFor="password" className="form-label">
                      Senha
                    </label>
                    {showForgotPassword && (
                      <Link to="/ForgotPassword" className="forgot-password">
                        Esqueceu sua senha?
                      </Link>
                    )}
                  </div>
                  <Input id="password" type="password" className="form-input" required />
                </div>
              )}
              {children}
              <Button type="submit" variant="primary" size="medium" isLoading={false}>
                {buttonText}
              </Button>
              {footerText && <div className="signup-prompt">{footerText}</div>}
            </div>
          </form>
          <div className="login-image-container">
            <video className="login-video" src="/motion-video.mp4" autoPlay loop muted playsInline />
          </div>
        </div>
      </div>
      <div className="terms-text">
        Ao clicar em continuar, você concorda com nossos <a href="#">Termos de Serviço</a> e{" "}
        <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  )
}
