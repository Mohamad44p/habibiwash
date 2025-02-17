"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { BookingData } from "@/components/booking/BookingFlow";

interface ConfirmationProps {
  params: { id: string }
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bookingData, setBookingData] = useLocalStorage<BookingData>(
    "booking-flow-data",
    {}
  );

  const totalPrice = useMemo(() => {
    let price =
      bookingData.selectedPackage?.subPackages.find(
        (sp) => sp.id === bookingData.selectedSubPackage
      )?.prices[0].price || 0;

    if (bookingData.selectedAddOns && bookingData.selectedPackage?.addOns) {
      bookingData.selectedAddOns.forEach((addOnId) => {
        const addOnPrice =
          bookingData.selectedPackage?.addOns?.find(
            (addOn) => addOn.id === addOnId
          )?.price || 0;
        price += addOnPrice;
      });
    }

    return price;
  }, [bookingData]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.removeItem("booking-flow-data");
    }
  }, [mounted]);

  if (!mounted) {
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
              Total Price: ${totalPrice?.toFixed(2)}
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
