"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Wrench, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface MaintenanceTask {
  id: string
  title: string
  location: string
  date: string
  status: 'scheduled' | 'completed' | 'overdue' | 'in-progress'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedTo: string
}

export function MaintenanceSchedule() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([
    {
      id: "task-1",
      title: "Clean drainage pipes",
      location: "Zone A1",
      date: "2025-08-15",
      status: "scheduled",
      priority: "high",
      assignedTo: "Maintenance Team 1"
    },
    {
      id: "task-2",
      title: "Replace water level sensor",
      location: "Zone B2",
      date: "2025-08-12",
      status: "overdue",
      priority: "critical",
      assignedTo: "Sensor Technician"
    },
    {
      id: "task-3",
      title: "Inspect pump station",
      location: "Main Pump Station",
      date: "2025-08-14",
      status: "in-progress",
      priority: "medium",
      assignedTo: "Engineering Team"
    },
    {
      id: "task-4",
      title: "Clear debris from grates",
      location: "Zone C3",
      date: "2025-08-10",
      status: "completed",
      priority: "medium",
      assignedTo: "Maintenance Team 2"
    }
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Wrench className="h-4 w-4 text-blue-500" />
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green'
      case 'in-progress': return 'blue'
      case 'overdue': return 'red'
      default: return 'gray'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'red'
      case 'high': return 'orange'
      case 'medium': return 'yellow'
      default: return 'green'
    }
  }

  const markAsCompleted = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'completed' } : task
    ))
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Maintenance Schedule</CardTitle>
            <CardDescription>Upcoming and recent maintenance tasks</CardDescription>
          </div>
          <Calendar className="h-6 w-6 text-gray-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-white dark:bg-gray-900 z-10">
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Assigned Team</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className="odd:bg-gray-50">
                  <TableCell className="font-medium flex items-center">
                    {getStatusIcon(task.status)}
                    <span className="ml-2">{task.title}</span>
                  </TableCell>
                  <TableCell>{task.location}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{new Date(task.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-xs text-white ${
                      task.status === 'completed' ? 'bg-green-600' :
                      task.status === 'in-progress' ? 'bg-yellow-600' :
                      task.status === 'overdue' ? 'bg-red-600' : 'bg-blue-600'
                    }`}>
                      {task.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-xs text-white ${
                      task.priority === 'critical' ? 'bg-red-600' :
                      task.priority === 'high' ? 'bg-orange-600' :
                      task.priority === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                    }`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {task.status !== 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => markAsCompleted(task.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View Full Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}