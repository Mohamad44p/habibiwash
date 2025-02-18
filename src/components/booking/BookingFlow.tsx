"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Package } from "@/types/package";
import PackageSelection from "./steps/PackageSelection";
import { Steps } from "./Steps";
import VehicleSelection from "./steps/VehicleSelection";
import TimeSelection from "./steps/TimeSelection";
import AddOnsSelection from "./steps/AddOnsSelection";
import BookingForm from "./steps/BookingForm";
import BookingSummary from "./steps/BookingSummary";
import { useLocalStorage } from "@/lib/useLocalStorage";
import SubPackageSelection from "./steps/SubPackageSelection";

// Memoize each step component
const MemoizedPackageSelection = memo(PackageSelection);
const MemoizedVehicleSelection = memo(VehicleSelection);
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
    notes?: string;
  };
};

export default function BookingFlow({ initialPackages }: BookingFlowProps) {
  const STORAGE_KEY = "booking-flow-data";
  const [bookingData, setBookingData] = useLocalStorage<BookingData>(
    STORAGE_KEY,
    {},
    false
  );
  const [shouldSave, setShouldSave] = useState(false);

  const [currentStep, setCurrentStep] = useState(() => {
    if (!bookingData.selectedMainPackage) return 1;
    if (!bookingData.selectedSubPackage) return 2;
    if (!bookingData.vehicleType) return 3;
    if (!bookingData.selectedTime) return 4;
    if (bookingData.selectedAddOns === undefined) return 5;
    if (!bookingData.customerInfo) return 6;
    return 7;
  });

  const steps = useMemo(
    () => [
      { title: "Package", completed: !!bookingData.selectedMainPackage },
      { title: "Type", completed: !!bookingData.selectedSubPackage },
      { title: "Vehicle", completed: !!bookingData.vehicleType },
      { title: "Time", completed: !!bookingData.selectedTime },
      { title: "Add-ons", completed: bookingData.selectedAddOns !== undefined },
      { title: "Details", completed: !!bookingData.customerInfo },
      { title: "Summary", completed: false },
    ],
    [bookingData]
  );

  const totalPrice = useMemo(() => {
    if (
      !bookingData.selectedPackage ||
      !bookingData.selectedSubPackage ||
      !bookingData.vehicleType
    ) {
      return 0;
    }

    const subPackage = bookingData.selectedPackage.subPackages.find(
      (sp) => sp.id === bookingData.selectedSubPackage
    );

    const basePrice =
      subPackage?.prices.find(
        (p) =>
          p.vehicleType.toLowerCase() === bookingData.vehicleType?.toLowerCase()
      )?.price || 0;

    const addOnsTotal = (bookingData.selectedAddOns || []).reduce(
      (total, addOnId) => {
        const addOn = bookingData.selectedPackage?.addOns?.find(
          (addon) => addon.id === addOnId
        );
        return total + (addOn?.price || 0);
      },
      0
    );

    return basePrice + addOnsTotal;
  }, [bookingData]);

  const updateBookingData = useCallback(
    (updates: Partial<BookingData>) => {
      setBookingData((prev) => {
        const newData = { ...prev, ...updates };
        if (shouldSave) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        }
        return newData;
      });
    },
    [setBookingData, shouldSave]
  );

  const isStepValid = useCallback(
    (step: number): boolean => {
      switch (step) {
        case 1:
          return !!bookingData.selectedMainPackage;
        case 2:
          return !!bookingData.selectedSubPackage;
        case 3:
          return !!bookingData.vehicleType;
        case 4:
          return !!bookingData.selectedDate && !!bookingData.selectedTime;
        case 5:
          return true;
        case 6:
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
        setShouldSave(true); // Enable saving when navigating back
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
              onSelect={(subPkg) => {
                updateBookingData({ selectedSubPackage: subPkg });
                handleStepChange(3);
              }}
              onBack={() => handleStepChange(1)}
            />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div key="vehicle-selection-step" {...commonMotionProps}>
            <MemoizedVehicleSelection
              selected={bookingData.vehicleType}
              onSelect={(type) => {
                updateBookingData({ vehicleType: type });
                handleStepChange(4);
              }}
              onBack={() => handleStepChange(2)}
            />
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div key="time-selection-step" {...commonMotionProps}>
            <MemoizedTimeSelection
              selectedDate={bookingData.selectedDate}
              selectedTime={bookingData.selectedTime}
              onSelect={(date, time) => {
                updateBookingData({
                  selectedDate: date,
                  selectedTime: time,
                });
                handleStepChange(5);
              }}
              onBack={() => handleStepChange(3)}
            />
          </motion.div>
        )}

        {currentStep === 5 && (
          <motion.div key="addons-selection-step" {...commonMotionProps}>
            <MemoizedAddOnsSelection
              selectedAddOns={bookingData.selectedAddOns || []}
              onSelect={(addOns) => {
                updateBookingData({ selectedAddOns: addOns });
                handleStepChange(6);
              }}
              onBack={() => handleStepChange(4)}
            />
          </motion.div>
        )}

        {currentStep === 6 && (
          <motion.div key="booking-form-step" {...commonMotionProps}>
            <MemoizedBookingForm
              onSubmit={(customerInfo) => {
                updateBookingData({ customerInfo });
                handleStepChange(7);
              }}
              onBack={() => handleStepChange(5)}
              initialData={bookingData.customerInfo}
            />
          </motion.div>
        )}

        {currentStep === 7 && (
          <motion.div key="booking-summary-step" {...commonMotionProps}>
            <MemoizedBookingSummary
              bookingData={bookingData}
              onEdit={(step) => {
                setShouldSave(true);
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
