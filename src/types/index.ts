export interface Transaction {
  id: number;
  Time: string;
  Date: string;
  Sender_account: string;
  Receiver_account: string;
  Amount: number;
  Payment_currency: string;
  Received_currency: string;
  Sender_bank_location: string;
  Receiver_bank_location:string;
  Payment_type: string;
  Is_laundering: number;
  Laundering_type: string;
  riskScore?: number;
  justification?: string;
}

export interface TransactionAnalysis {
  transactionId: number;
  riskScore: number;
  justification: string;
}
