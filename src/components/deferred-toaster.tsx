"use client"

import { useEffect, useState, type ComponentType } from "react"
import type { ToasterProps } from "sonner"

type ToasterComponent = ComponentType<ToasterProps>

let toaster: ToasterComponent | null = null
let loading: Promise<ToasterComponent> | null = null
const listeners = new Set<() => void>()

export function ensureToaster() {
  if (!loading) {
    loading = import("@/components/ui/sonner").then((mod) => {
      toaster = mod.Toaster
      listeners.forEach((listener) => listener())
      return mod.Toaster
    })
  }
  return loading
}

export function DeferredToaster() {
  const [Toaster, setToaster] = useState<ToasterComponent | null>(toaster)

  useEffect(() => {
    const update = () => {
      if (toaster) setToaster(() => toaster)
    }
    listeners.add(update)
    return () => {
      listeners.delete(update)
    }
  }, [])

  if (!Toaster) return null
  return <Toaster theme="dark" position="bottom-right" />
}
