"use client"

import { useEffect, useState, useRef } from "react"
import { Story, StoryCard } from "./StoryCard"

export function Feed() {
    const [stories, setStories] = useState<Story[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch from Backend
    useEffect(() => {
        let mounted = true

        async function fetchStories() {
            try {
                const res = await fetch('/api/stories')
                const data = await res.json()
                if (mounted && data.stories) {
                    // In a real app we would append to list, for now just set
                    setStories(data.stories)

                    // If backend sends pacing delay, we could respect it here
                    if (data.effects?.pacingDelay) {
                        // console.log("Ghost requests slow down:", data.effects.pacingDelay)
                    }
                }
            } catch (e) {
                console.error("Ghost unreachable")
            } finally {
                if (mounted) setLoading(false)
            }
        }

        fetchStories()

        return () => { mounted = false }
    }, [])

    return (
        <div className="flex flex-col w-full pb-32">
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                    {/* Invisible Pacing Loading State (Breathing) */}
                    <div className="w-2 h-2 bg-foreground/20 rounded-full animate-pulse" />
                </div>
            ) : (
                stories.map((story, index) => (
                    <StoryCard
                        key={story.id}
                        story={story}
                        isVisible={true} // In real app, use IntersectionObserver
                    />
                ))
            )}

            {/* Infinite Scroll Trigger would go here */}
            {!loading && (
                <div className="h-32 flex items-center justify-center">
                    <div className="w-1 h-1 bg-foreground/10 rounded-full" />
                </div>
            )}
        </div>
    )
}
