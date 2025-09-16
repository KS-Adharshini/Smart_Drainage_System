"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Info, AlertCircle, XCircle } from 'lucide-react'

interface AlertData {
  id: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  zoneId: string
  timestamp: string
}

interface AlertsTableProps {
  alerts: AlertData[]
}

export function AlertsTable({ alerts }: AlertsTableProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return Info
      case 'medium': return AlertCircle
      case 'high': return AlertTriangle
      case 'critical': return XCircle
      default: return Info
    }
  }

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'low': return 'secondary' as const
      case 'medium': return 'outline' as const
      case 'high': return 'default' as const
      case 'critical': return 'destructive' as const
      default: return 'secondary' as const
    }
  }

  // Mock data if no alerts are provided
  const mockAlerts: AlertData[] = [
    {
      id: "1",
      message: "Water level critical in drainage zone A1",
      severity: 'critical',
      zoneId: "Zone-A1",
      timestamp: "2024-01-15 14:30:00"
    },
    {
      id: "2", 
      message: "Sensor connectivity issue detected",
      severity: 'high',
      zoneId: "Zone-D4",
      timestamp: "2024-01-15 14:15:00"
    },
    {
      id: "3",
      message: "Water level approaching high threshold",
      severity: 'medium',
      zoneId: "Zone-B2",
      timestamp: "2024-01-15 13:45:00"
    },
    {
      id: "4",
      message: "Routine maintenance reminder",
      severity: 'low',
      zoneId: "Zone-C3",
      timestamp: "2024-01-15 12:00:00"
    },
    {
      id: "5",
      message: "Water level normalized after heavy rain",
      severity: 'low',
      zoneId: "Zone-E5",
      timestamp: "2024-01-15 11:30:00"
    }
  ]

  const displayAlerts = alerts.length > 0 ? alerts : mockAlerts

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>
          Latest alerts and incidents from your drainage monitoring system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Severity</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayAlerts.map((alert) => {
              const SeverityIcon = getSeverityIcon(alert.severity)
              
              return (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <SeverityIcon className="h-4 w-4" />
                      <Badge variant={getSeverityVariant(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{alert.zoneId}</TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
