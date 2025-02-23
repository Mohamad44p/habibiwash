"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";

interface ServicePerformanceProps {
  data: Array<{
    packageId: string;
    _count: number;
    _sum: { totalPrice: number | null };
  }>;
}

export function ServicePerformanceChart({ data }: ServicePerformanceProps) {
  const chartData = data.map(item => ({
    service: item.packageId,
    bookings: item._count,
    revenue: item._sum.totalPrice || 0
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis dataKey="service" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              formatter={(value: number, name: string) => [
                name === 'revenue' ? formatCurrency(value) : value,
                name === 'revenue' ? 'Revenue' : 'Bookings'
              ]}
            />
            <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
