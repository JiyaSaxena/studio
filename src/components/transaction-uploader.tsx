"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Papa from "papaparse";
import type { Transaction } from "@/types";

interface TransactionUploaderProps {
  onTransactionsParsed: (transactions: Transaction[]) => void;
  isLoading: boolean;
}

export function TransactionUploader({ onTransactionsParsed, isLoading }: TransactionUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv") {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a valid .csv file.",
        });
        return;
      }
      
      Papa.parse<Transaction>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          onTransactionsParsed(results.data);
        },
        error: (error) => {
          toast({
            variant: "destructive",
            title: "CSV Parse Error",
            description: error.message,
          });
        }
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Transaction Data</CardTitle>
        <CardDescription>
          Upload a CSV file with transaction data to analyze for mule account patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={handleUploadClick} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload CSV
            </>
          )}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".csv"
          disabled={isLoading}
        />
      </CardContent>
    </Card>
  );
}
