"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

interface PeakHoursProps {
  data: Array<{
    time: string;
    _count: number;
  }>;
}

export function PeakHoursHeatmap({ data }: PeakHoursProps) {
  const chartData = data.map(item => ({
    hour: parseInt(item.time.split(':')[0]),
    bookings: item._count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Peak Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <XAxis
              type="number"
              dataKey="hour"
              domain={[6, 22]}
              tickCount={17}
              name="Hour"
              unit="h"
            />
            <YAxis dataKey="bookings" name="Bookings" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value: number, name: string) => [
                value,
                name === 'hour' ? 'Hour' : 'Bookings'
              ]}
            />
            <Scatter
              data={chartData}
              fill="#8884d8"
              line={{ stroke: '#8884d8', strokeWidth: 1 }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
