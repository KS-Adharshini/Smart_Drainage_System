import { MaintenanceSchedule } from "@/components/maintenance-schedule"

export default function MaintenancePage() {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="pt-2 pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
      </div>
      <div className="mb-8">
        <MaintenanceSchedule />
      </div>
    </main>
  )
}


