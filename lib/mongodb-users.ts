import { ObjectId } from 'mongodb'
import { getUsersCollection } from './mongodb'
import bcrypt from 'bcryptjs'

export interface User {
  _id?: ObjectId
  id?: string
  name: string
  email: string
  password: string
  role: 'admin' | 'operator' | 'user'
  createdAt: string
  lastLogin?: string
}

export interface UserWithoutPassword extends Omit<User, 'password'> {}

export class MongoUserDatabase {
  
  // Get all users
  static async getUsers(): Promise<UserWithoutPassword[]> {
    try {
      const collection = await getUsersCollection()
      const users = await collection.find({}).toArray()
      return users.map(user => {
        const { password, ...userWithoutPassword } = user
        return {
          ...userWithoutPassword,
          id: user._id.toString()
        }
      })
    } catch (error) {
      console.error('Error getting users:', error)
      return []
    }
  }

  // Find user by email
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const collection = await getUsersCollection()
      const user = await collection.findOne({ email })
      if (user) {
        return {
          ...user,
          id: user._id.toString()
        }
      }
      return null
    } catch (error) {
      console.error('Error finding user by email:', error)
      return null
    }
  }

  // Find user by ID
  static async findById(id: string): Promise<UserWithoutPassword | null> {
    try {
      const collection = await getUsersCollection()
      const user = await collection.findOne({ _id: new ObjectId(id) })
      if (user) {
        const { password, ...userWithoutPassword } = user
        return {
          ...userWithoutPassword,
          id: user._id.toString()
        }
      }
      return null
    } catch (error) {
      console.error('Error finding user by ID:', error)
      return null
    }
  }

  // Add new user
  static async addUser(userData: Omit<User, '_id' | 'id'>): Promise<User | null> {
    try {
      const collection = await getUsersCollection()
      
      // Check if user already exists
      const existingUser = await collection.findOne({ email: userData.email })
      if (existingUser) {
        throw new Error('User already exists with this email')
      }

      const result = await collection.insertOne(userData)
      const newUser = await collection.findOne({ _id: result.insertedId })
      
      if (newUser) {
        return {
          ...newUser,
          id: newUser._id.toString()
        }
      }
      return null
    } catch (error) {
      console.error('Error adding user:', error)
      throw error
    }
  }

  // Update user
  static async updateUser(id: string, updates: Partial<User>): Promise<UserWithoutPassword | null> {
    try {
      const collection = await getUsersCollection()
      
      // Remove id from updates if present
      const { id: _, _id, ...updateData } = updates as any
      
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      )

      if (result.modifiedCount > 0) {
        const updatedUser = await collection.findOne({ _id: new ObjectId(id) })
        if (updatedUser) {
          const { password, ...userWithoutPassword } = updatedUser
          return {
            ...userWithoutPassword,
            id: updatedUser._id.toString()
          }
        }
      }
      return null
    } catch (error) {
      console.error('Error updating user:', error)
      return null
    }
  }

  // Delete user
  static async deleteUser(id: string): Promise<boolean> {
    try {
      const collection = await getUsersCollection()
      const result = await collection.deleteOne({ _id: new ObjectId(id) })
      return result.deletedCount > 0
    } catch (error) {
      console.error('Error deleting user:', error)
      return false
    }
  }

  // Verify password
  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword)
    } catch (error) {
      console.error('Error verifying password:', error)
      return false
    }
  }

  // Hash password
  static async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 12)
    } catch (error) {
      console.error('Error hashing password:', error)
      throw error
    }
  }

  // Initialize default users (run once)
  static async initializeDefaultUsers(): Promise<void> {
    try {
      const collection = await getUsersCollection()
      const userCount = await collection.countDocuments()
      
      if (userCount === 0) {
        const defaultUsers = [
          {
            name: "Admin User",
            email: "admin@drainage.com",
            password: await this.hashPassword("password"),
            role: "admin" as const,
            createdAt: new Date().toISOString()
          },
          {
            name: "Operator User", 
            email: "operator@drainage.com",
            password: await this.hashPassword("password"),
            role: "operator" as const,
            createdAt: new Date().toISOString()
          },
          {
            name: "John Doe",
            email: "john@drainage.com", 
            password: await this.hashPassword("password"),
            role: "user" as const,
            createdAt: new Date().toISOString()
          }
        ]

        await collection.insertMany(defaultUsers)
        console.log('Default users initialized in MongoDB')
      }
    } catch (error) {
      console.error('Error initializing default users:', error)
    }
  }
}

// Demo credentials for easy testing
export const demoCredentials = {
  admin: {
    email: "admin@drainage.com",
    password: "password",
    role: "admin"
  },
  operator: {
    email: "operator@drainage.com", 
    password: "password",
    role: "operator"
  },
  user: {
    email: "john@drainage.com",
    password: "password", 
    role: "user"
  }
}
