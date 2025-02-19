import { NextResponse } from "next/server";
import db from "@/app/db/db";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const booking = await db.booking.findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        totalPrice: true,
        customerName: true,
        customerEmail: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
