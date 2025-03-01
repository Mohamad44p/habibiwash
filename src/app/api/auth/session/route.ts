import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Secret key for JWT verification
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_jwt_secret_key_change_in_production"
);

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("admin-session");

    if (!sessionCookie?.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const verified = await jwtVerify(sessionCookie.value, JWT_SECRET);
    
    return NextResponse.json({
      authenticated: true,
      user: {
        email: verified.payload.email,
        role: verified.payload.role,
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
} 