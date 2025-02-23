import { Suspense } from 'react';
import { getDashboardStats } from "../actions/adminStatsActions";
import { updateDashboardDate } from "../actions/updateDashboardDate";
import { StatsCards } from "@/components/admin/dashboard/StatsCards";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { ServicePerformanceChart } from "@/components/admin/dashboard/ServicePerformanceChart";
import { CustomerInsights } from "@/components/admin/dashboard/CustomerInsights";
import { PeakHoursHeatmap } from "@/components/admin/dashboard/PeakHoursHeatmap";
import { PopularServices } from '@/components/admin/dashboard/PopularServices';
import { WeeklyComparisonChart } from "@/components/admin/dashboard/WeeklyComparisonChart";
import { AddOnPerformance } from "@/components/admin/dashboard/AddOnPerformance";
import { DashboardBookingsTable } from '@/components/admin/dashboard/DashboardBookingsTable';
import { DateRangePickerWrapper } from '@/components/admin/dashboard/DateRangePickerWrapper';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminDashboardPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const defaultDateRange = {
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  };

  const fromParam = searchParams?.from ? String(searchParams.from) : null;
  const toParam = searchParams?.to ? String(searchParams.to) : null;

  const dateRange = fromParam && toParam
    ? {
        from: new Date(fromParam),
        to: new Date(toParam)
      }
    : defaultDateRange;

  const stats = await getDashboardStats(dateRange);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <DateRangePickerWrapper onDateChange={updateDashboardDate} />
        </Suspense>
      </div>  
      
      <StatsCards stats={stats} />
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <RevenueChart data={stats.monthlyRevenue} />
        <ServicePerformanceChart data={stats.servicePerformance} />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <CustomerInsights 
          retention={stats.customerRetention}
          satisfaction={stats.satisfaction}
        />
        <PeakHoursHeatmap data={stats.peakHours} />
        <AddOnPerformance stats={stats.addOnStats} />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <WeeklyComparisonChart data={stats.weeklyComparison} />
        <PopularServices 
          packages={stats.popularPackages}
          vehicleStats={stats.servicesByVehicle}
        />
      </div>
      
      <DashboardBookingsTable bookings={stats.recentBookings} />
    </div>
  )
}
