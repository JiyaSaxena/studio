"use client";

import type { Transaction } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (transactions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Transactions</CardTitle>
        <CardDescription>
          Showing the first {transactions.length} transactions from your file.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead>Sender Location</TableHead>
                <TableHead>Receiver Location</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction, index) => (
                <TableRow key={index}>
                    <TableCell className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: transaction.Payment_currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(transaction.Amount))}</TableCell>
                    <TableCell>{transaction.Payment_type}</TableCell>
                    <TableCell>{transaction.Sender_bank_location}</TableCell>
                    <TableCell>{transaction.Receiver_bank_location}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
