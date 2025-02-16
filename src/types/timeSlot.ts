export type TimeSlot = {
  id?: string;
  date: Date;
  startTime: string;
  endTime: string;
  createdAt?: Date;
  updatedAt?: Date;
  isBooked?: boolean;
};

export type PrismaTimeSlot = {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
  isBooked?: boolean;
};

export function normalizeTimeSlot(prismaTimeSlot: PrismaTimeSlot): TimeSlot {
  return {
    id: prismaTimeSlot.id,
    date: prismaTimeSlot.date,
    startTime: prismaTimeSlot.startTime,
    endTime: prismaTimeSlot.endTime,
    createdAt: prismaTimeSlot.createdAt,
    updatedAt: prismaTimeSlot.updatedAt,
    isBooked: prismaTimeSlot.isBooked || false,
  };
}
