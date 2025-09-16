"use client"

import { io, Socket } from 'socket.io-client'

class WebSocketService {
  private socket: Socket | null = null
  private static instance: WebSocketService

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  connect(token: string) {
    if (this.socket?.connected) return

    this.socket = io(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001', {
      auth: {
        token
      }
    })

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server')
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
    })

    this.socket.on('sensor-update', (data) => {
      // Handle real-time sensor updates
      window.dispatchEvent(new CustomEvent('sensor-update', { detail: data }))
    })

    this.socket.on('alert', (data) => {
      // Handle real-time alerts
      window.dispatchEvent(new CustomEvent('new-alert', { detail: data }))
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  emit(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data)
    }
  }
}

export default WebSocketService
