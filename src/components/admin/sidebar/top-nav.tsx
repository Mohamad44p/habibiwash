"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Bell, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import UserProfile from "./UserProfile";
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function TopNav() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Remove 'admin' from segments to avoid duplication
    const segments = pathname?.split('/').filter(Boolean) || [];
    const adminIndex = segments.indexOf('admin');
    const relevantSegments = adminIndex !== -1 ? segments.slice(adminIndex + 1) : segments;
    
    // Always start with Habibiwash -> Admin
    const items: BreadcrumbItem[] = [
      { label: 'Habibiwash', href: '/admin/dashboard' }
    ];

    // Build up the breadcrumbs array
    relevantSegments.forEach((segment, index) => {
      const href = `/admin/${relevantSegments.slice(0, index + 1).join('/')}`;
      const label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      
      items.push({ label, href });
    });

    return items;
  }, [pathname]);

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={`${item.href}-${index}`} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
            )}
            <Link
              href={item.href}
              className={`${
                index === breadcrumbs.length - 1
                  ? 'text-gray-900 dark:text-gray-100 cursor-default pointer-events-none'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              } transition-colors`}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
        </button>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Image
              src="/images/avatar/avatar-01.png"
              alt="User avatar"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
          >
            <UserProfile avatar="/images/avatar/avatar-01.png" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
