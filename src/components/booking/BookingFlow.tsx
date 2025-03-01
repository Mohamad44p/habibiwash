"use client";

import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Package } from "@/types/package";
import PackageSelection from "./steps/PackageSelection";
import { Steps } from "./Steps";
import TimeSelection from "./steps/TimeSelection";
import AddOnsSelection from "./steps/AddOnsSelection";
import BookingForm from "./steps/BookingForm";
import BookingSummary from "./steps/BookingSummary";
import SubPackageSelection from "./steps/SubPackageSelection";

const MemoizedPackageSelection = memo(PackageSelection);
const MemoizedTimeSelection = memo(TimeSelection);
const MemoizedAddOnsSelection = memo(AddOnsSelection);
const MemoizedBookingForm = memo(BookingForm);
const MemoizedBookingSummary = memo(BookingSummary);

interface BookingFlowProps {
  initialPackages: Package[];
}

export type BookingData = {
  selectedMainPackage?: Package;
  selectedPackage?: Package;
  selectedSubPackage?: string;
  vehicleType?: string;
  selectedDate?: Date;
  selectedTime?: string;
  selectedAddOns?: string[];
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    notes?: string;
  };
};

export default function BookingFlow({ initialPackages }: BookingFlowProps) {
  const [bookingData, setBookingData] = useState<BookingData>({});

  const [currentStep, setCurrentStep] = useState(() => {
    if (!bookingData.selectedMainPackage) return 1; // Package
    if (!bookingData.selectedSubPackage) return 2; // Type
    if (!bookingData.selectedTime) return 3;    // Time
    if (bookingData.selectedAddOns === undefined) return 4; // Add-ons
    if (!bookingData.customerInfo) return 5;    // Details
    return 6; // Summary
  });

  const steps = useMemo(
    () => [
      { title: "Package", completed: !!bookingData.selectedMainPackage },
      { title: "Type", completed: !!bookingData.selectedSubPackage && !!bookingData.vehicleType },
      { title: "Time", completed: !!bookingData.selectedDate && !!bookingData.selectedTime },
      { title: "Add-ons", completed: bookingData.selectedAddOns !== undefined },
      { title: "Details", completed: !!bookingData.customerInfo },
      { title: "Summary", completed: false },
    ],
    [bookingData]
  );

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = async () => {
      if (!bookingData.selectedPackage || !bookingData.selectedSubPackage || !bookingData.vehicleType) {
        setTotalPrice(0);
        return;
      }

      const subPackage = bookingData.selectedPackage.subPackages.find(
        (sp) => sp.id === bookingData.selectedSubPackage
      );

      if (!subPackage) {
        setTotalPrice(0);
        return;
      }

      const basePrice = subPackage.prices.find(
        (p) => p.vehicleType.toLowerCase() === bookingData.vehicleType?.toLowerCase()
      )?.price || 0;

      const addOnsResponse = await fetch('/api/addons/prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addonIds: bookingData.selectedAddOns || []
        }),
      });

      const addOnsData = await addOnsResponse.json();
      const addOnsTotal = addOnsData.total || 0;

      setTotalPrice(basePrice + addOnsTotal);
    };

    calculateTotalPrice();
  }, [bookingData.selectedPackage, bookingData.selectedSubPackage, bookingData.vehicleType, bookingData.selectedAddOns]);

  const updateBookingData = useCallback(
    (updates: Partial<BookingData>) => {
      setBookingData((prev) => ({ ...prev, ...updates }));
    },
    [setBookingData]
  );

  const isStepValid = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 1:
          return !!bookingData.selectedMainPackage;
        case 2:
          return !!bookingData.selectedSubPackage && !!bookingData.vehicleType;
        case 3:
          return !!bookingData.selectedDate && !!bookingData.selectedTime;
        case 4:
          return true; // Add-ons are optional
        case 5:
          return !!bookingData.customerInfo?.name;
        default:
          return false;
      }
    },
    [bookingData]
  );

  const handleStepChange = useCallback(
    (newStep: number) => {
      if (newStep <= currentStep || isStepValid(currentStep)) {
        setCurrentStep(newStep);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [currentStep, isStepValid]
  );

  const commonMotionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
    className: "mt-12",
  };

  return (
    <div className="w-full max-w-7xl px-4 py-8 mx-auto">
      <Steps
        currentStep={currentStep}
        steps={steps}
        onStepClick={handleStepChange}
        className="sticky top-0 bg-background/95 backdrop-blur-sm z-50 py-4"
      />

      <AnimatePresence mode="wait" initial={false}>
        {currentStep === 1 && (
          <motion.div key="package-selection-step" {...commonMotionProps}>
            <MemoizedPackageSelection
              packages={initialPackages}
              selected={bookingData.selectedMainPackage}
              onSelect={(pkg) => {
                updateBookingData({
                  selectedMainPackage: pkg,
                  selectedPackage: pkg,
                });
                handleStepChange(2);
              }}
            />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div key="sub-package-selection-step" {...commonMotionProps}>
            <SubPackageSelection
              mainPackage={bookingData.selectedMainPackage}
              selected={bookingData.selectedSubPackage}
              onSelect={(subPkg, vehicleType) => {
                if (subPkg && vehicleType) {
                  updateBookingData({ 
                    selectedSubPackage: subPkg,
                    vehicleType: vehicleType 
                  });
                  handleStepChange(3);
                }
              }}
              onBack={() => handleStepChange(1)}
            />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div key="time-selection-step" {...commonMotionProps}>
            <MemoizedTimeSelection
              selectedDate={bookingData.selectedDate}
              selectedTime={bookingData.selectedTime}
              onSelect={(date, time) => {
                updateBookingData({
                  selectedDate: date,
                  selectedTime: time,
                });
                handleStepChange(4);
              }}
              onBack={() => handleStepChange(2)}
            />
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div key="addons-selection-step" {...commonMotionProps}>
            <MemoizedAddOnsSelection
              selectedAddOns={bookingData.selectedAddOns || []}
              onSelect={(addOns) => {
                updateBookingData({ selectedAddOns: addOns });
                handleStepChange(5);
              }}
              onBack={() => handleStepChange(3)}
            />
          </motion.div>
        )}

        {currentStep === 5 && (
          <motion.div key="booking-form-step" {...commonMotionProps}>
            <MemoizedBookingForm
              onSubmit={(customerInfo) => {
                updateBookingData({ customerInfo });
                handleStepChange(6);
              }}
              onBack={() => handleStepChange(4)}
              initialData={bookingData.customerInfo ? {
                name: bookingData.customerInfo.name,
                email: bookingData.customerInfo.email,
                phone: bookingData.customerInfo.phone,
                street: bookingData.customerInfo.street || "",
                city: bookingData.customerInfo.city || "",
                state: bookingData.customerInfo.state || "",
                zipCode: bookingData.customerInfo.zipCode || "",
                country: bookingData.customerInfo.country || "United States",
                notes: bookingData.customerInfo.notes
              } : undefined}
            />
          </motion.div>
        )}

        {currentStep === 6 && (
          <motion.div key="booking-summary-step" {...commonMotionProps}>
            <MemoizedBookingSummary
              bookingData={bookingData}
              onEdit={(step) => {
                setCurrentStep(step);
              }}
              totalPrice={totalPrice}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
