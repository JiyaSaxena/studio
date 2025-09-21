'use server';

/**
 * @fileOverview Analyzes a list of transactions to identify potential mule activity.
 *
 * - analyzeTransactions - A function that analyzes transactions from a CSV and provides a risk score for each.
 * - AnalyzeTransactionsInput - The input type for the analyzeTransactions function.
 * - AnalyzeTransactionsOutput - The return type for the analyzeTransactions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTransactionsInputSchema = z.object({
  transactionsCsv: z
    .string()
    .describe('A CSV string containing transaction data. The first row must be the header.'),
});
export type AnalyzeTransactionsInput = z.infer<typeof AnalyzeTransactionsInputSchema>;

const TransactionAnalysisSchema = z.object({
    transactionId: z.number().describe('A unique identifier for the transaction, corresponding to its row number (1-based) in the CSV.'),
    riskScore: z.number().min(0).max(100).describe('A risk score from 0 to 100 indicating the likelihood of the transaction being part of a mule scheme.'),
    justification: z.string().describe('A brief justification for the assigned risk score.'),
    creditScore: z.number().min(1).max(10).describe('A credit score from 1 to 10, where 1 is the highest risk and 10 is the lowest risk. This should be inversely related to the risk score.'),
});

const AnalyzeTransactionsOutputSchema = z.object({
  analyses: z.array(TransactionAnalysisSchema).describe('An array of risk analysis results for each transaction.'),
});
export type AnalyzeTransactionsOutput = z.infer<typeof AnalyzeTransactionsOutputSchema>;

export async function analyzeTransactions(
  input: AnalyzeTransactionsInput
): Promise<AnalyzeTransactionsOutput> {
  return analyzeTransactionsFlow(input);
}

const analyzeTransactionsPrompt = ai.definePrompt({
  name: 'analyzeTransactionsPrompt',
  input: {schema: AnalyzeTransactionsInputSchema},
  output: {schema: AnalyzeTransactionsOutputSchema},
  prompt: `You are an expert financial crime analyst specializing in mule account detection.
  
  Analyze the following list of transactions from a CSV file. For each transaction, assess its risk of being related to mule activity.
  
  Provide a risk score (0-100) and a brief justification for each transaction. Use the row number as the transactionId, starting from 1 for the first data row.
  
  Also, provide a credit score on a scale of 1-10. The credit score should be inversely proportional to the risk score. A high risk score (e.g., 95) should result in a low credit score (e.g., 1), and a low risk score (e.g., 5) should result in a high credit score (e.g., 10).
  
  Consider factors like transaction amounts, payment types, locations, and any unusual patterns.
  
  Transactions CSV:
  {{{transactionsCsv}}}`,
});

const analyzeTransactionsFlow = ai.defineFlow(
  {
    name: 'analyzeTransactionsFlow',
    inputSchema: AnalyzeTransactionsInputSchema,
    outputSchema: AnalyzeTransactionsOutputSchema,
  },
  async input => {
    const {output} = await analyzeTransactionsPrompt(input);
    return output!;
  }
);
