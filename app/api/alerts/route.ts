import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock alerts data
const mockAlerts = [
  {
    id: "1",
    message: "Water level critical in drainage zone A1",
    severity: 'critical',
    zoneId: "Zone-A1", 
    timestamp: "2024-01-15T14:30:00.000Z"
  },
  {
    id: "2",
    message: "Sensor connectivity issue detected",
    severity: 'high',
    zoneId: "Zone-D4",
    timestamp: "2024-01-15T14:15:00.000Z"
  },
  {
    id: "3",
    message: "Water level approaching high threshold",
    severity: 'medium',
    zoneId: "Zone-B2",
    timestamp: "2024-01-15T13:45:00.000Z"
  },
  {
    id: "4",
    message: "Routine maintenance reminder",
    severity: 'low',
    zoneId: "Zone-C3",
    timestamp: "2024-01-15T12:00:00.000Z"
  },
  {
    id: "5",
    message: "Water level normalized after heavy rain",
    severity: 'low',
    zoneId: "Zone-E5",
    timestamp: "2024-01-15T11:30:00.000Z"
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

    // Return alerts data
    return NextResponse.json(mockAlerts)

  } catch (error) {
    console.error("Alerts error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
