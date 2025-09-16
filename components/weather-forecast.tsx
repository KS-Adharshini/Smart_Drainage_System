"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, CloudRain, Sun, Wind, Droplets, CloudSnow, CloudLightning } from 'lucide-react'

interface WeatherData {
  date: string
  condition: string
  temperature: number
  precipitation: number
  humidity: number
  windSpeed: number
}

export function WeatherForecast() {
  const [forecast, setForecast] = useState<WeatherData[]>([
    {
      date: "Today",
      condition: "Rainy",
      temperature: 22,
      precipitation: 80,
      humidity: 85,
      windSpeed: 12
    },
    {
      date: "Tomorrow",
      condition: "Cloudy",
      temperature: 24,
      precipitation: 30,
      humidity: 70,
      windSpeed: 8
    },
    {
      date: "Day 3",
      condition: "Sunny",
      temperature: 28,
      precipitation: 10,
      humidity: 60,
      windSpeed: 5
    }
  ])
  const [loading, setLoading] = useState(false)

  // In a real application, you would fetch weather data from an API
  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     setLoading(true)
  //     try {
  //       const response = await fetch('/api/weather')
  //       const data = await response.json()
  //       setForecast(data)
  //     } catch (error) {
  //       console.error('Error fetching weather data:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchWeatherData()
  // }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case 'snowy':
        return <CloudSnow className="h-8 w-8 text-blue-200" />
      case 'stormy':
        return <CloudLightning className="h-8 w-8 text-purple-500" />
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />
    }
  }

  const getFloodRiskLevel = (precipitation: number, humidity: number) => {
    const riskScore = (precipitation * 0.7) + (humidity * 0.3)
    
    if (riskScore > 75) return { level: "High", color: "red" }
    if (riskScore > 50) return { level: "Medium", color: "orange" }
    if (riskScore > 25) return { level: "Low", color: "yellow" }
    return { level: "Minimal", color: "green" }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather Forecast</CardTitle>
          <CardDescription>Loading weather data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>
          Precipitation forecast and flood risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {forecast.map((day, index) => {
            const riskLevel = getFloodRiskLevel(day.precipitation, day.humidity)
            
            return (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{day.date}</h3>
                  {getWeatherIcon(day.condition)}
                </div>
                
                <div className="text-2xl font-bold mb-2">{day.temperature}°C</div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Precipitation:</span>
                    <span className="font-medium">{day.precipitation}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Humidity:</span>
                    <span className="font-medium">{day.humidity}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Wind:</span>
                    <span className="font-medium">{day.windSpeed} km/h</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Badge variant="outline" className={riskLevel.color === "red" ? "text-red-600" : 
                                                    riskLevel.color === "orange" ? "text-orange-600" : 
                                                    riskLevel.color === "yellow" ? "text-yellow-600" : "text-green-600"}>
                    <Droplets className="h-3 w-3 mr-1" />
                    {riskLevel.level} Flood Risk
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}