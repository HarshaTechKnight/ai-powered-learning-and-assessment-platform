
import type { ReactNode } from 'react';
import Link from 'next/link';

// Simple SVG logo for VidyaAI
const VidyaAiLogo = ({ className }: { className?: string }) => (
  <svg width="currentWidth" height="currentHeight" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2.5">
          <VidyaAiLogo className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold font-headline">
            <span className="text-primary">Vidya</span><span className="text-accent">AI</span>
          </h1>
        </Link>
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
      <footer className="absolute bottom-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} VidyaAI. All rights reserved.
      </footer>
    </div>
  );
}
