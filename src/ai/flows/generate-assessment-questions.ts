// use server'
'use server';
/**
 * @fileOverview Assessment question generation flow.
 *
 * - generateAssessmentQuestions - A function that generates assessment questions based on the given topic and format.
 * - GenerateAssessmentQuestionsInput - The input type for the generateAssessmentQuestions function.
 * - GenerateAssessmentQuestionsOutput - The return type for the generateAssessmentQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAssessmentQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate assessment questions.'),
  questionType: z.enum(['multiple choice', 'fill-in-the-blanks', 'short answer']).describe('The type of assessment questions to generate.'),
  numberQuestions: z.number().describe('The number of questions to generate')
});
export type GenerateAssessmentQuestionsInput = z.infer<typeof GenerateAssessmentQuestionsInputSchema>;

const GenerateAssessmentQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of generated assessment questions.')
});
export type GenerateAssessmentQuestionsOutput = z.infer<typeof GenerateAssessmentQuestionsOutputSchema>;

export async function generateAssessmentQuestions(input: GenerateAssessmentQuestionsInput): Promise<GenerateAssessmentQuestionsOutput> {
  return generateAssessmentQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAssessmentQuestionsPrompt',
  input: {schema: GenerateAssessmentQuestionsInputSchema},
  output: {schema: GenerateAssessmentQuestionsOutputSchema},
  prompt: `You are an expert in generating assessment questions for teachers. Generate the requested number of questions of the specified type regarding the topic: {{{topic}}}.\n\nType of question: {{{questionType}}}.\nNumber of questions: {{{numberQuestions}}}.\n\nReturn the questions in an array.`,
});

const generateAssessmentQuestionsFlow = ai.defineFlow(
  {
    name: 'generateAssessmentQuestionsFlow',
    inputSchema: GenerateAssessmentQuestionsInputSchema,
    outputSchema: GenerateAssessmentQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
