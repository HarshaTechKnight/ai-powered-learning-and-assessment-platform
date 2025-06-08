"use client";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

const getTitleFromPathname = (pathname: string): string => {
  if (pathname.includes('/dashboard')) return 'Dashboard';
  if (pathname.includes('/curation')) return 'Discover Content';
  if (pathname.includes('/modules/')) return 'Learning Module';
  if (pathname.includes('/modules')) return 'My Learning';
  if (pathname.includes('/assessments/')) return 'Assessment';
  if (pathname.includes('/assessments')) return 'Assessments';
  if (pathname.includes('/progress')) return 'My Progress';
  
  const S = (s:string) => s.charAt(0).toUpperCase() + s.slice(1);
  const pageName = pathname.split('/').filter(Boolean).pop() || 'Page';
  return pageName.split('-').map(S).join(' ');
};

export function AppHeaderMinimal() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:hidden">
      <SidebarTrigger className="shrink-0" />
      <h1 className="flex-1 text-xl font-semibold font-headline text-foreground truncate">{title}</h1>
    </header>
  );
}
