"use client"

import type React from "react"
import { createContext, useCallback, useState } from "react"
import { Toast, type ToastType } from "./toast"
import "./toast.css"

type ToastOptions = {
  title: string
  message?: string
  type?: ToastType
  duration?: number
}

type ToastItem = ToastOptions & {
  id: string
}

type ToastContextType = {
  showToast: (options: ToastOptions) => void
  hideToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  hideToast: () => {},
})

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...options, id }])
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            title={toast.title}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={hideToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
