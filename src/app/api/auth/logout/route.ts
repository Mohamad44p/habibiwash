import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST() {
  try {
    // Create response
    const response = NextResponse.json({ success: true });

    // Delete cookie
    response.cookies.set({
      name: "admin-session",
      value: "",
      expires: new Date(0),
    });

    revalidatePath("/admin/dashboard");
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, error: "Logout failed" },
      { status: 500 }
    );
  }
} 