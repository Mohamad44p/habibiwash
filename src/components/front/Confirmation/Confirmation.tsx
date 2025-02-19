"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

interface ConfirmationProps {
  params: { id: string };
}

interface BookingDetails {
  id: string;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
}

async function getBookingDetails(id: string): Promise<BookingDetails | null> {
  try {
    const response = await fetch(`/api/bookings/${id}`);
    if (!response.ok) throw new Error("Failed to fetch booking");
    return response.json();
  } catch (error) {
    console.error("Error fetching booking:", error);
    return null;
  }
}

export default function SuccessPage({ params }: ConfirmationProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent bookingId={params.id} />
    </Suspense>
  );
}

interface SuccessContentProps {
  bookingId: string;
}

function SuccessContent({ bookingId }: SuccessContentProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const details = await getBookingDetails(bookingId);
      if (details) {
        setBooking(details);
      }
    };

    if (mounted) {
      fetchBookingDetails();
    }
  }, [bookingId, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !booking) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="container"
      >
        <Card className="p-8 md:p-12 max-w-lg mx-auto space-y-6 shadow-xl">
          <div className="flex flex-col items-center space-y-4">
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
            <h2 className="text-3xl font-bold text-center">
              Booking Confirmed!
            </h2>
            <p className="text-muted-foreground text-center">
              Your booking with ID{" "}
              <span className="font-semibold">{bookingId}</span> has been
              successfully created.
            </p>
            <p className="text-muted-foreground text-center">
              You will receive an email with the details of your appointment.
            </p>
            <p className="text-2xl font-bold text-primary">
              Total Price: ${booking.totalPrice.toFixed(2)}
            </p>
          </div>
          <Button onClick={() => router.push("/")} className="w-full">
            Back to Home
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
