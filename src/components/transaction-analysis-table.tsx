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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FileDown } from "lucide-react";
import Papa from "papaparse";

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

  const handleExport = (format: 'json' | 'csv') => {
    let data;
    let fileName;
    let mimeType;

    if (format === 'csv') {
      data = Papa.unparse(transactions);
      fileName = 'transaction_analysis.csv';
      mimeType = 'text/csv';
    } else {
      data = JSON.stringify(transactions, null, 2);
      fileName = 'transaction_analysis.json';
      mimeType = 'application/json';
    }

    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Analysis</CardTitle>
        <CardDescription>
          Detailed analysis of each transaction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
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
                    <TableCell className="font-medium">{transaction.Amount}</TableCell>
                    <TableCell>{transaction.Payment_type}</TableCell>
                    <TableCell>{transaction.Sender_bank_location}</TableCell>
                    <TableCell>{transaction.Receiver_bank_location}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{transaction.justification}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => handleExport('csv')}>
          <FileDown className="mr-2 h-4 w-4" />
          Export as CSV
        </Button>
        <Button onClick={() => handleExport('json')}>
          <FileDown className="mr-2 h-4 w-4" />
          Export as JSON
        </Button>
      </CardFooter>
    </Card>
  );
}
