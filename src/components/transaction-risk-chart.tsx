"use client"

import type { TransactionAnalysis } from "@/types"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TransactionRiskChartProps {
  data: TransactionAnalysis[]
}

export function TransactionRiskChart({ data }: TransactionRiskChartProps) {
  const sortedData = [...data]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 10);

  const chartData = sortedData.map(item => ({
    name: `Txn ${item.transactionId}`,
    riskScore: item.riskScore,
    justification: item.justification,
  }));

  return (
    <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                    cursor={{ fill: 'hsl(var(--secondary))' }}
                    contentStyle={{ 
                        background: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="riskScore" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="riskScore" position="top" className="fill-foreground" fontSize={12} />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}
