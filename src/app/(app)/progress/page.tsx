"use client"; // Required for Recharts and other client-side interactions

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, Activity, TrendingUp, BookOpen, Award, Target } from "lucide-react";

const overallProgressData = [
  { name: 'Python Basics', completed: 80, toComplete: 20 },
  { name: 'JS Advanced', completed: 45, toComplete: 55 },
  { name: 'Data Viz', completed: 60, toComplete: 40 },
  { name: 'Marketing', completed: 20, toComplete: 80 },
];

const assessmentScoresData = [
  { name: 'HTML Quiz', score: 85 },
  { name: 'CSS Test', score: 78 },
  { name: 'JS Intro', score: 92 },
  { name: 'Python Variables', score: 60 },
];

const timeSpentData = [
  { name: 'Programming', value: 400 },
  { name: 'Data Science', value: 300 },
  { name: 'Business', value: 200 },
  { name: 'Personal Dev', value: 100 },
];
const COLORS = ['#64B5F6', '#FFCA28', '#81C784', '#FF8A65']; // Primary, Accent, Green, Orange

export default function ProgressPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-headline text-primary mb-2 flex items-center">
          <TrendingUp className="mr-3 h-10 w-10" />
          Your Learning Progress
        </h1>
        <p className="text-xl text-muted-foreground">Track your achievements and stay motivated on your learning journey.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
            <BookOpen className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">Across all assessments</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
            <Award className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Python, JS, HTML</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Module Completion Status</CardTitle>
            <CardDescription>Overview of your progress in various learning modules.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {overallProgressData.map(item => (
              <div key={item.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-primary">{item.completed}%</span>
                </div>
                <Progress value={item.completed} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Assessment Scores</CardTitle>
            <CardDescription>Your performance in recent assessments.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assessmentScoresData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip wrapperClassName="!bg-popover !border-border !shadow-lg !rounded-md" cursor={{fill: 'hsl(var(--accent)/0.1)'}}/>
                <Legend iconSize={10} wrapperStyle={{fontSize: "12px"}}/>
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30}/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Time Spent Learning (by Category)</CardTitle>
           <CardDescription>Distribution of your learning time across different subject categories.</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] w-full flex justify-center">
           <ResponsiveContainer width="100%" height="100%" className="max-w-md">
            <PieChart>
              <Pie
                data={timeSpentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {timeSpentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperClassName="!bg-popover !border-border !shadow-lg !rounded-md" />
              <Legend iconSize={10} wrapperStyle={{fontSize: "12px"}}/>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}
