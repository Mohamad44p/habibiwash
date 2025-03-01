import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { revalidatePath } from "next/cache";

// Static admin credentials
const ADMIN_EMAIL = "habibiwash@admin.com";
const ADMIN_PASSWORD = "habibiwashAdmin404";

// Secret key for JWT signing
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_jwt_secret_key_change_in_production"
);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session token
    const token = await new SignJWT({ email, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h") // Token expires in 8 hours
      .sign(JWT_SECRET);

    // Create response with cookie
    const response = NextResponse.json({ success: true });

    // Set cookie
    response.cookies.set({
      name: "admin-session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
      sameSite: "lax",
    });

    revalidatePath("/admin/dashboard");
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
} 