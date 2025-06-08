import { AssessmentGenerator } from '@/components/assessments/AssessmentGenerator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListOrdered, History } from "lucide-react";
import Link from "next/link";

export default function AssessmentsPage() {
  const upcomingAssessments = [
    { id: "js-quiz-1", title: "JavaScript Fundamentals Quiz", subject: "JavaScript", dueDate: "2024-08-15" },
    { id: "python-midterm", title: "Python Midterm Exam", subject: "Python", dueDate: "2024-08-22" },
  ];

  const pastAssessments = [
    { id: "html-basics", title: "HTML Basics Test", subject: "HTML", completedDate: "2024-07-20", score: "85%" },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold font-headline text-primary mb-2">Assessment Center</h1>
        <p className="text-xl text-muted-foreground">Create, manage, and take your assessments.</p>
      </header>
      
      <AssessmentGenerator />

      <section className="mt-12">
        <h2 className="text-3xl font-bold font-headline mb-6 flex items-center">
          <ListOrdered className="mr-3 h-8 w-8 text-primary" />
          Your Assessments
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Upcoming</h3>
            {upcomingAssessments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAssessments.map(assessment => (
                  <Card key={assessment.id} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{assessment.title}</CardTitle>
                      <CardDescription>{assessment.subject} - Due: {assessment.dueDate}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild variant="outline">
                        <Link href={`/assessments/${assessment.id}`}>Start Assessment</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No upcoming assessments. You're all caught up!</p>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <History className="mr-2 h-6 w-6 text-muted-foreground" />
              Past Assessments
            </h3>
            {pastAssessments.length > 0 ? (
              <div className="space-y-4">
                {pastAssessments.map(assessment => (
                  <Card key={assessment.id} className="shadow-md bg-muted/30">
                    <CardHeader>
                      <CardTitle className="text-xl">{assessment.title}</CardTitle>
                      <CardDescription>{assessment.subject} - Completed: {assessment.completedDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold">Score: {assessment.score}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="link" className="text-sm">
                        <Link href={`/assessments/${assessment.id}/review`}>Review Answers</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No past assessments recorded yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
