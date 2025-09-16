"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Droplets, Thermometer, Wind, Activity, Clock } from 'lucide-react'

interface SensorReading {
  id: number
  zoneId: string
  waterLevel: number
  status: string
  flowRate: number
  gasLevel: number
  temperature: number
  humidity: number
  pumpStatus: string
  exhaustFanStatus: string
  tapStatus: string
  timestamp: string
  lastUpdate: string
}

interface RecentDataTableProps {
  className?: string
}

export function RecentDataTable({ className }: RecentDataTableProps) {
  const [recentData, setRecentData] = useState<SensorReading[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentData()
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchRecentData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchRecentData = async () => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate reading from the JSON file
      const mockData: SensorReading[] = [
        {
          id: 105,
          zoneId: "Zone-A1",
          waterLevel: 67,
          status: "active",
          flowRate: 32.4,
          gasLevel: 0.041,
          temperature: 22.3,
          humidity: 73,
          pumpStatus: "stopped",
          exhaustFanStatus: "stopped",
          tapStatus: "on",
          timestamp: "2025-08-09T17:18:10.779Z",
          lastUpdate: "Just now"
        },
        {
          id: 104,
          zoneId: "Zone-A1",
          waterLevel: 80,
          status: "active",
          flowRate: 9.1,
          gasLevel: 0.072,
          temperature: 26.3,
          humidity: 80,
          pumpStatus: "stopped",
          exhaustFanStatus: "running",
          tapStatus: "off",
          timestamp: "2025-08-09T17:17:40.767Z",
          lastUpdate: "30 sec ago"
        },
        {
          id: 103,
          zoneId: "Zone-A1",
          waterLevel: 81,
          status: "active",
          flowRate: 16.4,
          gasLevel: 0.048,
          temperature: 27.5,
          humidity: 64,
          pumpStatus: "stopped",
          exhaustFanStatus: "stopped",
          tapStatus: "on",
          timestamp: "2025-08-09T17:17:10.752Z",
          lastUpdate: "1 min ago"
        },
        {
          id: 102,
          zoneId: "Zone-A1",
          waterLevel: 79,
          status: "active",
          flowRate: 19.8,
          gasLevel: 0.043,
          temperature: 23.3,
          humidity: 84,
          pumpStatus: "stopped",
          exhaustFanStatus: "running",
          tapStatus: "on",
          timestamp: "2025-08-09T17:16:40.750Z",
          lastUpdate: "1.5 min ago"
        },
        {
          id: 101,
          zoneId: "Zone-A1",
          waterLevel: 49,
          status: "active",
          flowRate: 12.0,
          gasLevel: 0.024,
          temperature: 29.2,
          humidity: 63,
          pumpStatus: "stopped",
          exhaustFanStatus: "stopped",
          tapStatus: "off",
          timestamp: "2025-08-09T17:16:10.606Z",
          lastUpdate: "2 min ago"
        }
      ]
      
      setRecentData(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching recent data:', error)
      setLoading(false)
    }
  }

  const getWaterLevelBadge = (level: number) => {
    if (level < 30) return { variant: "default" as const, color: "text-green-600", label: "Low" }
    if (level < 60) return { variant: "secondary" as const, color: "text-yellow-600", label: "Medium" }
    if (level < 80) return { variant: "outline" as const, color: "text-orange-600", label: "High" }
    return { variant: "destructive" as const, color: "text-red-600", label: "Critical" }
  }

  const getStatusBadge = (status: string) => {
    return status === "running" 
      ? { variant: "default" as const, color: "text-green-600" }
      : { variant: "secondary" as const, color: "text-gray-600" }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent Sensor Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent Sensor Data (Top 3)
          </div>
          <Badge variant="outline" className="text-xs">
            Zone-A1
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[300px]">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-white dark:bg-gray-800">
              <TableRow className="border-gray-200 dark:border-gray-700">
                <TableHead className="w-16 text-gray-700 dark:text-gray-300">ID</TableHead>
                <TableHead className="w-20 text-gray-700 dark:text-gray-300">Water Level</TableHead>
                <TableHead className="w-20 text-gray-700 dark:text-gray-300">Flow Rate</TableHead>
                <TableHead className="w-20 text-gray-700 dark:text-gray-300">Gas Level</TableHead>
                <TableHead className="w-20 text-gray-700 dark:text-gray-300">Temp</TableHead>
                <TableHead className="w-20 text-gray-700 dark:text-gray-300">Humidity</TableHead>
                <TableHead className="w-20 text-gray-700 dark:text-gray-300">Pump</TableHead>
                <TableHead className="w-20 text-gray-700 dark:text-gray-300">Fan</TableHead>
                <TableHead className="w-20 text-gray-700 dark:text-gray-300">Tap</TableHead>
                <TableHead className="w-24 text-gray-700 dark:text-gray-300">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentData.slice(0, 3).map((reading) => {
                const waterLevelBadge = getWaterLevelBadge(reading.waterLevel)
                const pumpBadge = getStatusBadge(reading.pumpStatus)
                const fanBadge = getStatusBadge(reading.exhaustFanStatus)
                const tapBadge = getStatusBadge(reading.tapStatus)
                
                return (
                  <TableRow key={reading.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700">
                    <TableCell className="font-medium text-gray-900 dark:text-white">#{reading.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-gray-900 dark:text-white">{reading.waterLevel}%</span>
                        <Badge variant={waterLevelBadge.variant} className="text-xs mt-1">
                          {waterLevelBadge.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Wind className="h-3 w-3 mr-1 text-blue-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{reading.flowRate} L/min</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{reading.gasLevel} ppm</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Thermometer className="h-3 w-3 mr-1 text-orange-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{reading.temperature}°C</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Droplets className="h-3 w-3 mr-1 text-cyan-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{reading.humidity}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={pumpBadge.variant} className="text-xs">
                        {reading.pumpStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={fanBadge.variant} className="text-xs">
                        {reading.exhaustFanStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={tapBadge.variant} className="text-xs">
                        {reading.tapStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTimestamp(reading.timestamp)}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          Data updates automatically every 30 seconds
        </div>
      </CardContent>
    </Card>
  )
}
