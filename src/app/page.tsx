
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Simple SVG logo for VidyaAI
const VidyaAiLogo = ({ className }: { className?: string }) => (
  <svg width="currentWidth" height="currentHeight" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-50 text-foreground p-6">
      <main className="text-center space-y-8 max-w-3xl">
        <div className="flex justify-center items-center space-x-3 mb-6">
          <VidyaAiLogo className="h-16 w-16 text-primary" />
          <h1 className="text-6xl font-headline font-bold">
            <span className="text-primary">Vidya</span><span className="text-accent">AI</span>
          </h1>
        </div>
        
        <p className="text-2xl text-muted-foreground leading-relaxed">
          Unlock your potential with AI-driven learning paths, personalized content, and dynamic assessments.
        </p>
        
        <p className="text-lg text-muted-foreground">
          VidyaAI helps you master new skills effectively by tailoring your educational journey to your unique goals and interests.
        </p>

        <div>
          <Button asChild size="lg" className="font-body text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link href="/login"> {/* Changed to /login */}
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>
      
      <footer className="absolute bottom-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} VidyaAI. All rights reserved.
      </footer>
    </div>
  );
}
