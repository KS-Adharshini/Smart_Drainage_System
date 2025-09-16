"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Droplets, LayoutDashboard, Activity, Bell, Wrench, Cloud, BarChart3, Settings, Waves, LogOut } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/sensors", label: "Sensors", icon: Activity },
    { href: "/dashboard/water-levels", label: "Water Levels", icon: Waves },
    { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
    { href: "/dashboard/maintenance", label: "Maintenance", icon: Wrench },
    { href: "/dashboard/climate", label: "Climate", icon: Cloud },
    { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  ]

  const router = useRouter()
  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user")
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.name) setUserName(parsed.name)
      }
    } catch {}
  }, [])

  const handleLogout = () => {
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    } catch {}
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Fixed Sidebar */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-[16.6667%] flex-col border-r border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-b from-white via-gray-50/80 to-gray-100/90 dark:from-gray-950 dark:via-gray-900/80 dark:to-gray-800/90 backdrop-blur-xl shadow-2xl">
        <div className="h-20 px-6 flex items-center space-x-4 border-b border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 dark:from-blue-600/20 dark:to-cyan-500/20">
          <div className="bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-500 rounded-2xl p-3 shadow-lg">
            <Droplets className="h-6 w-6 text-white drop-shadow-sm" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Drainage</span>
            <span className="font-medium text-sm text-gray-600 dark:text-gray-400">Monitor</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isRoot = href === "/dashboard"
            const active = isRoot ? pathname === href : (pathname === href || pathname.startsWith(href + "/"))
            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium relative overflow-hidden ${
                  active
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 dark:text-blue-300 shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/30'
                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gradient-to-r hover:from-gray-100/80 hover:to-gray-50/80 dark:hover:from-gray-800/80 dark:hover:to-gray-700/80'
                }`}
              >
                <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                  active 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gradient-to-br group-hover:from-gray-200 group-hover:to-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:from-gray-700 dark:group-hover:to-gray-600'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="relative z-10">{label}</span>
                {active && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-l-full"></div>
                )}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="w-full md:ml-[16.6667%] md:w-[83.3333%]">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 px-6 bg-gradient-to-r from-white/90 via-gray-50/90 to-white/90 dark:from-gray-950/90 dark:via-gray-900/90 dark:to-gray-950/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg">
          <div className="truncate">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-600 to-cyan-600 dark:from-white dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Drainage Monitor Dashboard — <span className="font-normal">Welcome back, {userName || 'User'}</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout} 
              className="gap-2 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 border-red-200 text-red-700 hover:text-red-800 hover:border-red-300 dark:from-red-950/20 dark:to-orange-950/20 dark:border-red-800 dark:text-red-400 dark:hover:from-red-900/30 dark:hover:to-orange-900/30"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}


