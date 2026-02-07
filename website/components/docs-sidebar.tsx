"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';

interface DocItem {
    slug: string;
    title: string;
}

interface DocsSidebarProps {
    items: DocItem[];
}

export function DocsSidebar({ items }: DocsSidebarProps) {
    const pathname = usePathname();

    return (
        <div className="w-full">
            <div className="flex flex-col gap-1 py-2">
                {items.map((item) => {
                    const isActive = pathname === `/docs/${item.slug}`;
                    return (
                        <Link
                            key={item.slug}
                            href={`/docs/${item.slug}`}
                            className={cn(
                                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                            )}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
