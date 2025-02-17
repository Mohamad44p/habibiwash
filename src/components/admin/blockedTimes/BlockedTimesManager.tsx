"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { createBlockedTime, deleteBlockedTime } from "@/app/actions/blockedTimesActions";
import { format } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BlockedTimesManager({ initialBlockedTimes }: { initialBlockedTimes: any[] }) {
  const [blockedTimes, setBlockedTimes] = useState(initialBlockedTimes);
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isFullDay, setIsFullDay] = useState(false);
  const [reason, setReason] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBlockedTime = await createBlockedTime({
      date: date,
      startTime: isFullDay ? undefined : startTime,
      endTime: isFullDay ? undefined : endTime,
      isFullDay,
      reason
    });
    setBlockedTimes([newBlockedTime, ...blockedTimes]);
    // Reset form
    setDate(undefined);
    setStartTime("");
    setEndTime("");
    setIsFullDay(false);
    setReason("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isFullDay}
                onCheckedChange={setIsFullDay}
              />
              <label className="text-sm font-medium">Block Full Day</label>
            </div>

            {!isFullDay && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Time</label>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason (Optional)</label>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for blocking"
              />
            </div>

            <Button
              type="submit"
              disabled={!date || (!isFullDay && (!startTime || !endTime))}
            >
              Add Blocked Time
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Current Blocked Times</h2>
        <div className="grid gap-4">
          {blockedTimes.map((block) => (
            <div
              key={block.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">
                  {format(new Date(block.date), "MMMM d, yyyy")}
                  {!block.isFullDay && ` (${block.startTime} - ${block.endTime})`}
                </p>
                {block.reason && (
                  <p className="text-sm text-muted-foreground">{block.reason}</p>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  await deleteBlockedTime(block.id);
                  setBlockedTimes(blockedTimes.filter((bt) => bt.id !== block.id));
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
