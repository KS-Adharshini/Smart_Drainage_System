"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Clock, AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  timestamp: string
  read: boolean
}

interface NotificationsProps {
  className?: string
}

export function Notifications({ className }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Water flow blocked',
      type: 'warning',
      timestamp: '8:53:52 pm',
      read: false
    },
    {
      id: '2', 
      message: 'Water flow restored',
      type: 'info',
      timestamp: '8:53:58 pm',
      read: false
    },
    {
      id: '3',
      message: 'Gas levels normal',
      type: 'info',
      timestamp: '8:53:58 pm',
      read: false
    },
    {
      id: '4',
      message: 'Gas leak detected',
      type: 'error',
      timestamp: '8:55:07 pm',
      read: false
    },
    {
      id: '5',
      message: 'Water flow blocked',
      type: 'warning',
      timestamp: '8:56:12 pm',
      read: false
    }
  ])

  const addNotification = (message: string, type: 'info' | 'warning' | 'error' | 'success') => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle
      case 'error':
        return AlertTriangle
      case 'warning':
        return AlertTriangle
      default:
        return Info
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-white text-gray-800 border border-gray-200 border-l-4 border-l-green-500'
      case 'error':
        return 'bg-white text-gray-800 border border-gray-200 border-l-4 border-l-red-500'
      case 'warning':
        return 'bg-white text-gray-800 border border-gray-200 border-l-4 border-l-yellow-500'
      default:
        return 'bg-white text-gray-800 border border-gray-200 border-l-4 border-l-blue-500'
    }
  }

  // Expose addNotification function globally for other components to use
  useEffect(() => {
    (window as any).addNotification = addNotification
    return () => {
      delete (window as any).addNotification
    }
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <Badge variant="secondary">{notifications.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              return (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg ${getNotificationColor(notification.type)} relative`}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <div className="flex items-start space-x-2 pr-6">
                    <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <div className="flex items-center mt-1 text-xs opacity-75">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { type Notification }
