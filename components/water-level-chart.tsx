"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", zone1: 25, zone2: 35, zone3: 45, zone4: 30 },
  { time: "04:00", zone1: 30, zone2: 40, zone3: 50, zone4: 35 },
  { time: "08:00", zone1: 45, zone2: 55, zone3: 65, zone4: 50 },
  { time: "12:00", zone1: 60, zone2: 70, zone3: 80, zone4: 65 },
  { time: "16:00", zone1: 55, zone2: 65, zone3: 75, zone4: 60 },
  { time: "20:00", zone1: 40, zone2: 50, zone3: 60, zone4: 45 },
  { time: "24:00", zone1: 30, zone2: 40, zone3: 50, zone4: 35 },
]

const chartConfig = {
  zone1: {
    label: "Zone 1",
    color: "hsl(var(--chart-1))",
  },
  zone2: {
    label: "Zone 2", 
    color: "hsl(var(--chart-2))",
  },
  zone3: {
    label: "Zone 3",
    color: "hsl(var(--chart-3))",
  },
  zone4: {
    label: "Zone 4",
    color: "hsl(var(--chart-4))",
  },
}

export function WaterLevelChart() {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle>Water Level Trends</CardTitle>
        <CardDescription>
          24-hour water level monitoring across all zones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={70}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="time" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line 
                type="monotone" 
                dataKey="zone1" 
                stroke="var(--color-zone1)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-zone1)" }}
              />
              <Line 
                type="monotone" 
                dataKey="zone2" 
                stroke="var(--color-zone2)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-zone2)" }}
              />
              <Line 
                type="monotone" 
                dataKey="zone3" 
                stroke="var(--color-zone3)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-zone3)" }}
              />
              <Line 
                type="monotone" 
                dataKey="zone4" 
                stroke="var(--color-zone4)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-zone4)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
