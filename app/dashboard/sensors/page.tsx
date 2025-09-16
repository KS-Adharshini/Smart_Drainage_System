"use client"

import { SensorStatusGrid } from "@/components/sensor-status-grid"

export default function SensorsPage() {
  const handleNotification = (message: string) => {
    if (typeof window !== 'undefined' && (window as any).addNotification) {
      (window as any).addNotification(message, 'info')
    }
  }

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="pt-2 pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Sensors</h1>
      </div>
      <div className="mb-8">
        <SensorStatusGrid sensorData={[]} onNotification={handleNotification} />
      </div>
    </main>
  )
}


