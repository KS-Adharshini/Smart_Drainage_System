"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Droplets, Zap, Wind, Power } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SystemStatusProps {
  className?: string
}

interface StatusIndicator {
  title: string
  status: 'Normal' | 'Overflow' | 'Critical' | 'Warning'
  icon: React.ComponentType<any>
  color: string
}

interface SensorData {
  id: number
  zoneId: string
  waterLevel: number
  status: string
  gasLevel: number
  temperature: number
  humidity: number
  pumpStatus: string
  exhaustFanStatus: string
  timestamp: string
  lastUpdate: string
}

export function SystemStatus({ className }: SystemStatusProps) {
  const [sensorData, setSensorData] = useState<SensorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [pumpOn, setPumpOn] = useState(false)
  const [fanOn, setFanOn] = useState(false)

  // Fetch latest sensor data
  const fetchSensorData = async () => {
    try {
      const response = await fetch('/data/sensor-dataset.json')
      const data = await response.json()
      setSensorData(data.currentData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching sensor data:', error)
      setLoading(false)
    }
  }

  // Set up auto-refresh every 2 seconds
  useEffect(() => {
    fetchSensorData()
    const interval = setInterval(fetchSensorData, 2000)
    return () => clearInterval(interval)
  }, [])

  // Generate dynamic status indicators based on sensor data
  const getStatusIndicators = (): StatusIndicator[] => {
    if (!sensorData) {
      return [
        { title: "Water Level", status: "Normal", icon: Droplets, color: "gray" },
        { title: "Gas Detection", status: "Normal", icon: Zap, color: "gray" }
      ]
    }

    const indicators: StatusIndicator[] = []

    // Water Level Status
    let waterStatus: 'Normal' | 'Warning' | 'Critical' | 'Overflow' = 'Normal'
    let waterColor = 'green'
    if (sensorData.waterLevel >= 85) {
      waterStatus = 'Overflow'
      waterColor = 'red'
    } else if (sensorData.waterLevel >= 70) {
      waterStatus = 'Critical'
      waterColor = 'red'
    } else if (sensorData.waterLevel >= 45) {
      waterStatus = 'Warning'
      waterColor = 'yellow'
    }

    indicators.push({
      title: "Water Level",
      status: waterStatus,
      icon: Droplets,
      color: waterColor
    })

    // Gas Detection Status
    let gasStatus: 'Normal' | 'Warning' | 'Critical' | 'Overflow' = 'Normal'
    let gasColor = 'green'
    if (sensorData.gasLevel >= 0.08) {
      gasStatus = 'Critical'
      gasColor = 'red'
    } else if (sensorData.gasLevel >= 0.06) {
      gasStatus = 'Warning'
      gasColor = 'yellow'
    }

    indicators.push({
      title: "Gas Detection",
      status: gasStatus,
      icon: Zap,
      color: gasColor
    })

    return indicators
  }

  const statusIndicators = getStatusIndicators()

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'default'
      case 'Overflow':
      case 'Critical':
        return 'destructive'
      case 'Warning':
        return 'secondary'
      default:
        return 'default'
    }
  }

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'green':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'yellow':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'gray':
        return 'bg-gray-50 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getIconColor = (color: string) => {
    switch (color) {
      case 'red':
        return 'text-red-500'
      case 'green':
        return 'text-green-500'
      case 'yellow':
        return 'text-yellow-500'
      case 'gray':
        return 'text-gray-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className={className}>
      {/* System Controls */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full mr-2 bg-blue-500"></div>
              System Controls
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-lg border text-center cursor-pointer transition-colors ${
                pumpOn 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}
              onClick={() => setPumpOn(!pumpOn)}
            >
              <div className="flex flex-col items-center space-y-3">
                <Droplets className={`h-8 w-8 ${
                  pumpOn ? 'text-blue-500' : 'text-gray-500'
                }`} />
                <div>
                  <h3 className="font-semibold text-sm mb-2">Pump</h3>
                  <Badge 
                    variant={pumpOn ? "default" : "secondary"}
                    className={`px-3 py-1 ${
                      pumpOn 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pumpOn ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              </div>
            </div>
            <div
              className={`p-4 rounded-lg border text-center cursor-pointer transition-colors ${
                fanOn 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-gray-50 text-gray-700 border-gray-200'
              }`}
              onClick={() => setFanOn(!fanOn)}
            >
              <div className="flex flex-col items-center space-y-3">
                <Wind className={`h-8 w-8 ${
                  fanOn ? 'text-green-500' : 'text-gray-500'
                }`} />
                <div>
                  <h3 className="font-semibold text-sm mb-2">Fan</h3>
                  <Badge 
                    variant={fanOn ? "default" : "secondary"}
                    className={`px-3 py-1 ${
                      fanOn 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {fanOn ? 'ON' : 'OFF'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`h-2 w-2 rounded-full mr-2 ${loading ? 'bg-gray-400' : 'bg-green-500 animate-pulse'}`}></div>
              System Status
            </div>
            <div className="text-xs text-muted-foreground font-normal">
              {loading ? 'Loading...' : 'Live • Updates every 2s'}
            </div>
          </CardTitle>
        </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statusIndicators.map((indicator, index) => {
            const Icon = indicator.icon
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border text-center ${getStatusColor(indicator.color)}`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <Icon className={`h-8 w-8 ${getIconColor(indicator.color)}`} />
                  <div>
                    <h3 className="font-semibold text-sm mb-2">{indicator.title}</h3>
                    <Badge 
                      variant={getStatusBadgeVariant(indicator.status)}
                      className="px-3 py-1"
                    >
                      {indicator.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        </CardContent>
      </Card>
    </div>
  )
}
