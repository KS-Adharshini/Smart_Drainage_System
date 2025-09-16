import { WaterLevelChart } from "@/components/water-level-chart"

export default function WaterLevelsPage() {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="pt-2 pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Water Levels</h1>
      </div>
      <div className="mb-8">
        <WaterLevelChart />
      </div>
    </main>
  )
}


