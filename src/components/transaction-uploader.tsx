"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, Search, FileCode } from "lucide-react";
import { Input } from "./ui/input";

interface TransactionUploaderProps {
  onFileChange: (file: File) => void;
  isLoading: boolean;
}

export function TransactionUploader({ onFileChange, isLoading }: TransactionUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="bg-secondary/50 border border-border">
      <CardHeader>
        <CardTitle>Account Data Input</CardTitle>
        <CardDescription>
          Upload a CSV file with transaction data to analyze for suspicious patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleUploadClick} disabled={isLoading}>
              <Upload className="mr-2 h-4 w-4" />
              Upload CSV File
            </Button>
            {fileName && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileCode className="h-4 w-4" />
                <span>{fileName}</span>
              </div>
            )}
          </div>

          <Button className="w-full" onClick={() => fileInputRef.current?.files?.[0] && onFileChange(fileInputRef.current.files[0])} disabled={isLoading || !fileName}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analyze Account
              </>
            )}
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".csv"
          />
        </div>
      </CardContent>
    </Card>
  );
}
