"use client"

import { cn } from "@/lib/utils"

export default function MirrorPage() {
    // Mock Ghost State
    // In real app, derived from server state: { vibe, intensity, attachment }
    const ghostState = {
        vibe: "calm",      // Determines Color
        intensity: 0.7,    // Determines Size/Glow
        attachment: 0.8    // Determines Pulse Speed
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
            {/* The Mirror: A single, breathing orb */}
            <div className="relative flex items-center justify-center">

                {/* Core: The Self */}
                <div
                    className={cn(
                        "rounded-full transition-all duration-[2000ms] ease-in-out",
                        "mix-blend-screen bg-opacity-80 shadow-[0_0_100px_rgba(255,255,255,0.1)]",
                        // Vibe Mapping
                        ghostState.vibe === "calm" && "bg-[hsl(216,37%,17%)] shadow-[hsl(216,37%,17%)]/50",
                        ghostState.vibe === "heavy" && "bg-[hsl(275,30%,18%)] shadow-[hsl(275,30%,18%)]/50",
                        // Intensity Mapping (Size)
                        "w-48 h-48 md:w-64 md:h-64",
                        // Attachment Mapping (Pulse Animation)
                        "animate-pulse" // We would custom tune the duration based on attachment
                    )}
                    style={{
                        animationDuration: `${4 / ghostState.attachment}s` // Higher attachment = Faster heartbeat
                    }}
                />

                {/* Reflection: Subtle glow behind */}
                <div
                    className={cn(
                        "absolute inset-0 rounded-full opacity-30 blur-3xl",
                        ghostState.vibe === "calm" && "bg-blue-900",
                        "animate-pulse delay-700"
                    )}
                />

            </div>
        </div>
    )
}
