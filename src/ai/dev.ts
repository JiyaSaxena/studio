import { config } from 'dotenv';
config();

import '@/ai/flows/score-account-risk.ts';
import '@/ai/flows/analyze-account-data.ts';
import '@/ai/flows/generate-report-justification.ts';
import '@/ai/flows/analyze-transactions.ts';
