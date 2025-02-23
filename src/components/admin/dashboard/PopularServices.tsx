"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface PopularServicesProps {
  packages: Array<{
    packageId: string;
    _count: number;
  }>;
  vehicleStats: Array<{
    vehicleType: string;
    _count: number;
  }>;
}

export function PopularServices({ vehicleStats }: PopularServicesProps) {
  const vehicleData = vehicleStats.map((stat, index) => ({
    name: stat.vehicleType,
    value: stat._count,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Vehicle Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={vehicleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {vehicleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
