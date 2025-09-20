'use server';

import { analyzeAccountData } from '@/ai/flows/analyze-account-data';
import { analyzeTransactions } from '@/ai/flows/analyze-transactions';
import type { AnalysisReport, TransactionAnalysis } from '@/types';

export async function getAnalysis(accountText: string): Promise<{ data: AnalysisReport | null; error: string | null; transactionAnalyses?: TransactionAnalysis[] }> {
  if (!process.env.GEMINI_API_KEY) {
    return { 
      data: null, 
      error: 'The GEMINI_API_KEY environment variable is not set. Please add it to the .env file in your project and restart the server.' 
    };
  }
  
  if (!accountText.trim()) {
    return { data: null, error: 'Account text cannot be empty.' };
  }

  try {
    const [reportResult, transactionAnalysesResult] = await Promise.all([
      analyzeAccountData({ accountText }),
      analyzeTransactions({ transactionsCsv: accountText }),
    ]);
    
    return { data: reportResult, error: null, transactionAnalyses: transactionAnalysesResult.analyses };
  } catch (e) {
    console.error('Error in getAnalysis action:', e);
    // Check for a more specific error message if available
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { data: null, error: `An error occurred during analysis: ${errorMessage}. Please try again.` };
  }
}
