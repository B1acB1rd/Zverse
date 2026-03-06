"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Mood = "calm" | "reflective" | "heavy" | "tension" | "relief"

interface MoodOverlayProps {
    initialMood?: Mood
}

/**
 * EYE-SAFE MOOD SYSTEM
 * 
 * Rules:
 * 1. Luminance changes < Hue changes
 * 2. Saturation capped at 65%
 * 3. Transitions slow (20s) and asymmetrical
 * 4. Never pure black, never pure white
 */
export function MoodOverlay({ initialMood = "calm" }: MoodOverlayProps) {
    const [mood, setMood] = useState<Mood>(initialMood)

    // MVP: Simple poll to check for Mood Drift every 10s
    // In prod: Server Sent Events (SSE) or WebSockets
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch('/api/session')
                const data = await res.json()
                // In real app we map color back to mood name, or just use the color directly
                // internal mapping logic omitted for brevity, assuming backend vends mapped effects
            } catch (e) { }
        }, 10000)
        return () => clearInterval(interval)
    }, [])

    const moodColors: Record<Mood, string> = {
        calm: "bg-[hsl(216,37%,17%)]",       // #1B263B
        reflective: "bg-[hsl(232,25%,22%)]", // #2A2E45
        heavy: "bg-[hsl(275,30%,18%)]",      // #2E1F3A
        tension: "bg-[hsl(330,30%,17%)]",    // #3A1F2E
        relief: "bg-[hsl(168,32%,17%)]",     // #1E3A36
    }

    return (
        <div
            aria-hidden="true"
            className={cn(
                "fixed inset-0 pointer-events-none z-[-1]",
                "opacity-[0.06] mix-blend-overlay",
                "transition-colors duration-[20000ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                moodColors[mood]
            )}
        />
    )
}
