"use client"

import type React from "react"
import type { ReactNode } from "react"
import "./card.css" 

export interface CardProps {
  children: ReactNode
  title?: string
  description?: string
  variant?: "default" | "outlined" | "elevated"
  size?: "small" | "medium" | "large"
  className?: string
  onClick?: () => void
  fullWidth?: boolean
  hoverable?: boolean
  icon?: ReactNode
  footer?: ReactNode
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  description,
  variant = "default",
  size = "medium",
  className = "",
  onClick,
  fullWidth = false,
  hoverable = false,
  icon,
  footer,
}) => {
  const cardClasses = [
    "card",
    `card-${variant}`,
    `card-${size}`,
    fullWidth ? "card-full-width" : "",
    hoverable ? "card-hoverable" : "",
    onClick ? "card-clickable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={cardClasses} onClick={onClick} role={onClick ? "button" : undefined}>
      {(title || icon) && (
        <div className="card-header">
          {icon && <div className="card-icon">{icon}</div>}
          {title && <h3 className="card-title">{title}</h3>}
        </div>
      )}

      {description && <div className="card-description">{description}</div>}

      <div className="card-content">{children}</div>

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

export default Card
