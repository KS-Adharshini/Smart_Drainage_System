import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { userDatabase, User } from "@/lib/users"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = userDatabase.findByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 12)

    // Create user
    const newUser: User = {
      id: userDatabase.generateId(),
      name,
      email,
      password: hashedPassword,
      role: 'user', // Default role for new registrations
      createdAt: new Date().toISOString()
    }

    // Add user to database
    const user = userDatabase.addUser(newUser)

    // Generate JWT token with enhanced payload
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      },
      process.env.JWT_SECRET || "drainage-system-secret-key-2024",
      { expiresIn: "24h" }
    )

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: {
        ...userWithoutPassword,
        lastLogin: new Date().toISOString()
      },
      token,
      expiresIn: "24h"
    })

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
