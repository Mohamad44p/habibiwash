"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, Calendar, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  stats: {
    today: { bookings: number; revenue: number };
    month: { bookings: number; revenue: number };
    year: { bookings: number; revenue: number };
    total: { bookings: number; revenue: number };
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.total.revenue)}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500">+{formatCurrency(stats.month.revenue)}</span>
            <span className="ml-1">this month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total.bookings}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="text-blue-500">+{stats.month.bookings}</span>
            <span className="ml-1">this month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today&apos;s Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.today.revenue)}</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span>{stats.today.bookings} bookings today</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
          <TrendingUp className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {((stats.month.revenue / stats.total.revenue) * 100).toFixed(1)}%
          </div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span>Compared to last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
