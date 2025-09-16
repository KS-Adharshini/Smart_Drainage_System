"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Droplets, AlertTriangle, ArrowUpRight, ArrowDownRight, Waves, CloudRain } from 'lucide-react'

interface RiskFactor {
  name: string
  value: number
  weight: number
  icon: React.ReactNode
  description: string
}

export function FloodRiskAssessment() {
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([
    {
      name: "Water Level",
      value: 75, // percentage
      weight: 0.4,
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      description: "Current average water level across all drainage zones"
    },
    {
      name: "Rainfall Intensity",
      value: 65, // percentage
      weight: 0.3,
      icon: <CloudRain className="h-5 w-5 text-blue-500" />,
      description: "Predicted rainfall intensity for the next 24 hours"
    },
    {
      name: "Drainage Capacity",
      value: 40, // percentage (lower is worse)
      weight: 0.2,
      icon: <Waves className="h-5 w-5 text-blue-500" />,
      description: "Current drainage system capacity utilization"
    },
    {
      name: "Ground Saturation",
      value: 80, // percentage
      weight: 0.1,
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      description: "Soil saturation level based on recent rainfall"
    }
  ])
  
  const [overallRisk, setOverallRisk] = useState(0)
  const [riskTrend, setRiskTrend] = useState<'increasing' | 'decreasing' | 'stable'>('stable')
  const [loading, setLoading] = useState(false)

  // Calculate overall risk score
  useEffect(() => {
    const calculateRisk = () => {
      let totalRisk = 0
      
      riskFactors.forEach(factor => {
        // For drainage capacity, invert the value since lower capacity means higher risk
        const factorValue = factor.name === "Drainage Capacity" ? 100 - factor.value : factor.value
        totalRisk += factorValue * factor.weight
      })
      
      setOverallRisk(Math.round(totalRisk))
    }
    
    calculateRisk()
    
    // Simulate risk trend (in a real app, this would be based on historical data)
    const previousRisk = localStorage.getItem('previousRiskScore')
    if (previousRisk) {
      const prevScore = parseInt(previousRisk)
      if (overallRisk > prevScore + 5) {
        setRiskTrend('increasing')
      } else if (overallRisk < prevScore - 5) {
        setRiskTrend('decreasing')
      } else {
        setRiskTrend('stable')
      }
    }
    
    localStorage.setItem('previousRiskScore', overallRisk.toString())
  }, [riskFactors, overallRisk])

  const getRiskLevel = (score: number) => {
    if (score >= 75) return { level: "Critical", color: "red" }
    if (score >= 60) return { level: "High", color: "orange" }
    if (score >= 40) return { level: "Moderate", color: "yellow" }
    if (score >= 20) return { level: "Low", color: "green" }
    return { level: "Minimal", color: "blue" }
  }

  const getRiskColor = (score: number) => {
    const { color } = getRiskLevel(score)
    return color === "red" ? "text-red-600" : 
           color === "orange" ? "text-orange-600" : 
           color === "yellow" ? "text-yellow-600" : 
           color === "green" ? "text-green-600" : "text-blue-600"
  }

  const getProgressColor = (score: number) => {
    const { color } = getRiskLevel(score)
    return color === "red" ? "bg-red-600" : 
           color === "orange" ? "bg-orange-600" : 
           color === "yellow" ? "bg-yellow-600" : 
           color === "green" ? "bg-green-600" : "bg-blue-600"
  }

  const getTrendIcon = () => {
    if (riskTrend === 'increasing') {
      return <ArrowUpRight className="h-4 w-4 text-red-500" />
    } else if (riskTrend === 'decreasing') {
      return <ArrowDownRight className="h-4 w-4 text-green-500" />
    }
    return null
  }

  const getRecommendations = (score: number) => {
    if (score >= 75) {
      return [
        "Activate emergency drainage protocols",
        "Deploy mobile pumping units to critical areas",
        "Issue public flood warnings",
        "Prepare evacuation routes if necessary"
      ]
    } else if (score >= 60) {
      return [
        "Increase drainage system capacity",
        "Monitor water levels continuously",
        "Clear blockages in drainage channels",
        "Alert maintenance teams"
      ]
    } else if (score >= 40) {
      return [
        "Perform preventive maintenance",
        "Check pump functionality",
        "Monitor weather forecasts closely"
      ]
    } else {
      return [
        "Maintain regular monitoring schedule",
        "Continue routine maintenance"
      ]
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Flood Risk Assessment</CardTitle>
          <CardDescription>Loading risk data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const riskLevel = getRiskLevel(overallRisk)
  const recommendations = getRecommendations(overallRisk)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flood Risk Assessment</CardTitle>
        <CardDescription>
          Real-time flood risk analysis based on multiple factors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Overall Flood Risk</h3>
            <div className="flex items-center">
              <span className={`text-lg font-bold ${getRiskColor(overallRisk)}`}>
                {riskLevel.level}
              </span>
              {getTrendIcon()}
            </div>
          </div>
          
          <Progress 
            value={overallRisk} 
            className="h-3 bg-gray-200 dark:bg-gray-700"
            indicatorClassName={getProgressColor(overallRisk)}
          />
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Minimal</span>
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
            <span>Critical</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="font-medium">Risk Factors</h3>
          {riskFactors.map((factor, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {factor.icon}
                  <span className="ml-2 text-sm font-medium">{factor.name}</span>
                </div>
                <span className={`text-sm font-medium ${getRiskColor(factor.name === "Drainage Capacity" ? 100 - factor.value : factor.value)}`}>
                  {factor.value}%
                </span>
              </div>
              <Progress 
                value={factor.value} 
                className="h-2 bg-gray-200 dark:bg-gray-700"
                indicatorClassName={getProgressColor(factor.name === "Drainage Capacity" ? 100 - factor.value : factor.value)}
              />
              <p className="text-xs text-gray-500">{factor.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Recommended Actions</h3>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}