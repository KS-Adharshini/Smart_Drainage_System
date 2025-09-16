// Local user database - No MongoDB required
// File-based user storage for authentication system
import fs from 'fs'
import path from 'path'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'operator' | 'user'
  createdAt: string
  lastLogin?: string
}

// Pre-defined users with hashed passwords (password: "password")
const initialUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@drainage.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "admin",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Operator User",
    email: "operator@drainage.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "operator",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@drainage.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "user",
    createdAt: new Date().toISOString()
  }
]

// File-based user storage path
const USERS_FILE_PATH = path.join(process.cwd(), 'data', 'users.json')

// Ensure data directory exists
if (!fs.existsSync(path.dirname(USERS_FILE_PATH))) {
  fs.mkdirSync(path.dirname(USERS_FILE_PATH), { recursive: true })
}

// Load users from file or initialize with default users
const loadUsers = (): User[] => {
  try {
    if (fs.existsSync(USERS_FILE_PATH)) {
      const fileContent = fs.readFileSync(USERS_FILE_PATH, 'utf-8')
      return JSON.parse(fileContent)
    }
  } catch (error) {
    console.error('Error loading users from file:', error)
  }
  return [...initialUsers]
}

// Save users to file
const saveUsers = (users: User[]): void => {
  try {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error saving users to file:', error)
  }
}

// Initialize users from file
let users: User[] = loadUsers()

export const userDatabase = {
  // Get all users
  getUsers: (): User[] => users,
  
  // Find user by email
  findByEmail: (email: string): User | undefined => {
    return users.find(user => user.email === email)
  },
  
  // Find user by ID
  findById: (id: string): User | undefined => {
    return users.find(user => user.id === id)
  },
  
  // Add new user
  addUser: (user: User): User => {
    users.push(user)
    saveUsers(users)
    return user
  },
  
  // Update user
  updateUser: (id: string, updates: Partial<User>): User | null => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return null
    
    users[userIndex] = { ...users[userIndex], ...updates }
    saveUsers(users)
    return users[userIndex]
  },
  
  // Delete user
  deleteUser: (id: string): boolean => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return false
    
    users.splice(userIndex, 1)
    saveUsers(users)
    return true
  },
  
  // Generate unique ID
  generateId: (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
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
