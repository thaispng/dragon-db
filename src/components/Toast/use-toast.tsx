"use client"

import { useContext } from "react"
import { ToastContext } from "./toast-provider"
import type { ToastType } from "./toast"

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  const toast = (title: string, message?: string, type?: ToastType, duration?: number) => {
    context.showToast({ title, message, type, duration })
  }

  return {
    toast,
    success: (title: string, message?: string, duration?: number) => toast(title, message, "success", duration),
    error: (title: string, message?: string, duration?: number) => toast(title, message, "error", duration),
    warning: (title: string, message?: string, duration?: number) => toast(title, message, "warning", duration),
    info: (title: string, message?: string, duration?: number) => toast(title, message, "info", duration),
  }
}
