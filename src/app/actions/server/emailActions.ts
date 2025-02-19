"use server";

import { Resend } from "resend";
import BookingConfirmationEmail from "@/emails/BookingConfirmation";
import { BookingData } from "@/components/booking/BookingFlow";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "habibiwash99@gmail.com";

export async function sendBookingConfirmationEmail(
  booking: BookingData,
  totalPrice: number
) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (
    !booking.selectedPackage ||
    !booking.selectedSubPackage ||
    !booking.vehicleType
  ) {
    throw new Error("Missing required booking information");
  }

  try {
    // Send email to customer
    const customerEmail = await resend.emails.send({
      from: "HabibiWash <bookings@habibiwash.com>",
      to: [booking.customerInfo?.email || ""],
      subject: "Your HabibiWash Booking Confirmation",
      react: BookingConfirmationEmail({
        booking: {
          ...booking,
          selectedDate: booking.selectedDate
            ? new Date(booking.selectedDate)
            : undefined,
        },
        totalPrice,
      }),
    });

    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: "HabibiWash Bookings <bookings@habibiwash.com>",
      to: [ADMIN_EMAIL],
      subject: "New Booking Received - HabibiWash",
      react: BookingConfirmationEmail({
        booking: {
          ...booking,
          selectedDate: booking.selectedDate
            ? new Date(booking.selectedDate)
            : undefined,
        },
        totalPrice,
        isAdminNotification: true,
      }),
    });

    if (customerEmail.error || adminEmail.error) {
      console.error("Resend API error:", customerEmail.error || adminEmail.error);
      throw customerEmail.error || adminEmail.error;
    }

    return { success: true, customerMessageId: customerEmail.data?.id, adminMessageId: adminEmail.data?.id };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw new Error("Failed to send confirmation email");
  }
}
