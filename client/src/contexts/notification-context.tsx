"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Notification } from "@shared/schema"

export interface Notification {
  id: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markNotificationRead: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      const response = await fetch("/api/notifications")
      const data = await response.json()
      if (response.ok) {
        setNotifications(data.notifications || [])
      }
    } catch (error) {
      console.error("Failed to load notifications:", error)
    }
  }

  const markNotificationRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "PATCH" })
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    markNotificationRead,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

