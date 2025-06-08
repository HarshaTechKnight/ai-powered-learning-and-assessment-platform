"use client";

import { useState, type FormEvent } from 'react';
import { generateAssessmentQuestions, type GenerateAssessmentQuestionsInput, type GenerateAssessmentQuestionsOutput } from '@/ai/flows/generate-assessment-questions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, FileText, MessageSquare, ListChecks, Puzzle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const questionTypes = [
  { value: "multiple choice", label: "Multiple Choice", icon: ListChecks },
  { value: "fill-in-the-blanks", label: "Fill-in-the-Blanks", icon: Puzzle },
  { value: "short answer", label: "Short Answer", icon: MessageSquare },
] as const;

export function AssessmentGenerator() {
  const [formData, setFormData] = useState<GenerateAssessmentQuestionsInput>({
    topic: '',
    questionType: 'multiple choice',
    numberQuestions: 5,
  });
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === 'numberQuestions' ? parseInt(value, 10) : value 
    });
  };

  const handleSelectChange = (value: GenerateAssessmentQuestionsInput['questionType']) => {
    setFormData({ ...formData, questionType: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setQuestions([]);
    try {
      const result: GenerateAssessmentQuestionsOutput = await generateAssessmentQuestions(formData);
      setQuestions(result.questions);
      toast({
        title: "Assessment Generated!",
        description: `Successfully created ${formData.numberQuestions} ${formData.questionType} questions.`,
      });
    } catch (error) {
      console.error("Error generating questions:", error);
      toast({
        title: "Error",
        description: "Failed to generate assessment questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-headline">
            <Sparkles className="mr-3 h-7 w-7 text-accent" />
            Create Custom Assessments
          </CardTitle>
          <CardDescription>Generate tailored quizzes and tests with AI for any topic.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic" className="font-semibold text-lg">Topic</Label>
              <Input id="topic" name="topic" value={formData.topic} onChange={handleChange} placeholder="e.g., JavaScript Promises, The Cold War, Cell Biology" required className="text-base"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="questionType" className="font-semibold text-lg">Question Type</Label>
                <Select value={formData.questionType} onValueChange={handleSelectChange}>
                  <SelectTrigger id="questionType" className="text-base">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionTypes.map(type => (
                      <SelectItem key={type.value} value={type.value} className="text-base">
                        <div className="flex items-center">
                          <type.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="numberQuestions" className="font-semibold text-lg">Number of Questions</Label>
                <Input id="numberQuestions" name="numberQuestions" type="number" value={formData.numberQuestions} onChange={handleChange} min="1" max="20" required className="text-base"/>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} size="lg" className="w-full md:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Questions
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {questions.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline">
              <FileText className="mr-3 h-7 w-7 text-primary" />
              Generated Questions
            </CardTitle>
            <CardDescription>Topic: {formData.topic} | Type: {formData.questionType} | Count: {formData.numberQuestions}</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-6 space-y-4">
              {questions.map((question, index) => (
                <li key={index} className="text-lg text-foreground">
                  <p className="whitespace-pre-wrap">{question}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
