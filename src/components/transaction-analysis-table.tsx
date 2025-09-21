"use client";

import type { Transaction } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { getCurrencyCode } from "@/lib/utils";

interface TransactionAnalysisTableProps {
  transactions: Transaction[];
}

export function TransactionAnalysisTable({ transactions }: TransactionAnalysisTableProps) {
  if (transactions.length === 0) {
    return null;
  }
  
  const getRiskVariant = (score: number | undefined) => {
    if (score === undefined) return "default";
    if (score > 75) return "destructive";
    if (score > 40) return "secondary";
    return "default";
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Detailed Transaction Analysis</CardTitle>
        <CardDescription>
          An AI-powered risk assessment for each transaction in the dataset.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full border rounded-md">
            <Table>
            <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">Risk Score</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Type</TableHead>
                  <TableHead>Sender Location</TableHead>
                  <TableHead>Receiver Location</TableHead>
                  <TableHead>Justification</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                    <TableCell className="text-center">
                      <Badge variant={getRiskVariant(transaction.riskScore)} className="text-sm font-bold">
                        {transaction.riskScore ?? 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: getCurrencyCode(transaction.Payment_currency) || 'USD' }).format(transaction.Amount)}</TableCell>
                    <TableCell>{transaction.Payment_type}</TableCell>
                    <TableCell>{transaction.Sender_bank_location}</TableCell>
                    <TableCell>{transaction.Receiver_bank_location}</TableCell>
                    <TableCell className="max-w-[350px] text-muted-foreground">{transaction.justification}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
