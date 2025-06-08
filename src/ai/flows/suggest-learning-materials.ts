'use server';

/**
 * @fileOverview An AI agent that suggests relevant learning materials based on user goals and interests.
 *
 * - suggestLearningMaterials - A function that suggests learning materials.
 * - SuggestLearningMaterialsInput - The input type for the suggestLearningMaterials function.
 * - SuggestLearningMaterialsOutput - The return type for the suggestLearningMaterials function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLearningMaterialsInputSchema = z.object({
  learningGoals: z
    .string()
    .describe('The learning goals of the user, e.g., learn Python for data analysis.'),
  interests: z
    .string()
    .describe('The interests of the user, e.g., machine learning, data visualization.'),
  subject: z.string().describe('The subject or topic of interest, e.g., mathematics, history, physics'),
  formatPreferences: z
    .string()
    .optional()
    .describe('The preferred formats for learning materials, e.g., articles, videos, quizzes.'),
});
export type SuggestLearningMaterialsInput = z.infer<typeof SuggestLearningMaterialsInputSchema>;

const SuggestLearningMaterialsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of suggested learning materials relevant to the user.'),
});
export type SuggestLearningMaterialsOutput = z.infer<typeof SuggestLearningMaterialsOutputSchema>;

export async function suggestLearningMaterials(
  input: SuggestLearningMaterialsInput
): Promise<SuggestLearningMaterialsOutput> {
  return suggestLearningMaterialsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLearningMaterialsPrompt',
  input: {schema: SuggestLearningMaterialsInputSchema},
  output: {schema: SuggestLearningMaterialsOutputSchema},
  prompt: `You are an AI learning assistant. Your role is to suggest relevant and helpful learning
materials to students based on their learning goals, interests, and preferred formats. The user will
provide their learning goals, interests, the specific subject they are studying, and any format preferences.

Based on this information, suggest a list of learning materials that would be most beneficial for them.
Each suggested item should be a concise string.

Learning Goals: {{{learningGoals}}}
Interests: {{{interests}}}
Subject: {{{subject}}}
Format Preferences: {{{formatPreferences}}}

Suggestions:
`,
});

const suggestLearningMaterialsFlow = ai.defineFlow(
  {
    name: 'suggestLearningMaterialsFlow',
    inputSchema: SuggestLearningMaterialsInputSchema,
    outputSchema: SuggestLearningMaterialsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
