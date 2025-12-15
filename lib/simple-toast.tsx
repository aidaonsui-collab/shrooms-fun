"use client"

import * as React from "react"

type ToastType = "default" | "destructive"

interface Toast {
  id: string
  title: string
  description?: string
  variant?: ToastType
}

const ToastContext = React.createContext<{
  toast: (props: Omit<Toast, "id">) => void
} | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((props: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { ...props, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-lg shadow-lg animate-in slide-in-from-bottom-5 ${
              t.variant === "destructive" ? "bg-red-600 text-white" : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            <div className="font-semibold">{t.title}</div>
            {t.description && <div className="text-sm opacity-90 mt-1">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}
