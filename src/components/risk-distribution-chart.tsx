"use client"

import type { TransactionAnalysis } from "@/types"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMemo } from "react"

interface RiskDistributionChartProps {
  analysis: TransactionAnalysis[]
}

export function RiskDistributionChart({ analysis }: RiskDistributionChartProps) {
  
  const riskDistribution = useMemo(() => {
    const distribution = [
      { name: "Low", count: 0, fill: "hsl(var(--chart-2))" },
      { name: "Medium", count: 0, fill: "hsl(var(--chart-3))" },
      { name: "High", count: 0, fill: "hsl(var(--chart-5))" },
      { name: "Critical", count: 0, fill: "hsl(var(--chart-1))" },
    ];

    analysis.forEach(item => {
      if (item.riskScore <= 25) {
        distribution[0].count++;
      } else if (item.riskScore <= 50) {
        distribution[1].count++;
      } else if (item.riskScore <= 75) {
        distribution[2].count++;
      } else {
        distribution[3].count++;
      }
    });

    return distribution.filter(d => d.count > 0);
  }, [analysis]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Distribution</CardTitle>
        <CardDescription>Number of transactions by risk category.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskDistribution} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip 
                        cursor={{ fill: 'hsl(var(--secondary))', fillOpacity: 0.3 }}
                        contentStyle={{ 
                            background: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={60}>
                        <LabelList dataKey="count" position="top" className="fill-foreground" fontSize={12} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
