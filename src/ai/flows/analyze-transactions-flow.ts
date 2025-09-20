'use server';

/**
 * @fileOverview Analyzes a list of transactions to identify potential mule activity.
 *
 * - analyzeTransactions - A function that analyzes transactions and provides a risk score for each.
 * - AnalyzeTransactionsInput - The input type for the analyzeTransactions function.
 * - AnalyzeTransactionsOutput - The return type for the analyzeTransactions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { analyzeAccountData } from './analyze-account-data';

const TransactionSchema = z.object({
  Time: z.string(),
  Date: z.string(),
  Sender_account: z.string(),
  Receiver_account: z.string(),
  Amount: z.string(),
  Payment_currency: z.string(),
  Received_currency: z.string(),
  Sender_bank_location: z.string(),
  Receiver_bank_location: z.string(),
  Payment_type: z.string(),
  Is_laundering: z.string(),
  Laundering_type: z.string(),
});

const AnalyzeTransactionsInputSchema = z.object({
  transactions: z.array(TransactionSchema),
});
export type AnalyzeTransactionsInput = z.infer<typeof AnalyzeTransactionsInputSchema>;

const TransactionWithRiskSchema = TransactionSchema.extend({
  riskScore: z.number().describe('A risk score from 0-100 indicating the likelihood of this transaction being part of mule activity.'),
});

const AnalyzeTransactionsOutputSchema = z.object({
    transactionsWithRisk: z.array(TransactionWithRiskSchema),
    report: z.object({
        isMuleAccount: z.boolean(),
        riskScore: z.number(),
        identifiedPatterns: z.array(z.string()),
        justification: z.string(),
    }),
});
export type AnalyzeTransactionsOutput = z.infer<typeof AnalyzeTransactionsOutputSchema>;

export async function analyzeTransactions(input: AnalyzeTransactionsInput): Promise<AnalyzeTransactionsOutput> {
  return analyzeTransactionsFlow(input);
}

const analyzeTransactionsFlow = ai.defineFlow(
  {
    name: 'analyzeTransactionsFlow',
    inputSchema: AnalyzeTransactionsInputSchema,
    outputSchema: AnalyzeTransactionsOutputSchema,
  },
  async ({ transactions }) => {
    // 1. Generate risk score for each transaction
    const transactionsWithRiskPromises = transactions.map(async (tx) => {
      const prompt = `You are an expert in detecting mule accounts. A mule account is an account that is used to receive and transfer money obtained illegally.
        Analyze the following transaction and assign a risk score from 0 to 100 based on how likely it is to be part of a mule activity scheme.
        Consider factors like transaction amount, payment type, bank locations, and currency. Provide only the risk score as a number.
        Transaction: ${JSON.stringify(tx)}
      `;
      const llmResponse = await ai.generate({
        prompt: prompt,
        config: { temperature: 0.3 }
      });
      const riskScoreText = llmResponse.text.trim();
      const riskScore = parseInt(riskScoreText, 10);

      return {
        ...tx,
        riskScore: isNaN(riskScore) ? 0 : Math.max(0, Math.min(100, riskScore)), // Clamp score between 0 and 100
      };
    });

    const transactionsWithRisk = await Promise.all(transactionsWithRiskPromises);

    // 2. Generate an overall report
    const accountText = `Multiple transactions: ${JSON.stringify(transactionsWithRisk, null, 2)}`;
    const report = await analyzeAccountData({ accountText });

    return {
      transactionsWithRisk,
      report,
    };
  }
);
