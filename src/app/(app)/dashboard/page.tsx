import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, BookText, CheckSquare, Lightbulb, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-headline text-primary mb-2">Welcome to VidyaAI!</h1>
        <p className="text-xl text-muted-foreground">Your personalized learning journey starts here.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline">
              <Target className="mr-3 h-7 w-7 text-accent" />
              Your Learning Focus
            </CardTitle>
            <CardDescription>Current goals and recommended next steps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-1 text-lg">Introduction to Python</h3>
              <Progress value={66} className="w-full h-3" />
              <p className="text-sm text-muted-foreground mt-1">66% complete</p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg">
              <h4 className="font-semibold text-accent-foreground mb-2 flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-accent"/>Next up: Python Data Structures</h4>
              <p className="text-sm text-muted-foreground mb-3">Dive into lists, dictionaries, and tuples to enhance your Python skills.</p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/modules/python-data-structures">Continue Learning</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-headline">
              <Activity className="mr-3 h-7 w-7 text-accent" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest achievements and interactions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckSquare className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <p className="font-medium">Completed: Variables & Types Quiz</p>
                <p className="text-sm text-muted-foreground">Score: 90%</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <BookText className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-medium">Started: Introduction to JavaScript</p>
                <p className="text-sm text-muted-foreground">15 mins ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-bold font-headline mb-6 flex items-center">
          <Lightbulb className="mr-3 h-8 w-8 text-primary" />
          Recommended For You
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Advanced CSS Techniques", desc: "Master Flexbox, Grid, and modern CSS features.", image: "https://placehold.co/600x400.png", hint: "web design code", link: "/modules/advanced-css" },
            { title: "Data Science Fundamentals", desc: "Explore data analysis, visualization, and basic machine learning.", image: "https://placehold.co/600x400.png", hint: "data science chart", link: "/modules/data-science" },
            { title: "Creative Writing Workshop", desc: "Unleash your inner storyteller with guided exercises.", image: "https://placehold.co/600x400.png", hint: "writing notebook", link: "/modules/creative-writing" },
          ].map((item) => (
            <Card key={item.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image src={item.image} alt={item.title} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={item.hint} />
              <CardHeader>
                <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.desc}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={item.link}>View Module</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold font-headline mb-6 flex items-center">
          <CheckSquare className="mr-3 h-8 w-8 text-primary" />
          Upcoming Assessments
        </h2>
        <div className="space-y-4">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">JavaScript Basics Test</h3>
                        <p className="text-sm text-muted-foreground">Due: Tomorrow, 5:00 PM</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/assessments/js-basics-test">Start Assessment</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">Python Final Project Submission</h3>
                        <p className="text-sm text-muted-foreground">Due: Next Monday</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/assessments/python-final-project">View Details</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
        {/* Placeholder for no upcoming assessments */}
        {/* <p className="text-muted-foreground">No upcoming assessments. Great job staying on top of your work!</p> */}
      </section>
    </div>
  );
}
