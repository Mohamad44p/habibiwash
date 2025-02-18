import { Resend } from 'resend';
import BookingConfirmationEmail from '@/emails/BookingConfirmation';
import { BookingData } from '@/components/booking/BookingFlow';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmationEmail(booking: BookingData, totalPrice: number) {
  try {
    await resend.emails.send({
      from: 'HabibiWash <bookings@habibiwash.com>',
      to: [booking.customerInfo?.email || ''],
      subject: 'Your HabibiWash Booking Confirmation',
      react: BookingConfirmationEmail({ booking, totalPrice }),
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
}
