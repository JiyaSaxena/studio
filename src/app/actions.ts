'use server';

import { analyzeTransactions } from '@/ai/flows/analyze-transactions';
import type { AnalyzeTransactionsOutput } from '@/ai/flows/analyze-transactions';

export async function getAnalysis(transactionsCsv: string): Promise<{ data: AnalyzeTransactionsOutput | null; error: string | null; }> {
  if (!process.env.GEMINI_API_KEY) {
    return { 
      data: null, 
      error: 'The GEMINI_API_KEY environment variable is not set. Please add it to the .env file in your project and restart the server.' 
    };
  }
  
  if (!transactionsCsv.trim()) {
    return { data: null, error: 'CSV data cannot be empty.' };
  }

  try {
    const result = await analyzeTransactions({ transactionsCsv });
    return { data: result, error: null };
  } catch (e) {
    console.error('Error in getAnalysis action:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { data: null, error: `An error occurred during analysis: ${errorMessage}. Please try again.` };
  }
}
