'use server'

import { Resend } from 'resend';
import BookingConfirmationEmail from '@/emails/BookingConfirmation';
import { BookingData } from '@/components/booking/BookingFlow';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmationEmail(booking: BookingData, totalPrice: number) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  // Ensure all necessary data is present
  if (!booking.selectedPackage || !booking.selectedSubPackage || !booking.vehicleType) {
    throw new Error('Missing required booking information');
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'HabibiWash <bookings@habibiwash.com>',
      to: [booking.customerInfo?.email || ''],
      subject: 'Your HabibiWash Booking Confirmation',
      react: BookingConfirmationEmail({ 
        booking: {
          ...booking,
          selectedDate: booking.selectedDate ? new Date(booking.selectedDate) : undefined
        }, 
        totalPrice 
      }),
    });

    if (error) {
      console.error('Resend API error:', error);
      throw error;
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
}
