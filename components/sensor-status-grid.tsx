"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle, Droplets, Settings } from 'lucide-react'

interface SensorData {
  zoneId: string
  waterLevel: number
  status: 'active' | 'inactive'
  lastUpdate: string
}

interface ManualControls {
  pumpRunning: boolean
  exhaustFanRunning: boolean
}

interface SensorStatusGridProps {
  sensorData: SensorData[]
  onNotification?: (message: string, type: 'info' | 'warning' | 'error' | 'success') => void
}

export function SensorStatusGrid({ sensorData, onNotification }: SensorStatusGridProps) {
  const [controlsByZone, setControlsByZone] = useState<Record<string, ManualControls>>({})
  const getWaterLevelStatus = (level: number) => {
    if (level < 30) return { status: "Low", color: "green", variant: "default" as const }
    if (level < 60) return { status: "Medium", color: "yellow", variant: "secondary" as const }
    if (level < 80) return { status: "High", color: "orange", variant: "outline" as const }
    return { status: "Critical", color: "red", variant: "destructive" as const }
  }

  const getStatusIcon = (status: string) => {
    return status === 'active' ? CheckCircle : XCircle
  }

  const ensureZoneControls = (zones: string[]) => {
    setControlsByZone(prev => {
      const next = { ...prev }
      zones.forEach(z => {
        if (!next[z]) {
          next[z] = { pumpRunning: true, exhaustFanRunning: false }
        }
      })
      return next
    })
  }

  const togglePump = (zoneId: string) => {
    setControlsByZone(prev => {
      const zone = prev[zoneId] || { pumpRunning: true, exhaustFanRunning: false }
      const newState = !zone.pumpRunning
      const updated = { ...prev, [zoneId]: { ...zone, pumpRunning: newState } }
      if (onNotification) {
        const message = `${zoneId} Pump turned ${newState ? 'ON' : 'OFF'}`
        onNotification(message, newState ? 'success' : 'info')
      }
      return updated
    })
  }

  const toggleExhaustFan = (zoneId: string) => {
    setControlsByZone(prev => {
      const zone = prev[zoneId] || { pumpRunning: true, exhaustFanRunning: false }
      const newState = !zone.exhaustFanRunning
      const updated = { ...prev, [zoneId]: { ...zone, exhaustFanRunning: newState } }
      if (onNotification) {
        const message = `${zoneId} Exhaust Fan turned ${newState ? 'ON' : 'OFF'}`
        onNotification(message, newState ? 'success' : 'info')
      }
      return updated
    })
  }

  // Mock data if no sensor data is provided
  const mockSensorData: SensorData[] = [
    { zoneId: "Zone-A1", waterLevel: 25, status: 'active', lastUpdate: "2 min ago" },
    { zoneId: "Zone-B2", waterLevel: 65, status: 'inactive', lastUpdate: "1 min ago" },
    { zoneId: "Zone-C3", waterLevel: 85, status: 'inactive', lastUpdate: "3 min ago" },
    { zoneId: "Zone-D4", waterLevel: 45, status: 'inactive', lastUpdate: "15 min ago" },
  ]

  const displayData = sensorData.length > 0 ? sensorData : mockSensorData

  useEffect(() => {
    ensureZoneControls(displayData.map(s => s.zoneId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayData.map(s => s.zoneId).join('|')])

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle>Sensor Status Overview</CardTitle>
        <CardDescription>
          Real-time status of all drainage monitoring sensors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayData.map((sensor) => {
            const levelStatus = getWaterLevelStatus(sensor.waterLevel)
            const StatusIcon = getStatusIcon(sensor.status)
            
            return (
              <div
                key={sensor.zoneId}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{sensor.zoneId}</h3>
                  <StatusIcon 
                    className={`h-4 w-4 ${
                      sensor.status === 'active' ? 'text-green-500' : 'text-red-500'
                    }`} 
                  />
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className={`text-lg font-bold ${
                      sensor.waterLevel < 30 ? 'text-green-600 dark:text-green-400' :
                      sensor.waterLevel < 60 ? 'text-yellow-600 dark:text-yellow-400' :
                      sensor.waterLevel < 80 ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400'
                    }`}>{sensor.waterLevel}%</span>
                  </div>
                  <Badge variant={levelStatus.variant}>
                    {levelStatus.status}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Status: {sensor.status}</span>
                  <span>Updated: {sensor.lastUpdate}</span>
                </div>
                
                {/* Water level progress bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        sensor.waterLevel < 30 ? 'bg-green-500' :
                        sensor.waterLevel < 60 ? 'bg-yellow-500' :
                        sensor.waterLevel < 80 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${sensor.waterLevel}%` }}
                    ></div>
                  </div>
                </div>

                {/* Manual Controls - per zone */}
                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center mb-3">
                    <Settings className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                    <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">Manual Controls</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {/* Pump Control */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pump Control</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Status: {controlsByZone[sensor.zoneId]?.pumpRunning ? 'Running' : 'Stopped'}
                        </span>
                      </div>
                      <Button
                        onClick={() => togglePump(sensor.zoneId)}
                        className={`w-full rounded-full ${
                          controlsByZone[sensor.zoneId]?.pumpRunning 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600'
                        }`}
                      >
                        {controlsByZone[sensor.zoneId]?.pumpRunning ? 'Turn OFF' : 'Turn ON'}
                      </Button>
                    </div>

                    {/* Exhaust Fan Control */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Exhaust Fan</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Status: {controlsByZone[sensor.zoneId]?.exhaustFanRunning ? 'Running' : 'Stopped'}
                        </span>
                      </div>
                      <Button
                        onClick={() => toggleExhaustFan(sensor.zoneId)}
                        className={`w-full rounded-full ${
                          controlsByZone[sensor.zoneId]?.exhaustFanRunning 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600'
                        }`}
                      >
                        {controlsByZone[sensor.zoneId]?.exhaustFanRunning ? 'Turn OFF' : 'Turn ON'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
