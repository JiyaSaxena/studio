"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";

interface AnalysisFormProps {
  text: string;
  setText: (text: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function AnalysisForm({ text, setText, isLoading, onSubmit }: AnalysisFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Data Input</CardTitle>
        <CardDescription>
          Paste the account data below to analyze for mule account patterns.
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
        </form>
      </CardContent>
    </Card>
  );
}
