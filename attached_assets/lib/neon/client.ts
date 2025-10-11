// Mock authentication functions - no database required
// In production, replace with real database connection

const mockUsers = [
  {
    id: 1,
    email: "admin",
    name: "Admin User",
    role: "admin",
    status: "active",
    password: "admin",
  },
  {
    id: 2,
    email: "admin@ikk.vn",
    name: "Admin IKK",
    role: "admin",
    status: "active",
    password: "IKK@2024Admin",
  },
  {
    id: 3,
    email: "user",
    name: "Test User",
    role: "publisher",
    status: "active",
    password: "user",
  },
  {
    id: 4,
    email: "user@ikk.vn",
    name: "Publisher User",
    role: "publisher",
    status: "active",
    password: "user123",
  },
]

export async function createUser(email: string, password: string, name: string, role = "publisher") {
  // Check if user already exists
  const existingUser = mockUsers.find((u) => u.email === email)
  if (existingUser) {
    throw new Error("User already exists")
  }

  // Create new user
  const newUser = {
    id: mockUsers.length + 1,
    email,
    name,
    role: email === "admin@ikk.vn" ? "admin" : role,
    status: "active" as const,
    password,
  }

  mockUsers.push(newUser)

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    status: newUser.status,
  }
}

export async function authenticateUser(email: string, password: string) {
  const user = mockUsers.find((u) => u.email === email && u.password === password && u.status === "active")

  if (!user) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
  }
}

export async function getUserByEmail(email: string) {
  const user = mockUsers.find((u) => u.email === email)

  if (!user) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
  }
}

// Mock SQL export for compatibility
export const sql = null
