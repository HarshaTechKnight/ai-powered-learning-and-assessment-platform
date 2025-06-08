import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Film, FileText, Layers, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// This is a placeholder. In a real app, you'd fetch module data.
async function getModuleDetails(moduleId: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  const modulesData: { [key: string]: any } = {
    "python-basics": { 
      id: "python-basics", 
      title: "Python Programming Basics", 
      description: "An introduction to the fundamental concepts of Python programming, suitable for absolute beginners. Cover syntax, data types, variables, operators, and control flow structures like loops and conditionals.",
      category: "Programming", 
      difficulty: "Beginner",
      image: "https://placehold.co/800x450.png",
      hint: "python code computer",
      contentSections: [
        { title: "Introduction to Python", type: "video", duration: "10 min", icon: Film },
        { title: "Setting up Your Environment", type: "article", duration: "15 min read", icon: FileText },
        { title: "Variables and Data Types", type: "interactive", duration: "25 min", icon: Zap },
        { title: "Control Flow (If/Else, Loops)", type: "video", duration: "18 min", icon: Film },
        { title: "Basic Syntax Quiz", type: "quiz", duration: "10 min", icon: CheckCircle },
      ]
    },
     "js-advanced": {
      id: "js-advanced",
      title: "Advanced JavaScript Concepts",
      description: "Explore asynchronous JavaScript, closures, prototypes, and modern ES6+ features to write more efficient and powerful code.",
      category: "Programming",
      difficulty: "Intermediate",
      image: "https://placehold.co/800x450.png",
      hint: "javascript abstract code",
      contentSections: [
        { title: "Understanding Closures", type: "article", duration: "20 min read", icon: FileText },
        { title: "Promises and Async/Await", type: "video", duration: "25 min", icon: Film },
        { title: "Prototypal Inheritance", type: "interactive", duration: "30 min", icon: Zap },
        { title: "ES6+ Features Deep Dive", type: "article", duration: "35 min read", icon: FileText },
        { title: "Advanced Concepts Quiz", type: "quiz", duration: "15 min", icon: CheckCircle },
      ]
    }
  };
  return modulesData[moduleId] || null;
}

export default async function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = await getModuleDetails(params.moduleId);

  if (!module) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold">Module not found</h1>
        <Link href="/modules" className="text-primary hover:underline mt-4 inline-block">
          Back to modules
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-xl overflow-hidden">
            <div className="relative w-full h-64 md:h-96">
              <Image src={module.image} alt={module.title} layout="fill" objectFit="cover" data-ai-hint={module.hint} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-4xl font-bold font-headline text-white mb-2">{module.title}</h1>
                <div className="flex items-center space-x-3">
                  <span className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-full font-medium">{module.category}</span>
                  <span className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded-full font-medium">{module.difficulty}</span>
                </div>
              </div>
            </div>
            
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold font-headline mb-3">About this Module</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{module.description}</p>

              <h2 className="text-2xl font-semibold font-headline mb-4">Module Content</h2>
              <Accordion type="single" collapsible className="w-full">
                {module.contentSections.map((section: any, index: number) => (
                  <AccordionItem value={`item-${index}`} key={index} className="border-b">
                    <AccordionTrigger className="py-5 text-lg hover:no-underline">
                      <div className="flex items-center">
                        <section.icon className="mr-3 h-6 w-6 text-primary" />
                        {section.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pl-10">
                      <p className="text-muted-foreground mb-2">Type: {section.type}</p>
                      <p className="text-muted-foreground mb-3">Estimated duration: {section.duration}</p>
                      <Button variant="outline" size="sm">
                        {section.type === "quiz" ? "Start Quiz" : section.type === "video" ? "Watch Video" : "Read Content"}
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Layers className="mr-2 h-6 w-6 text-accent" />
                Module Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="flex justify-between"><span>Sections:</span> <span className="font-medium">{module.contentSections.length}</span></p>
              <p className="flex justify-between"><span>Total Estimated Time:</span> <span className="font-medium">~2 hours</span></p> {/* Placeholder */}
              <p className="flex justify-between"><span>Difficulty:</span> <span className="font-medium text-primary">{module.difficulty}</span></p>
              <Button className="w-full mt-4" size="lg">Start Module</Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <CheckCircle className="mr-2 h-6 w-6 text-accent" />
                What you'll learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Understand core Python syntax.</li>
                <li>Work with variables and different data types.</li>
                <li>Implement control flow using loops and conditionals.</li>
                <li>Write basic Python scripts.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
