"use client"

import { cn } from "@/lib/utils"

export default function EchoPage() {
    // Mock Aggregate Data
    // In real app, this comes from server aggregation of all active session vibes
    const dominantMood = "heavy" as "heavy" | "calm"

    return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
            {/* Ambient Thermometer */}
            <div className="relative w-64 h-64 md:w-96 md:h-96">
                {/* Core Pulse */}
                <div className={cn(
                    "absolute inset-0 rounded-full blur-[80px] opacity-40 animate-pulse duration-[4000ms]",
                    dominantMood === "heavy" && "bg-[hsl(275,30%,18%)]",
                    dominantMood === "calm" && "bg-[hsl(216,37%,17%)]"
                )} />

                {/* Secondary Drift */}
                <div className={cn(
                    "absolute inset-10 rounded-full blur-[60px] opacity-30 animate-pulse duration-[7000ms] delay-1000",
                    "bg-indigo-900/40"
                )} />
            </div>

            <div className="relative z-10 text-center space-y-2 mix-blend-overlay opacity-60">
                <p className="text-sm uppercase tracking-[0.2em] text-foreground/80">
                    Current Resonance
                </p>
                {/* No numbers. Just visual feeling. */}
            </div>
        </div>
    )
}
