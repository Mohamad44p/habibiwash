"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface AddOnPerformanceProps {
  stats: {
    totalBookingsWithAddOns: number;
    addOnsPerBooking: number;  // Changed to match the data structure
  };
}

export function AddOnPerformance({ stats }: AddOnPerformanceProps) {
  const percentage = (stats.addOnsPerBooking * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add-On Performance</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-40 h-40">
          <CircularProgressbar
            value={Number(percentage)}
            text={`${percentage}%`}
            styles={buildStyles({
              pathColor: '#8884d8',
              textColor: '#8884d8',
              trailColor: '#d6d6d6',
            })}
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Average add-ons per booking
          </p>
          <p className="text-lg font-semibold mt-1">
            {stats.totalBookingsWithAddOns} bookings with add-ons
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
