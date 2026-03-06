"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Activity, Plus, Ghost } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
    const pathname = usePathname()

    const navItems = [
        {
            label: "Stories",
            href: "/",
            icon: BookOpen,
            ariaLabel: "Feed",
        },
        {
            label: "Echo",
            href: "/echo",
            icon: Activity, // Represents the 'Thermometer' / Pulse
            ariaLabel: "Ambient Moods",
        },
        {
            label: "Drop",
            href: "/drop",
            icon: Plus,
            ariaLabel: "Post a Story",
        },
        {
            label: "Mirror",
            href: "/mirror",
            icon: Ghost,
            ariaLabel: "Your Reflection",
        },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/10 bg-background/80 backdrop-blur-lg pb-safe">
            <div className="flex items-center justify-around h-16 max-w-md mx-auto px-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-label={item.ariaLabel}
                            className={cn(
                                "flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                isActive
                                    ? "text-foreground scale-110"
                                    : "text-muted-foreground hover:text-foreground/80"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "w-6 h-6 transition-transform duration-300",
                                    isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"
                                )}
                            />
                            <span className="sr-only">{item.label}</span>
                            {/* Subtle active indicator dot */}
                            {isActive && (
                                <span className="absolute -bottom-1 w-1 h-1 bg-foreground rounded-full animate-in fade-in zoom-in duration-300" />
                            )}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
