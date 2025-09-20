"use client";

import type { AnalysisReport } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RiskScoreIndicator } from "./risk-score-indicator";
import { exportAsCsv, exportAsJson } from "@/lib/export";
import { FileDown, AlertTriangle } from "lucide-react";

interface ReportDisplayProps {
  report: AnalysisReport;
}

export function ReportDisplay({ report }: ReportDisplayProps) {
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
          <h3 className="text-lg font-semibold mb-2">Risk Score</h3>
          <RiskScoreIndicator score={report.riskScore} />
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
