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
import { ScrollArea } from "./ui/scroll-area";
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
    <Card>
      <CardHeader>
        <CardTitle>Transaction Analysis</CardTitle>
        <CardDescription>
          Detailed analysis of each transaction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
            <Table>
            <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Risk</TableHead>
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
                    <TableCell>
                      <Badge variant={getRiskVariant(transaction.riskScore)}>
                        {transaction.riskScore ?? 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: getCurrencyCode(transaction.Payment_currency) }).format(transaction.Amount)}</TableCell>
                    <TableCell>{transaction.Payment_type}</TableCell>
                    <TableCell>{transaction.Sender_bank_location}</TableCell>
                    <TableCell>{transaction.Receiver_bank_location}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{transaction.justification}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
