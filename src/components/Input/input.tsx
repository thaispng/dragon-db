"use client"

import * as React from "react"
import "./Input.css"

export type InputVariant = "default" | "error" | "success"
export type InputSize = "small" | "medium" | "large"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  inputSize?: InputSize
  label?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      variant = "default",
      inputSize = "medium",
      label,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`

    const inputContainerClasses = [
      "input-container",
      `input--${variant}`,
      `input--${inputSize}`,
      fullWidth ? "input--full-width" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <div className={inputContainerClasses}>
        {label && (
          <label htmlFor={inputId} className="input__label">
            {label}
          </label>
        )}
        <div className="input__wrapper">
          {leftIcon && <div className="input__icon input__icon--left">{leftIcon}</div>}
          <input
            id={inputId}
            className={`input__field ${leftIcon ? "input__field--with-left-icon" : ""} ${
              rightIcon ? "input__field--with-right-icon" : ""
            }`}
            ref={ref}
            {...props}
          />
          {rightIcon && <div className="input__icon input__icon--right">{rightIcon}</div>}
        </div>
        {helperText && <div className={`input__helper-text input__helper-text--${variant}`}>{helperText}</div>}
      </div>
    )
  },
)

Input.displayName = "Input"
