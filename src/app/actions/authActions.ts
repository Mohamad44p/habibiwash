"use server"

import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { revalidatePath } from "next/cache"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_jwt_secret_key_change_in_production"
)

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()
    
    if (response.ok) {
      revalidatePath("/admin/dashboard")
      return { success: true }
    } else {
      return { success: false, error: data.error || "Authentication failed" }
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Authentication failed" }
  }
}

export async function logout() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/auth/logout`, {
      method: 'POST',
    })

    if (response.ok) {
      revalidatePath("/admin/dashboard")
      return { success: true }
    } else {
      return { success: false, error: "Logout failed" }
    }
  } catch (error) {
    console.error("Logout error:", error)
    return { success: false, error: "Logout failed" }
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin-session")
    
    if (!sessionCookie?.value) {
      return null
    }

    const verified = await jwtVerify(sessionCookie.value, JWT_SECRET)
    return verified.payload
  } catch (error) {
    console.error("Session verification error:", error)
    return null
  }
} 