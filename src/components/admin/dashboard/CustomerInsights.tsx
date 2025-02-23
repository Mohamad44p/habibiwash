"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users } from "lucide-react";

interface CustomerInsightsProps {
  retention: {
    repeatCustomers: number;
    totalCustomers: number;
  };
  satisfaction: {
    averageRating: number;
    totalReviews: number;
  };
}

export function CustomerInsights({ retention, satisfaction }: CustomerInsightsProps) {
  const retentionRate = ((retention.repeatCustomers / retention.totalCustomers) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Customer Retention</span>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{retentionRate}%</div>
          <p className="text-xs text-muted-foreground">
            {retention.repeatCustomers} repeat customers out of {retention.totalCustomers} total
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Customer Satisfaction</span>
            <Star className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold">{satisfaction.averageRating.toFixed(1)}/5</div>
          <p className="text-xs text-muted-foreground">
            Based on {satisfaction.totalReviews} reviews
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
