"use client";

import { useState } from "react";
import type { Transaction, TransactionAnalysis } from "@/types";
import { getAnalysis } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import Papa from "papaparse";
import { TransactionUploader } from "@/components/transaction-uploader";
import { RiskDistributionChart } from "@/components/risk-distribution-chart";
import { TransactionAnalysisTable } from "@/components/transaction-analysis-table";
import { Skeleton } from "@/components/ui/skeleton";
import { AppHeader } from "@/components/app-header";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [analysis, setAnalysis] = useState<TransactionAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (file: File) => {
    if (file) {
      if (file.type !== "text/csv") {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a valid .csv file.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csvContent = e.target?.result as string;
        
        Papa.parse(csvContent, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: async (results) => {
            const parsedTransactions = results.data.map((t, index) => ({ ...(t as Omit<Transaction, 'id'>), id: index + 1 }));
            setTransactions(parsedTransactions);
            setAnalysis([]);
            setIsLoading(true);
            const { data, error } = await getAnalysis(csvContent);
            setIsLoading(false);
            if (error) {
              toast({
                variant: "destructive",
                title: "Analysis Error",
                description: error,
              });
              return;
            }
            if (data) {
              setAnalysis(data.analyses);
            }
          },
        });
      };
      reader.onerror = () => {
        toast({
          variant: "destructive",
          title: "File Read Error",
          description: "There was an error reading the file.",
        });
      };
      reader.readAsText(file);
    }
  };
  
  const analyzedTransactions = transactions.map(tx => {
    const analysisData = analysis.find(a => a.transactionId === tx.id);
    return {
      ...tx,
      riskScore: analysisData?.riskScore,
      justification: analysisData?.justification
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 container mx-auto p-4 md:p-8 space-y-8">
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary-dark">Mule Account Detection</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Upload a CSV file of transaction data to analyze for suspicious patterns and generate a risk score for each transaction.</p>
        </div>
        
        <TransactionUploader onFileChange={handleFileChange} isLoading={isLoading} />
        
        {isLoading && (
          <div className="grid gap-8">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-[400px] w-full" />
              </CardContent>
            </Card>
          </div>
        )}

        {!isLoading && analysis.length > 0 && (
          <div className="grid gap-8">
            <RiskDistributionChart analysis={analysis} />
            <TransactionAnalysisTable transactions={analyzedTransactions} />
          </div>
        )}
      </main>
    </div>
  );
}
