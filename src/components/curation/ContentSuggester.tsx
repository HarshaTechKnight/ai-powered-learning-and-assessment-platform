"use client";

import { useState, type FormEvent } from 'react';
import { suggestLearningMaterials, type SuggestLearningMaterialsInput, type SuggestLearningMaterialsOutput } from '@/ai/flows/suggest-learning-materials';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ContentSuggester() {
  const [formData, setFormData] = useState<SuggestLearningMaterialsInput>({
    learningGoals: '',
    interests: '',
    subject: '',
    formatPreferences: '',
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result: SuggestLearningMaterialsOutput = await suggestLearningMaterials(formData);
      setSuggestions(result.suggestions);
      toast({
        title: "Suggestions Generated!",
        description: "AI has curated some learning materials for you.",
      });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to generate suggestions. Please try again.",
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
            Discover Your Next Learning Adventure
          </CardTitle>
          <CardDescription>Tell us about your learning aspirations, and our AI will suggest relevant materials.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-semibold text-lg">Subject/Topic</Label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g., Python, World History, Quantum Physics" required className="text-base"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="formatPreferences" className="font-semibold text-lg">Preferred Formats (Optional)</Label>
                <Input id="formatPreferences" name="formatPreferences" value={formData.formatPreferences || ''} onChange={handleChange} placeholder="e.g., Videos, Articles, Interactive Quizzes" className="text-base"/>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="learningGoals" className="font-semibold text-lg">Learning Goals</Label>
              <Textarea id="learningGoals" name="learningGoals" value={formData.learningGoals} onChange={handleChange} placeholder="e.g., Build web applications, Understand financial markets, Learn a new language" required rows={3} className="text-base"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests" className="font-semibold text-lg">Your Interests</Label>
              <Textarea id="interests" name="interests" value={formData.interests} onChange={handleChange} placeholder="e.g., Machine learning, Renaissance art, Space exploration" required rows={3} className="text-base"/>
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
                  Suggest Materials
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {suggestions.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline">
              <BookOpen className="mr-3 h-7 w-7 text-primary" />
              Recommended Learning Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-3">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-lg text-foreground hover:text-primary transition-colors duration-200">
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
