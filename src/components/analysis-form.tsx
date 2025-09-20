"use client";

import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisFormProps {
  text: string;
  setText: (text: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function AnalysisForm({ text, setText, isLoading, onSubmit }: AnalysisFormProps) {
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
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        setText(fileContent);
      };
      reader.onerror = () => {
         toast({
          variant: "destructive",
          title: "File Read Error",
          description: "There was an error reading the file.",
        });
      }
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Data Input</CardTitle>
        <CardDescription>
          Paste the account data below or upload a CSV file to analyze for mule account patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter transaction data, user info, or any relevant text here..."
            className="min-h-[300px] text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex flex-col sm:flex-row gap-2">
             <Button type="button" variant="outline" className="w-full" onClick={handleUploadClick} disabled={isLoading}>
                <Upload className="mr-2 h-4 w-4" />
                Upload CSV
            </Button>
            <Button type="submit" className="w-full" disabled={isLoading}>
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
          </div>
           <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".csv"
            disabled={isLoading}
          />
        </form>
      </CardContent>
    </Card>
  );
}
