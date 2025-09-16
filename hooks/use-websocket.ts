"use client"

import { useEffect, useState } from 'react'
import WebSocketService from '@/lib/websocket'

export function useWebSocket() {
  const [connected, setConnected] = useState(false)
  const [sensorData, setSensorData] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const wsService = WebSocketService.getInstance()
    wsService.connect(token)

    const handleSensorUpdate = (event: CustomEvent) => {
      setSensorData(prev => {
        const updated = [...prev]
        const index = updated.findIndex(sensor => sensor.zoneId === event.detail.zoneId)
        if (index >= 0) {
          updated[index] = event.detail
        } else {
          updated.push(event.detail)
        }
        return updated
      })
    }

    const handleNewAlert = (event: CustomEvent) => {
      setAlerts(prev => [event.detail, ...prev])
    }

    window.addEventListener('sensor-update', handleSensorUpdate as EventListener)
    window.addEventListener('new-alert', handleNewAlert as EventListener)

    setConnected(true)

    return () => {
      window.removeEventListener('sensor-update', handleSensorUpdate as EventListener)
      window.removeEventListener('new-alert', handleNewAlert as EventListener)
      wsService.disconnect()
      setConnected(false)
    }
  }, [])

  return { connected, sensorData, alerts }
}
