"use client";

import { useState } from "react";
import type { AnalysisReport } from "@/types";
import { getAnalysis } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { AppHeader } from "@/components/app-header";
import { AnalysisForm } from "@/components/analysis-form";
import { ReportDisplay } from "@/components/report-display";
import { ReportSkeleton } from "@/components/report-skeleton";
import { FileSearch } from "lucide-react";

export default function Home() {
  const [text, setText] = useState("");
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setReport(null);
    const { data, error } = await getAnalysis(text);
    setIsLoading(false);
    if (error) {
      toast({
        variant: "destructive",
        title: "Analysis Error",
        description: error,
      });
      return;
    }
    setReport(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <AnalysisForm
            text={text}
            setText={setText}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
          <div className="lg:sticky top-8">
            {isLoading ? (
              <ReportSkeleton />
            ) : report ? (
              <ReportDisplay report={report} />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg h-full min-h-[400px]">
                <FileSearch className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-foreground">Analysis results will appear here</h2>
                <p className="text-muted-foreground mt-2">
                  Enter account details on the left and click "Analyze" to begin.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
