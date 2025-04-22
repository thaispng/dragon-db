import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./assets/styles/reset.css"
import App from "./App"
import reportWebVitals from "./lib/reportWebVitals"
import { ThemeProvider } from "./context/ThemeContext"
import { ToastProvider } from "./components/Toast/toast-provider"
import { AuthProvider } from "./context/AuthContext"
import "./assets/styles/theme.css"

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

reportWebVitals()
