import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { userDatabase } from "@/lib/users"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }
    
    // Ensure data directory exists
    const fs = require('fs');
    const path = require('path');
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Find user
    const user = userDatabase.findByEmail(email)
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Check password - handle demo users with hardcoded password
    const demoUsers = ['admin@drainage.com', 'operator@drainage.com', 'john@drainage.com'];
    let passwordMatch = false;
    
    if (demoUsers.includes(email) && password === 'password') {
      // For demo users, allow login with 'password'
      passwordMatch = true;
    } else {
      // For regular users, check with bcrypt
      try {
        passwordMatch = bcrypt.compareSync(password, user.password);
      } catch (error) {
        console.error('Password comparison error:', error);
      }
    }

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Generate JWT token with more user info
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
      message: "Login successful",
      user: {
        ...userWithoutPassword,
        lastLogin: new Date().toISOString()
      },
      token,
      expiresIn: "24h"
    })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
