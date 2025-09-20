'use server';

import { analyzeAccountData } from '@/ai/flows/analyze-account-data';
import type { AnalysisReport } from '@/types';

export async function getAnalysis(accountText: string): Promise<{ data: AnalysisReport | null; error: string | null }> {
  if (!accountText.trim()) {
    return { data: null, error: 'Account text cannot be empty.' };
  }

  try {
    const result = await analyzeAccountData({ accountText });
    return { data: result, error: null };
  } catch (e) {
    console.error('Error in getAnalysis action:', e);
    // Check for a more specific error message if available
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { data: null, error: `An error occurred during analysis: ${errorMessage}. Please try again.` };
  }
}
