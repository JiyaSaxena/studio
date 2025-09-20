'use server';

/**
 * @fileOverview Analyzes account data to identify potential mule accounts.
 *
 * - analyzeAccountData - A function that analyzes account data and identifies potential mule accounts.
 * - AnalyzeAccountDataInput - The input type for the analyzeAccountData function.
 * - AnalyzeAccountDataOutput - The return type for the analyzeAccountData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeAccountDataInputSchema = z.object({
  accountText: z
    .string()
    .describe('A block of text containing account data to analyze.'),
});
export type AnalyzeAccountDataInput = z.infer<typeof AnalyzeAccountDataInputSchema>;

const AnalyzeAccountDataOutputSchema = z.object({
  isMuleAccount: z
    .boolean()
    .describe('Whether the account is likely a mule account.'),
  riskScore: z
    .number()
    .describe('A risk score indicating the likelihood of the account being a mule account (0-100).'),
  identifiedPatterns: z
    .array(z.string())
    .describe('Specific patterns identified in the account data that are indicative of mule accounts.'),
  justification: z
    .string()
    .describe('A detailed explanation of why the account is classified as a potential mule account.'),
});
export type AnalyzeAccountDataOutput = z.infer<typeof AnalyzeAccountDataOutputSchema>;

export async function analyzeAccountData(
  input: AnalyzeAccountDataInput
): Promise<AnalyzeAccountDataOutput> {
  return analyzeAccountDataFlow(input);
}

const analyzeAccountDataPrompt = ai.definePrompt({
  name: 'analyzeAccountDataPrompt',
  input: {schema: AnalyzeAccountDataInputSchema},
  output: {schema: AnalyzeAccountDataOutputSchema},
  prompt: `You are an expert in identifying mule accounts based on account data.

  Analyze the following account data and determine if it is a potential mule account.
  Provide a risk score (0-100), identify any patterns indicative of mule accounts, and justify your classification.

  Account Data: {{{accountText}}}`,
});

const analyzeAccountDataFlow = ai.defineFlow(
  {
    name: 'analyzeAccountDataFlow',
    inputSchema: AnalyzeAccountDataInputSchema,
    outputSchema: AnalyzeAccountDataOutputSchema,
  },
  async input => {
    const {output} = await analyzeAccountDataPrompt(input);
    return output!;
  }
);
