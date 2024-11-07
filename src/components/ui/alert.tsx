// components/ui/alert.tsx
import * as React from "react"

interface AlertProps {
  className?: string
  children: React.ReactNode
}

export function Alert({ className, children }: AlertProps) {
  return (
    <div role="alert" className={`relative w-full rounded-lg border p-4 ${className}`}>
      {children}
    </div>
  )
}

export function AlertDescription({ className, children }: AlertProps) {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  )
}