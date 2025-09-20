// src/ai/flows/generate-report-justification.ts
'use server';

/**
 * @fileOverview Generates a justification for a mule account report using the Gemini API.
 *
 * - generateReportJustification - A function that generates a report justification.
 * - GenerateReportJustificationInput - The input type for the generateReportJustification function.
 * - GenerateReportJustificationOutput - The return type for the generateReportJustification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportJustificationInputSchema = z.object({
  accountText: z.string().describe('The text content of the account to analyze.'),
  identifiedPatterns: z.array(z.string()).describe('The patterns identified in the account text.'),
  riskScore: z.number().describe('The risk score assigned to the account.'),
});
export type GenerateReportJustificationInput = z.infer<typeof GenerateReportJustificationInputSchema>;

const GenerateReportJustificationOutputSchema = z.object({
  justification: z.string().describe('The justification for the risk score and identified patterns.'),
});
export type GenerateReportJustificationOutput = z.infer<typeof GenerateReportJustificationOutputSchema>;

export async function generateReportJustification(input: GenerateReportJustificationInput): Promise<GenerateReportJustificationOutput> {
  return generateReportJustificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportJustificationPrompt',
  input: {schema: GenerateReportJustificationInputSchema},
  output: {schema: GenerateReportJustificationOutputSchema},
  prompt: `You are an expert in identifying mule accounts. Given the following account text, identified patterns, and risk score, provide a justification for the risk score and identified patterns.

Account Text: {{{accountText}}}
Identified Patterns: {{#each identifiedPatterns}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Risk Score: {{{riskScore}}}

Justification: `,
});

const generateReportJustificationFlow = ai.defineFlow(
  {
    name: 'generateReportJustificationFlow',
    inputSchema: GenerateReportJustificationInputSchema,
    outputSchema: GenerateReportJustificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
