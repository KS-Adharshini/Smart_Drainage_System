"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, User, Shield, Settings } from "lucide-react"
import { useState } from "react"

interface DemoCredential {
  role: string
  email: string
  password: string
  description: string
  icon: React.ReactNode
}

const demoCredentials: DemoCredential[] = [
  {
    role: "Admin",
    email: "admin@drainage.com",
    password: "password",
    description: "Full system access and management",
    icon: <Shield className="h-4 w-4" />
  },
  {
    role: "Operator",
    email: "operator@drainage.com", 
    password: "password",
    description: "Operational controls and monitoring",
    icon: <Settings className="h-4 w-4" />
  },
  {
    role: "User",
    email: "john@drainage.com",
    password: "password",
    description: "Basic monitoring and alerts",
    icon: <User className="h-4 w-4" />
  }
]

export function DemoCredentials() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Demo Login Credentials</CardTitle>
        <CardDescription>
          Use these credentials to test the authentication system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {demoCredentials.map((credential, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {credential.icon}
                <Badge variant={credential.role === 'Admin' ? 'destructive' : credential.role === 'Operator' ? 'default' : 'secondary'}>
                  {credential.role}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                {credential.description}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-2 py-1 bg-muted rounded text-sm">
                    {credential.email}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(credential.email, `email-${index}`)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {copiedField === `email-${index}` && (
                    <span className="text-xs text-green-600">Copied!</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Password</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-2 py-1 bg-muted rounded text-sm">
                    {credential.password}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(credential.password, `password-${index}`)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  {copiedField === `password-${index}` && (
                    <span className="text-xs text-green-600">Copied!</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> This is a demo system with local authentication. 
            In production, use secure passwords and proper user management.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
