"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { authenticateUser, createUser } from "@/lib/neon/client"

export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const user = await authenticateUser(email.toString(), password.toString())

    if (!user) {
      return { error: "Invalid login credentials" }
    }

    const cookieStore = cookies()
    cookieStore.set(
      "session",
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    )

    console.log("User logged in:", user.email, "Role:", user.role)
    return { success: true, role: user.role }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const name = formData.get("name") || email?.toString().split("@")[0] || "User"

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const role = email.toString() === "admin@ikk.vn" ? "admin" : "publisher"

    const user = await createUser(email.toString(), password.toString(), name.toString(), role)

    if (!user) {
      return { error: "Failed to create account" }
    }

    const cookieStore = cookies()
    cookieStore.set(
      "session",
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    )

    return { success: "Account created successfully!" }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  const cookieStore = cookies()
  cookieStore.delete("session")
  redirect("/auth/login")
}

export async function getSession() {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    return JSON.parse(sessionCookie.value)
  } catch {
    return null
  }
}
