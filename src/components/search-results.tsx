"use client";

import type { Transaction } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCurrencyCode } from "@/lib/utils";

interface SearchResultsProps {
  transactions: Transaction[];
}

export function SearchResults({ transactions }: SearchResultsProps) {

  const getRiskVariant = (score: number | undefined) => {
    if (score === undefined) return "default";
    if (score > 75) return "destructive";
    if (score > 40) return "secondary";
    return "default";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Results</CardTitle>
        <CardDescription>
          {transactions.length > 0
            ? `Found ${transactions.length} transaction(s).`
            : "No transactions found for this sender."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="border p-4 rounded-lg bg-card/50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">
                      From: <span className="font-normal text-muted-foreground">{tx.Sender_account}</span>
                    </p>
                    <p className="font-semibold">
                      To: <span className="font-normal text-muted-foreground">{tx.Receiver_account}</span>
                    </p>
                  </div>
                   <Badge variant={getRiskVariant(tx.riskScore)} className="text-sm font-bold">
                     Risk: {tx.riskScore ?? 'N/A'}
                  </Badge>
                </div>
                <div className="mt-2 text-sm">
                   <p><span className="font-semibold">Amount:</span> {new Intl.NumberFormat('en-US', { style: 'currency', currency: getCurrencyCode(tx.Payment_currency) || 'USD' }).format(tx.Amount)}</p>
                   <p><span className="font-semibold">Payment Type:</span> {tx.Payment_type}</p>
                   <p><span className="font-semibold">Location:</span> {tx.Sender_bank_location} → {tx.Receiver_bank_location}</p>
                </div>
                {tx.justification && (
                   <p className="mt-2 text-sm text-amber-300/80 italic border-l-2 border-amber-300/50 pl-2">
                    {tx.justification}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
