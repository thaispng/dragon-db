"use client"

import * as React from "react"
import { Loader2 } from 'lucide-react'
import "./Button.css"

export type ButtonVariant = "default" | "primary" | "secondary" | "danger" | "outline" | "ghost" | "link" | "success"
export type ButtonSize = "small" | "medium" | "large" | "icon"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = "", 
    variant = "default", 
    size = "medium", 
    isLoading, 
    leftIcon, 
    rightIcon, 
    children, 
    ...props 
  }, ref) => {
    const buttonClasses = [
      "button",
      `button--${variant}`,
      `button--${size}`,
      className
    ].filter(Boolean).join(" ")

    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="button__spinner" />}
        {!isLoading && leftIcon && <span className="button__icon button__icon--left">{leftIcon}</span>}
        {children && <span className="button__text">{children}</span>}
        {!isLoading && rightIcon && <span className="button__icon button__icon--right">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = "Button"
