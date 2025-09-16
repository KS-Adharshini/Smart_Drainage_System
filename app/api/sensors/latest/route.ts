import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock sensor data
const mockSensorData = [
  {
    zoneId: "Zone-A1",
    waterLevel: 25,
    status: 'active',
    lastUpdate: "2 min ago",
    timestamp: new Date().toISOString()
  },
  {
    zoneId: "Zone-B2", 
    waterLevel: 65,
    status: 'inactive',
    lastUpdate: "1 min ago",
    timestamp: new Date().toISOString()
  },
  {
    zoneId: "Zone-C3",
    waterLevel: 85,
    status: 'inactive', 
    lastUpdate: "3 min ago",
    timestamp: new Date().toISOString()
  },
  {
    zoneId: "Zone-D4",
    waterLevel: 45,
    status: 'inactive',
    lastUpdate: "15 min ago",
    timestamp: new Date().toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    // Verify token
    try {
      jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      )
    }

    // Return sensor data
    return NextResponse.json(mockSensorData)

  } catch (error) {
    console.error("Sensor data error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
