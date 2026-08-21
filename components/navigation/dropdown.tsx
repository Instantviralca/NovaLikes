'use client';

import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { prefetchForHref } from '@/lib/linking/prefetch';

export type NavDropdownItem = {
  label: string;
  href: string;
};

export interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
  triggerClassName?: string;
}

export function NavDropdown({ label, items, triggerClassName }: NavDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName}>{label}</DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href} prefetch={prefetchForHref(item.href)}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
