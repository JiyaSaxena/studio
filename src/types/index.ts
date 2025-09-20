import type { AnalyzeAccountDataOutput } from '@/ai/flows/analyze-account-data';

export type AnalysisReport = AnalyzeAccountDataOutput;

export interface Transaction {
  Time: string;
  Date: string;
  Sender_account: string;
  Receiver_account: string;
  Amount: string;
  Payment_currency: string;
  Received_currency: string;
  Sender_bank_location: string;
  Receiver_bank_location: string;
  Payment_type: string;
  Is_laundering: string;
  Laundering_type: string;
  riskScore?: number;
  justification?: string;
}
