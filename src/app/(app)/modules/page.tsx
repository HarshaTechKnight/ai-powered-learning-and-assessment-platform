import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Filter, Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const modules = [
  { id: "python-basics", title: "Python Programming Basics", description: "Learn the fundamentals of Python, including syntax, data types, and control flow.", category: "Programming", image: "https://placehold.co/600x400.png", hint: "python code", difficulty: "Beginner" },
  { id: "js-advanced", title: "Advanced JavaScript Concepts", description: "Dive deep into closures, promises, async/await, and modern JS features.", category: "Programming", image: "https://placehold.co/600x400.png", hint: "javascript code", difficulty: "Intermediate" },
  { id: "data-viz", title: "Data Visualization with D3.js", description: "Create interactive and compelling data visualizations for the web.", category: "Data Science", image: "https://placehold.co/600x400.png", hint: "data chart", difficulty: "Advanced" },
  { id: "digital-marketing", title: "Digital Marketing Fundamentals", description: "Explore SEO, SMM, content marketing, and email marketing strategies.", category: "Business", image: "https://placehold.co/600x400.png", hint: "marketing computer", difficulty: "Beginner" },
  { id: "mindfulness-meditation", title: "Mindfulness and Meditation", description: "Learn techniques to reduce stress and improve focus.", category: "Personal Development", image: "https://placehold.co/600x400.png", hint: "meditation nature", difficulty: "Beginner" },
];

export default function ModulesPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-headline text-primary mb-2 flex items-center">
          <BookOpen className="mr-3 h-10 w-10" />
          Interactive Learning Modules
        </h1>
        <p className="text-xl text-muted-foreground">Expand your knowledge with our curated collection of courses.</p>
      </header>

      <Card className="mb-10 shadow-md">
        <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search modules..." className="pl-10 text-base" />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Select>
              <SelectTrigger className="w-full md:w-[180px] text-base">
                <div className="flex items-center">
                  <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-base">All Categories</SelectItem>
                <SelectItem value="programming" className="text-base">Programming</SelectItem>
                <SelectItem value="data-science" className="text-base">Data Science</SelectItem>
                <SelectItem value="business" className="text-base">Business</SelectItem>
                <SelectItem value="personal-development" className="text-base">Personal Development</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px] text-base">
                 <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter by Difficulty" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-base">All Difficulties</SelectItem>
                <SelectItem value="beginner" className="text-base">Beginner</SelectItem>
                <SelectItem value="intermediate" className="text-base">Intermediate</SelectItem>
                <SelectItem value="advanced" className="text-base">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((module) => (
          <Card key={module.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image src={module.image} alt={module.title} width={600} height={300} className="w-full h-48 object-cover" data-ai-hint={module.hint} />
            <CardHeader className="flex-grow">
              <CardTitle className="font-headline text-xl leading-tight">{module.title}</CardTitle>
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">{module.category}</span>
                <span className="text-xs bg-primary/20 text-primary-foreground px-2 py-0.5 rounded-full">{module.difficulty}</span>
              </div>
              <CardDescription className="pt-2 text-sm line-clamp-3">{module.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/modules/${module.id}`}>Start Learning</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       {modules.length === 0 && (
        <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Modules Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters. New modules are added regularly!</p>
        </div>
      )}
    </div>
  );
}
