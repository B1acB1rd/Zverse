"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export interface Story {
    id: string
    text: string
    vibe: "calm" | "reflective" | "heavy" | "tension" | "relief"
}

interface StoryCardProps {
    story: Story
    isVisible: boolean // for entrance animation
}

export function StoryCard({ story, isVisible }: StoryCardProps) {
    const [hasReacted, setHasReacted] = useState(false)

    const handleReaction = () => {
        if (hasReacted) return

        // Haptic feedback (if supported)
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(50)
        }

        setHasReacted(true)

        // Server logic: Record Reaction
        fetch('/api/stories', {
            method: 'POST',
            body: JSON.stringify({ type: 'reaction' })
        }).catch(() => { }) // Fire and forget
    }

    return (
        <article
            className={cn(
                "relative w-full p-8 mb-32 min-h-[40vh] flex items-center justify-center",
                "transition-all duration-1000 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
            onDoubleClick={handleReaction}
        >
            <div className="relative max-w-sm">
                {/* The Text itself is the UI */}
                <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-medium tracking-wide">
                    {story.text}
                </p>

                {/* Invisible Feedback: Subtle Glow on Reaction */}
                <div
                    className={cn(
                        "absolute -inset-8 bg-zinc-100/5 blur-3xl rounded-full transition-opacity duration-1000 pointer-events-none",
                        hasReacted ? "opacity-100" : "opacity-0"
                    )}
                    aria-hidden="true"
                />

                {/* Probabilistic Feedback Message (Only shows sometimes) */}
                {hasReacted && (
                    <div className="absolute -bottom-16 left-0 right-0 text-center animate-in fade-in slide-in-from-top-4 duration-700">
                        <span className="text-xs text-muted-foreground/50 tracking-widest uppercase">
                            Felt
                        </span>
                    </div>
                )}
            </div>

            {/* Screen Reader controls */}
            <button
                className="sr-only"
                onClick={handleReaction}
                aria-pressed={hasReacted}
            >
                React to this story
            </button>
        </article>
    )
}
