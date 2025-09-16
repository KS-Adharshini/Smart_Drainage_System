"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplets, Menu, X } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-4 lg:px-8 backdrop-blur-md bg-background/80 rounded-b-3xl shadow-lg mx-4 mt-2" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="p-2 flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary to-accent rounded-full p-2">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold font-montserrat bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">DrainageMonitor</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2.5 bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          <Link href="/" className="text-sm font-medium px-3 py-2 rounded-full hover:bg-primary/10 transition-all duration-300">
            Home
          </Link>
          <Link href="#features" className="text-sm font-medium px-3 py-2 rounded-full hover:bg-primary/10 transition-all duration-300">
            Features
          </Link>
          <Link href="/dashboard" className="text-sm font-medium px-3 py-2 rounded-full hover:bg-primary/10 transition-all duration-300">
            Dashboard
          </Link>
          <Link href="#contact" className="text-sm font-medium px-3 py-2 rounded-full hover:bg-primary/10 transition-all duration-300">
            Contact
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          <ThemeToggle />
          <Link href="/auth/signin">
            <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">Sign Up</Button>
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-card px-6 py-6 sm:max-w-sm sm:rounded-l-3xl shadow-xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="p-2 flex items-center space-x-3">
                <div className="bg-gradient-to-r from-primary to-accent rounded-full p-2">
                  <Droplets className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold font-montserrat bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">DrainageMonitor</span>
              </Link>
              <button
                type="button"
                className="rounded-full p-2.5 bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-1 py-6">
                  <Link
                    href="/"
                    className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-primary/10 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="#features"
                    className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-primary/10 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-primary/10 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </div>
                <div className="py-6 space-y-4">
                  <Link
                    href="#contact"
                    className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-primary/10 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <div className="flex items-center px-4 pt-4">
                    <ThemeToggle />
                  </div>
                  <Link
                    href="/auth/signin"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
