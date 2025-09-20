'use server';

/**
 * @fileOverview An AI agent that scores the risk of an account being a mule account.
 *
 * - scoreAccountRisk - A function that handles the account risk scoring process.
 * - ScoreAccountRiskInput - The input type for the scoreAccountRisk function.
 * - ScoreAccountRiskOutput - The return type for the scoreAccountRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScoreAccountRiskInputSchema = z.object({
  accountText: z.string().describe('The text of the account to analyze.'),
});
export type ScoreAccountRiskInput = z.infer<typeof ScoreAccountRiskInputSchema>;

const ScoreAccountRiskOutputSchema = z.object({
  riskScore: z.number().describe('The risk score of the account being a mule account, from 0 to 100.'),
  justification: z.string().describe('The justification for the risk score.'),
});
export type ScoreAccountRiskOutput = z.infer<typeof ScoreAccountRiskOutputSchema>;

export async function scoreAccountRisk(input: ScoreAccountRiskInput): Promise<ScoreAccountRiskOutput> {
  return scoreAccountRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scoreAccountRiskPrompt',
  input: {schema: ScoreAccountRiskInputSchema},
  output: {schema: ScoreAccountRiskOutputSchema},
  prompt: `You are an expert in detecting mule accounts. A mule account is an account that is used to receive and transfer money obtained illegally.

You will be provided with the text of an account. You will analyze the account and determine the risk score of the account being a mule account.

You should identify specific patterns (e.g., unusual transaction frequency, inconsistent personal information) that are indicative of mule accounts.

Assign a risk score to each analyzed account based on the identified patterns. The risk score should be from 0 to 100.

Provide a justification for the risk score.

Account text: {{{accountText}}}`,
});

const scoreAccountRiskFlow = ai.defineFlow(
  {
    name: 'scoreAccountRiskFlow',
    inputSchema: ScoreAccountRiskInputSchema,
    outputSchema: ScoreAccountRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
