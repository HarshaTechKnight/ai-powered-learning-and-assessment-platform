import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

// This is a placeholder. In a real app, you'd fetch assessment data.
async function getAssessmentDetails(assessmentId: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  if (assessmentId === "js-quiz-1") {
    return {
      id: "js-quiz-1",
      title: "JavaScript Fundamentals Quiz",
      description: "Test your knowledge of basic JavaScript concepts.",
      timeLimitMinutes: 30,
      questions: [
        { id: "q1", type: "multiple-choice", text: "What keyword is used to declare a variable in JavaScript that cannot be reassigned?", options: ["let", "var", "const", "static"] },
        { id: "q2", type: "fill-in-the-blanks", text: "A JavaScript function is defined with the ______ keyword." },
        { id: "q3", type: "short-answer", text: "Explain the difference between `==` and `===` in JavaScript." },
      ]
    };
  }
  return null; // Assessment not found
}

export default async function TakeAssessmentPage({ params }: { params: { assessmentId: string } }) {
  const assessment = await getAssessmentDetails(params.assessmentId);

  if (!assessment) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-0 text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive mb-2">Assessment Not Found</h1>
        <p className="text-muted-foreground">The assessment you are looking for does not exist or is no longer available.</p>
        <Button asChild variant="link" className="mt-4">
          <a href="/assessments">Back to Assessments</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Card className="shadow-xl">
        <CardHeader className="border-b">
          <CardTitle className="text-3xl font-headline text-primary">{assessment.title}</CardTitle>
          <CardDescription className="text-lg">{assessment.description}</CardDescription>
          <div className="flex items-center text-muted-foreground pt-2">
            <Clock className="h-5 w-5 mr-2" />
            <span>Time Limit: {assessment.timeLimitMinutes} minutes</span>
          </div>
        </CardHeader>
        <CardContent className="pt-8 space-y-10">
          {assessment.questions.map((q, index) => (
            <div key={q.id} className="p-6 border rounded-lg shadow-sm bg-card">
              <p className="text-lg font-semibold mb-4">Question {index + 1}: <span className="font-normal">{q.text}</span></p>
              {q.type === "multiple-choice" && q.options && (
                <RadioGroup>
                  {q.options.map(option => (
                    <div key={option} className="flex items-center space-x-3 mb-2 p-2 rounded-md hover:bg-muted transition-colors">
                      <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                      <Label htmlFor={`${q.id}-${option}`} className="text-base font-normal cursor-pointer flex-1">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              {q.type === "fill-in-the-blanks" && (
                <Input type="text" placeholder="Your answer here" className="text-base" />
              )}
              {q.type === "short-answer" && (
                <Textarea placeholder="Type your answer..." rows={4} className="text-base" />
              )}
            </div>
          ))}
          <div className="mt-10 flex justify-end">
            <Button size="lg" className="text-lg px-8 py-4">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Submit Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
