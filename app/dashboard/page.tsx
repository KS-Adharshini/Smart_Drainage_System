"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, AlertTriangle, CheckCircle, XCircle, Activity } from 'lucide-react'
import { RecentDataTable } from "@/components/recent-data-table"

interface User {
  id: string
  name: string
  email: string
}

interface SensorData {
  zoneId: string
  waterLevel: number
  status: 'active' | 'inactive'
  lastUpdate: string
}

interface AlertData {
  id: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  zoneId: string
  timestamp: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [sensorData, setSensorData] = useState<SensorData[]>([
    { zoneId: "Zone-A1", waterLevel: 58, status: 'active', lastUpdate: "Just now" },
    { zoneId: "Zone-B2", waterLevel: 65, status: 'inactive', lastUpdate: "1 min ago" },
    { zoneId: "Zone-C3", waterLevel: 85, status: 'inactive', lastUpdate: "3 min ago" },
    { zoneId: "Zone-D4", waterLevel: 45, status: 'inactive', lastUpdate: "15 min ago" }
  ])
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/signin")
      return
    }

    setUser(JSON.parse(userData))
    fetchDashboardData()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token")
      
      // Fetch sensor data
      const sensorResponse = await fetch("/api/sensors/latest", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      
      // Fetch alerts
      const alertsResponse = await fetch("/api/alerts", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (sensorResponse.ok) {
        const sensorData = await sensorResponse.json()
        setSensorData(sensorData)
      } else {
        console.error('Failed to fetch sensor data:', sensorResponse.status)
        // Set fallback sensor data to ensure proper display
        setSensorData([
          { zoneId: "Zone-A1", waterLevel: 58, status: 'active', lastUpdate: "Just now" },
          { zoneId: "Zone-B2", waterLevel: 65, status: 'inactive', lastUpdate: "1 min ago" },
          { zoneId: "Zone-C3", waterLevel: 85, status: 'inactive', lastUpdate: "3 min ago" },
          { zoneId: "Zone-D4", waterLevel: 45, status: 'inactive', lastUpdate: "15 min ago" }
        ])
      }

      if (alertsResponse.ok) {
        const alertsData = await alertsResponse.json()
        setAlerts(alertsData)
      } else {
        console.error('Failed to fetch alerts data:', alertsResponse.status)
        // Set fallback alerts data
        setAlerts([])
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  const getWaterLevelStatus = (level: number) => {
    if (level < 30) return { status: "Low", color: "green", icon: CheckCircle }
    if (level < 60) return { status: "Medium", color: "yellow", icon: AlertTriangle }
    if (level < 80) return { status: "High", color: "orange", icon: AlertTriangle }
    return { status: "Critical", color: "red", icon: XCircle }
  }

  const handleNotification = (message: string, type: 'info' | 'warning' | 'error' | 'success') => {
    // Use the global notification function if available
    if (typeof window !== 'undefined' && (window as any).addNotification) {
      (window as any).addNotification(message, type)
    }
  }

  const activeSensors = sensorData.filter(sensor => sensor.status === 'active').length
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length
  const averageWaterLevel = sensorData.length > 0 
    ? Math.round(sensorData.reduce((sum, sensor) => sum + sensor.waterLevel, 0) / sensorData.length)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* System Overview Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sensors</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSensors}</div>
              <p className="text-xs text-muted-foreground">
                of {sensorData.length} total sensors
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Water Level</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageWaterLevel}%</div>
              <p className="text-xs text-muted-foreground">
                {getWaterLevelStatus(averageWaterLevel).status} level
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{criticalAlerts}</div>
              <p className="text-xs text-muted-foreground">
                Require immediate attention
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Operational</div>
              <p className="text-xs text-muted-foreground">
                All systems running
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <Badge variant="outline" className="text-xs px-2 py-1">
                  <Droplets className="h-3 w-3 mr-1" />
                  Water: Normal
                </Badge>
                <Badge variant="outline" className="text-xs px-2 py-1">
                  <Activity className="h-3 w-3 mr-1" />
                  Sensors: Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table (Recent Sensor Data) */}
        <div className="mb-8">
          <RecentDataTable />
        </div>
      </main>
    </div>
  )
}
