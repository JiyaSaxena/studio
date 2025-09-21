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
      { name: "Low", count: 0, fill: "hsl(var(--chart-1))" }, // Green
      { name: "Medium", count: 0, fill: "hsl(var(--chart-2))" }, // Yellow
      { name: "High", count: 0, fill: "hsl(var(--chart-3))" }, // Orange
      { name: "Critical", count: 0, fill: "hsl(var(--chart-4))" }, // Red
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

    return distribution;
  }, [analysis]);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Risk Distribution Overview</CardTitle>
        <CardDescription>A summary of transaction risk levels across the entire dataset.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskDistribution} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.5} />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} width={40}/>
                    <Tooltip 
                        cursor={{ fill: 'hsl(var(--secondary))', fillOpacity: 0.5 }}
                        contentStyle={{ 
                            background: 'hsl(var(--background))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="count" position="top" className="fill-foreground" fontSize={12} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
