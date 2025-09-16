import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database for sensor data
const sensorReadings: any[] = []

export async function POST(request: NextRequest) {
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

    const { zoneId, waterLevel, sensorStatus } = await request.json()

    // Validation
    if (!zoneId || waterLevel === undefined) {
      return NextResponse.json(
        { message: "Zone ID and water level are required" },
        { status: 400 }
      )
    }

    if (waterLevel < 0 || waterLevel > 100) {
      return NextResponse.json(
        { message: "Water level must be between 0 and 100" },
        { status: 400 }
      )
    }

    // Create sensor reading
    const reading = {
      id: Date.now().toString(),
      zoneId,
      waterLevel,
      sensorStatus: sensorStatus || 'active',
      timestamp: new Date().toISOString()
    }

    sensorReadings.push(reading)

    // Check if alert should be triggered
    let alertTriggered = false
    if (waterLevel > 80) {
      alertTriggered = true
      // In a real app, you would save this alert to the database
      // and potentially send notifications
    }

    return NextResponse.json({
      message: "Sensor data recorded successfully",
      reading,
      alertTriggered
    })

  } catch (error) {
    console.error("Sensor data error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
