"use client";

import type { AnalysisReport, Transaction } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RiskScoreIndicator } from "./risk-score-indicator";
import { exportAsCsv, exportAsJson } from "@/lib/export";
import { FileDown, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMemo } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface ReportDisplayProps {
  report: AnalysisReport;
  transactions: Transaction[];
}

export function ReportDisplay({ report, transactions: rawTransactions }: ReportDisplayProps) {

  const transactions = useMemo(() => {
    return rawTransactions.map((t, i) => ({
      ...t,
      riskScore: report.riskScore,
      name: `Transaction ${i + 1}`
    }));
  }, [rawTransactions, report.riskScore]);


  return (
    <Card className="shadow-lg animate-in fade-in-0 zoom-in-95 duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Analysis Report</span>
           <Badge variant={report.isMuleAccount ? "destructive" : "secondary"}>
            {report.isMuleAccount ? "Potential Mule Account" : "Likely Not a Mule"}
          </Badge>
        </CardTitle>
        <CardDescription>Detailed findings based on the provided account data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Overall Risk Score</h3>
          <RiskScoreIndicator score={report.riskScore} />
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-3">Transaction Risk Analysis</h3>
           <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={transactions}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="riskScore" fill="hsl(var(--primary))" name="Risk Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Separator />
         <div>
          <h3 className="text-lg font-semibold mb-3">Transaction Details</h3>
          <ScrollArea className="h-[300px] w-full border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Payment Type</TableHead>
                  <TableHead>Risk Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t, index) => (
                  <TableRow key={index}>
                    <TableCell>{t.Time}</TableCell>
                    <TableCell>{t.Date}</TableCell>
                    <TableCell>{t.Sender_account}</TableCell>
                    <TableCell>{t.Receiver_account}</TableCell>
                    <TableCell>{t.Amount}</TableCell>
                    <TableCell>{t.Payment_currency}</TableCell>
                    <TableCell>{t.Payment_type}</TableCell>
                    <TableCell>
                       <Badge variant={t.riskScore! > 75 ? "destructive" : t.riskScore! > 40 ? "secondary" : "default"}>
                        {t.riskScore}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <Separator />
        <div>
           <h3 className="text-lg font-semibold mb-3 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
            Identified Patterns
          </h3>
          <div className="flex flex-wrap gap-2">
            {report.identifiedPatterns.length > 0 ? (
              report.identifiedPatterns.map((pattern, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {pattern}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No specific risk patterns were identified.</p>
            )}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-2">Justification</h3>
          <p className="text-sm text-foreground/80 leading-relaxed bg-secondary/50 p-4 rounded-md">
            {report.justification}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
         <Button variant="outline" onClick={() => exportAsCsv(report)}>
            <FileDown className="mr-2" />
            Export as CSV
        </Button>
        <Button onClick={() => exportAsJson(report)}>
            <FileDown className="mr-2" />
            Export as JSON
        </Button>
      </CardFooter>
    </Card>
  );
}
