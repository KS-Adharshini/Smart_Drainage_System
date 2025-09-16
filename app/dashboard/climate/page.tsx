"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, AlertTriangle, BarChart3, Gauge, Umbrella, Waves } from 'lucide-react'

export default function ClimatePage() {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="pt-2 pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Climate Dashboard</h1>
      </div>
      
      {/* Weather Forecast Row */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Weather Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-blue-700 dark:text-blue-300">Temperature</CardTitle>
                <Thermometer className="h-6 w-6 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-2">24°C</div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Current temperature</p>
              <Badge variant="outline" className="mt-2 bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700">
                Moderate
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-purple-700 dark:text-purple-300">Precipitation</CardTitle>
                <CloudRain className="h-6 w-6 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-2">65%</div>
              <p className="text-sm text-purple-600 dark:text-purple-400">Rain probability</p>
              <Badge variant="outline" className="mt-2 bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700">
                High Risk
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-green-700 dark:text-green-300">Humidity</CardTitle>
                <Droplets className="h-6 w-6 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100 mb-2">78%</div>
              <p className="text-sm text-green-600 dark:text-green-400">Air moisture level</p>
              <Badge variant="outline" className="mt-2 bg-green-100 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700">
                Elevated
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rainfall Prediction Row */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Rainfall Prediction</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border-cyan-200 dark:border-cyan-800 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-cyan-700 dark:text-cyan-300">Next Hour</CardTitle>
                <Umbrella className="h-6 w-6 text-cyan-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-900 dark:text-cyan-100 mb-2">30%</div>
              <p className="text-sm text-cyan-600 dark:text-cyan-400">Light rain expected</p>
              <Badge variant="outline" className="mt-2 bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-700">
                Low Impact
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-orange-700 dark:text-orange-300">Next 3 Hours</CardTitle>
                <CloudRain className="h-6 w-6 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900 dark:text-orange-100 mb-2">75%</div>
              <p className="text-sm text-orange-600 dark:text-orange-400">Heavy rain likely</p>
              <Badge variant="outline" className="mt-2 bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700">
                Medium Impact
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-red-200 dark:border-red-800 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-red-700 dark:text-red-300">Next 6 Hours</CardTitle>
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900 dark:text-red-100 mb-2">90%</div>
              <p className="text-sm text-red-600 dark:text-red-400">Storm conditions</p>
              <Badge variant="outline" className="mt-2 bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700">
                High Impact
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Flood Risk Assessment Row */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Flood Risk Assessment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-yellow-700 dark:text-yellow-300">Water Level</CardTitle>
                <Waves className="h-6 w-6 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-900 dark:text-yellow-100 mb-2">72%</div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Current capacity</p>
              <Badge variant="outline" className="mt-2 bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700">
                Warning
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-indigo-700 dark:text-indigo-300">Drainage Capacity</CardTitle>
                <Gauge className="h-6 w-6 text-indigo-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">45%</div>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">System efficiency</p>
              <Badge variant="outline" className="mt-2 bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-700">
                Reduced
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/20 dark:to-red-950/20 border-rose-200 dark:border-rose-800 bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-rose-700 dark:text-rose-300">Overall Risk</CardTitle>
                <BarChart3 className="h-6 w-6 text-rose-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rose-900 dark:text-rose-100 mb-2">High</div>
              <p className="text-sm text-rose-600 dark:text-rose-400">Flood probability</p>
              <Badge variant="outline" className="mt-2 bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-700">
                Critical
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}


