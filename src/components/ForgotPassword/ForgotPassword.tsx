"use client"

import type React from "react"

import { AuthForm } from "../AuthForm/AuthForm"

export function ForgotPassword() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("Enviar link de recuperação de senha")
  }

  return (
    <AuthForm
      title="Recuperar Senha"
      subtitle="Informe seu email para receber instruções"
      buttonText="Enviar Link de Recuperação"
      onSubmit={handleSubmit}
      showForgotPassword={false}
      showPasswordField={false} 
      footerText={
        <>
          Lembrou sua senha?{" "}
          <a href="/login" className="signup-link">
            Voltar para login
          </a>
        </>
      }
    />
  )
}
