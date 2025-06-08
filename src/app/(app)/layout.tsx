import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { AppHeaderMinimal } from '@/components/layout/AppHeaderMinimal';
import { Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

// Simple SVG logo for VidyaAI
const VidyaAiLogo = ({ className }: { className?: string }) => (
  <svg width="currentWidth" height="currentHeight" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen collapsible="icon">
        <Sidebar className="border-r bg-sidebar text-sidebar-foreground">
          <SidebarHeader className="p-3 flex items-center gap-2.5 h-16 border-b">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <VidyaAiLogo className="h-7 w-7 text-sidebar-primary" />
              <h1 className="text-2xl font-bold font-headline text-sidebar-primary group-data-[collapsible=icon]:hidden">
                Vidya<span className="text-sidebar-accent">AI</span>
              </h1>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-3">
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter className="p-3 mt-auto border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: "Settings", side: 'right', align: 'center' }} className="justify-start">
                  <Link href="#"> {/* Placeholder for settings */}
                    <Settings className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: "Logout", side: 'right', align: 'center' }} className="justify-start text-red-500 hover:bg-red-100 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/50 dark:hover:text-red-300">
                  <Link href="/"> {/* Placeholder for logout */}
                    <LogOut className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="bg-background">
          <AppHeaderMinimal />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
