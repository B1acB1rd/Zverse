"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface VibeSelectorProps {
    onSelect: (vibe: string) => void
}

export function VibeSelector({ onSelect }: VibeSelectorProps) {
    const [isExiting, setIsExiting] = useState(false)

    const vibes = [
        { id: "heavy", label: "Heavy", color: "hover:border-[hsl(275,30%,18%)] hover:bg-[hsl(275,30%,18%)]/10" },
        { id: "light", label: "Light", color: "hover:border-[hsl(216,37%,17%)] hover:bg-[hsl(216,37%,17%)]/10" },
        { id: "numb", label: "Numb", color: "hover:border-[hsl(232,25%,22%)] hover:bg-[hsl(232,25%,22%)]/10" },
    ]

    const handleSelect = async (vibeId: string) => {
        setIsExiting(true)

        // Call Backend
        try {
            await fetch('/api/session', {
                method: 'POST',
                body: JSON.stringify({ vibe: vibeId })
            })
        } catch (e) {
            console.error("Vibe sync failed", e)
        }

        // Delay actual selection to allow exit animation
        setTimeout(() => {
            onSelect(vibeId)
        }, 500)
    }

    return (
        <div className={cn(
            "flex flex-col items-center justify-center min-h-[60vh] space-y-12 transition-opacity duration-500 ease-out",
            isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}>
            <h1 className="text-xl font-medium tracking-wide text-foreground/80 animate-in fade-in slide-in-from-bottom-4 duration-700">
                How does it feel right now?
            </h1>

            <div className="flex flex-col space-y-4 w-full max-w-[200px]">
                {vibes.map((vibe, index) => (
                    <button
                        key={vibe.id}
                        onClick={() => handleSelect(vibe.id)}
                        className={cn(
                            "px-6 py-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm",
                            "text-lg text-muted-foreground transition-all duration-300",
                            "hover:text-foreground hover:scale-105 active:scale-95 focus:outline-none focus:ring-1 focus:ring-ring",
                            vibe.color,
                            // Staggered entrance
                            "animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                        )}
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        {vibe.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
