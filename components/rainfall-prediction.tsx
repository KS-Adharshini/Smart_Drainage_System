"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudRain, AlertTriangle, Clock } from 'lucide-react'
import { useState } from "react"

interface RainfallPrediction {
  time: string
  intensity: 'light' | 'moderate' | 'heavy' | 'extreme'
  probability: number
  duration: string
}

export function RainfallPrediction() {
  const [predictions, setPredictions] = useState<RainfallPrediction[]>([
    {
      time: "Next 1 hour",
      intensity: "light",
      probability: 30,
      duration: "30 min"
    },
    {
      time: "Next 3 hours",
      intensity: "moderate",
      probability: 65,
      duration: "1.5 hours"
    },
    {
      time: "Next 6 hours",
      intensity: "heavy",
      probability: 85,
      duration: "2 hours"
    }
  ])

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'light': return 'blue-400'
      case 'moderate': return 'blue-600'
      case 'heavy': return 'purple-600'
      case 'extreme': return 'red-600'
      default: return 'gray-500'
    }
  }

  const getIntensityIcon = (intensity: string, probability: number) => {
    if (probability > 70) {
      return <AlertTriangle className={`h-5 w-5 text-${intensity === 'extreme' ? 'red' : 'yellow'}-500`} />
    }
    return null
  }

  const getDrainageImpact = (intensity: string, probability: number) => {
    if (intensity === 'extreme' && probability > 70) {
      return "Critical - Immediate action required"
    }
    if (intensity === 'heavy' && probability > 70) {
      return "High - Prepare drainage systems"
    }
    if (intensity === 'moderate' && probability > 60) {
      return "Moderate - Monitor drainage levels"
    }
    return "Low - Normal operations"
  }

  const getImpactLevel = (intensity: string, probability: number) => {
    if (intensity === 'extreme' || (intensity === 'heavy' && probability >= 60) || probability >= 80) return { label: 'High', color: 'red' }
    if (intensity === 'moderate' || probability >= 40) return { label: 'Moderate', color: 'orange' }
    return { label: 'Low', color: 'green' }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Rainfall Prediction</CardTitle>
            <CardDescription>Upcoming rainfall forecast and drainage impact</CardDescription>
          </div>
          <CloudRain className="h-6 w-6 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium">{prediction.time}</h4>
                  <div className="flex items-center mt-1">
                    <span className={`inline-block w-3 h-3 rounded-full ${prediction.intensity === 'light' ? 'bg-blue-400' : 
                                                                          prediction.intensity === 'moderate' ? 'bg-blue-600' : 
                                                                          prediction.intensity === 'heavy' ? 'bg-purple-600' : 'bg-red-600'} mr-2`}></span>
                    <span className="text-sm capitalize">{prediction.intensity} rain</span>
                    {getIntensityIcon(prediction.intensity, prediction.probability)}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium">{prediction.probability}% chance</div>
                <div className="text-sm text-gray-500">{prediction.duration}</div>
                {(() => {
                  const impactLevel = getImpactLevel(prediction.intensity, prediction.probability)
                  return (
                    <Badge variant="outline" className={`mt-1 ${impactLevel.color === 'red' ? 'text-red-600' : impactLevel.color === 'orange' ? 'text-orange-600' : 'text-green-600'}`}>
                      Impact: {impactLevel.label}
                    </Badge>
                  )
                })()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium mb-2">Drainage System Impact</h4>
          <div className="space-y-2">
            {predictions.map((prediction, index) => {
              const impact = getDrainageImpact(prediction.intensity, prediction.probability)
              const impactColor = impact.startsWith("Critical") ? "red" : 
                                impact.startsWith("High") ? "orange" : 
                                impact.startsWith("Moderate") ? "yellow" : "green"
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{prediction.time}:</span>
                  <Badge variant="outline" className={impactColor === "red" ? "text-red-600" : 
                                                    impactColor === "orange" ? "text-orange-600" : 
                                                    impactColor === "yellow" ? "text-yellow-600" : "text-green-600"}>
                    {impact}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}