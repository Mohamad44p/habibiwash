"use server";

import db from "../db/db";
import type { DashboardStats } from "@/types/dashboard";
import { DateRange } from "react-day-picker";

export async function getDashboardStats(dateRange?: DateRange): Promise<DashboardStats> {
  const startDate = dateRange?.from || new Date(new Date().setDate(new Date().getDate() - 30));
  const endDate = dateRange?.to || new Date();

  // Ensure the dates are at the start and end of the day
  const startDateTime = new Date(startDate.setHours(0, 0, 0, 0));
  const endDateTime = new Date(endDate.setHours(23, 59, 59, 999));

  const [
    todayBookings,
    monthBookings,
    yearBookings,
    totalBookings,
    recentBookings,
    customerSatisfaction 
  ] = await Promise.all([
    db.booking.aggregate({
      where: { 
        createdAt: { 
          gte: startDateTime,
          lte: endDateTime
        } 
      },
      _count: true,
      _sum: { totalPrice: true }
    }),
    db.booking.aggregate({
      where: { 
        createdAt: { 
          gte: startDateTime,
          lte: endDateTime
        } 
      },
      _count: true,
      _sum: { totalPrice: true }
    }),
    db.booking.aggregate({
      where: { 
        createdAt: { 
          gte: startDateTime,
          lte: endDateTime
        } 
      },
      _count: true,
      _sum: { totalPrice: true }
    }),
    db.booking.aggregate({
      where: { 
        createdAt: { 
          gte: startDateTime,
          lte: endDateTime
        } 
      },
      _count: true,
      _sum: { totalPrice: true }
    }),
    db.booking.findMany({
      where: { 
        createdAt: { 
          gte: startDateTime,
          lte: endDateTime
        } 
      },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { package: true }
    }),
    db.testimonial.aggregate({
      where: { 
        createdAt: { 
          gte: startDateTime,
          lte: endDateTime
        } 
      },
      _avg: {
        rating: true
      },
      _count: true
    })
  ]);

  const peakHours = await db.booking.groupBy({
    by: ['time'],
    where: { 
      createdAt: { 
        gte: startDateTime,
        lte: endDateTime
      } 
    },
    _count: true,
    orderBy: {
      time: 'asc'
    }
  });

  const customerRetention = await db.booking.groupBy({
    by: ['customerEmail'],
    where: { 
      createdAt: { 
        gte: startDateTime,
        lte: endDateTime
      } 
    },
    _count: true,
    having: {
      customerEmail: {
        _count: {
          gt: 1
        }
      }
    }
  });

  const servicePerformance = await db.booking.groupBy({
    by: ['packageId'],
    where: {
      status: 'COMPLETED',
      createdAt: { 
        gte: startDateTime,
        lte: endDateTime
      } 
    },
    _count: true,
    _sum: {
      totalPrice: true
    }
  });

  const vehicleTypeStats = await db.booking.groupBy({
    by: ['vehicleType'],
    where: { 
      createdAt: { 
        gte: startDateTime,
        lte: endDateTime
      } 
    },
    _count: true
  });

  const weeklyComparison = await db.booking.groupBy({
    by: ['date'],
    where: {
      date: {
        gte: new Date(new Date().setDate(new Date().getDate() - 14)),
        lte: endDateTime
      }
    },
    _sum: {
      totalPrice: true
    },
    orderBy: {
      date: 'asc'
    }
  });

  const addOnStats = await db.booking.aggregate({
    where: {
      addOns: {
        some: {}
      },
      createdAt: { 
        gte: startDateTime,
        lte: endDateTime
      } 
    },
    _count: true,
    _avg: {
      totalPrice: true
    }
  });

  return {
    today: {
      bookings: todayBookings._count,
      revenue: todayBookings._sum.totalPrice || 0
    },
    month: {
      bookings: monthBookings._count,
      revenue: monthBookings._sum.totalPrice || 0
    },
    year: {
      bookings: yearBookings._count,
      revenue: yearBookings._sum.totalPrice || 0
    },
    total: {
      bookings: totalBookings._count,
      revenue: totalBookings._sum.totalPrice || 0
    },
    recentBookings: recentBookings.map(booking => ({
      id: booking.id,
      customerName: booking.customerName,
      package: { name: booking.package.name },
      date: booking.date.toISOString(),
      status: booking.status,
      totalPrice: booking.totalPrice
    })),
    peakHours: peakHours.map(hour => ({
      time: hour.time,
      _count: hour._count
    })),
    servicePerformance: servicePerformance.map(item => ({
      packageId: item.packageId,
      _count: item._count,
      _sum: { totalPrice: item._sum?.totalPrice || 0 }
    })),
    customerRetention: {
      repeatCustomers: customerRetention.length,
      totalCustomers: await db.booking.groupBy({
        by: ['customerEmail'],
        where: { 
          createdAt: { 
            gte: startDateTime,
            lte: endDateTime
          } 
        },
        _count: true
      }).then(result => result.length)
    },
    vehicleStats: vehicleTypeStats.map(stat => ({
      vehicleType: stat.vehicleType,
      count: stat._count
    })),
    addOnStats: {
      totalBookingsWithAddOns: addOnStats._count,
      addOnsPerBooking: addOnStats._count > 0 ? addOnStats._avg?.totalPrice || 0 : 0
    },
    weeklyComparison: weeklyComparison.map(day => ({
      date: day.date,
      revenue: day._sum?.totalPrice ?? 0 
    })),
    monthlyRevenue: weeklyComparison,
    popularPackages: servicePerformance.map(item => ({
      packageId: item.packageId,
      _count: item._count
    })),
    servicesByVehicle: vehicleTypeStats.map(stat => ({
      vehicleType: stat.vehicleType,
      _count: stat._count
    })),
    satisfaction: {
      averageRating: customerSatisfaction._avg?.rating || 0,
      totalReviews: customerSatisfaction._count || 0
    }
  } as DashboardStats;
}
