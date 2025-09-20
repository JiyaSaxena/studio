"use client"

import type { Transaction } from "@/types";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TransactionVisualizerProps {
  transactions: Transaction[];
}

export function TransactionVisualizer({ transactions }: TransactionVisualizerProps) {
  const chartData = transactions.map((t, index) => ({
    name: `Txn ${index + 1}`,
    riskScore: t.riskScore,
  }));

  return (
    <Card className="animate-in fade-in-0 zoom-in-95 duration-300">
      <CardHeader>
        <CardTitle>Transaction Visualization</CardTitle>
        <CardDescription>
          A summary of the parsed transaction data from your CSV file.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Risk Score Distribution (by Amount)</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))'
                  }}
                />
                <Bar dataKey="riskScore" fill="hsl(var(--primary))" name="Risk Score (Amount)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Transaction Details</h3>
          <ScrollArea className="h-[300px] w-full border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Currency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.Date}</TableCell>
                    <TableCell>{transaction.Sender_account}</TableCell>
                    <TableCell>{transaction.Receiver_account}</TableCell>
                    <TableCell className="text-right">{transaction.Amount.toFixed(2)}</TableCell>
                    <TableCell>{transaction.Payment_currency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
