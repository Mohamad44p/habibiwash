export interface DashboardStats {
  today: {
    bookings: number;
    revenue: number;
  };
  month: {
    bookings: number;
    revenue: number;
  };
  year: {
    bookings: number;
    revenue: number;
  };
  total: {
    bookings: number;
    revenue: number;
  };
  recentBookings: DashboardBooking[];
  monthlyRevenue: Array<{
    date: Date;
    _sum: { totalPrice: number | null };
  }>;
  popularPackages: Array<{
    packageId: string;
    _count: number;
  }>;
  servicesByVehicle: Array<{
    vehicleType: string;
    _count: number;
  }>;
  customerRetention: {
    repeatCustomers: number;
    totalCustomers: number;
  };
  satisfaction: {
    averageRating: number;
    totalReviews: number;
  };
  peakHours: Array<{
    time: string;
    _count: number;
  }>;
  servicePerformance: Array<{
    packageId: string;
    _count: number;
    _sum: { totalPrice: number };
  }>;
  addOnStats: {
    totalBookingsWithAddOns: number;
    addOnsPerBooking: number;
  };
  weeklyComparison: Array<{
    date: Date;
    revenue: number;
  }>;
}

export interface DashboardBooking {
  id: string;
  customerName: string;
  package: {
    name: string;
  };
  date: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  totalPrice: number;
}
