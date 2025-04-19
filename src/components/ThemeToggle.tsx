"use client"

import type React from "react"
import { useTheme } from "../context/ThemeContext"

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  )
}
