
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, BookOpenText, ClipboardCheck, BarChart3, SearchCode, UserCircle } from 'lucide-react'; // Added UserCircle

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/curation', label: 'Discover', icon: SearchCode },
  { href: '/modules', label: 'My Learning', icon: BookOpenText },
  { href: '/assessments', label: 'Assessments', icon: ClipboardCheck },
  { href: '/progress', label: 'My Progress', icon: BarChart3 },
  { href: '/profile', label: 'My Profile', icon: UserCircle }, // Added Profile
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
            tooltip={{ children: item.label, side: 'right', align: 'center' }}
            className="justify-start"
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
