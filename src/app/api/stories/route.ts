import { NextResponse } from "next/server"
import { getSession, distillGhostEffects } from "@/lib/session"
import { store } from "@/lib/store"
import { Mood } from "@/lib/types"

// Mock Content Database
const STORY_DB = [
    { id: "1", text: "I kept the ticket stub.", vibe: "calm" },
    { id: "2", text: "Sometimes I drive past your old street just to see if the lights are on.", vibe: "reflective" },
    { id: "3", text: "It's quieter than I expected.", vibe: "heavy" },
    { id: "4", text: "And then I realized...", vibe: "tension" },
    { id: "5", text: "The rain stopped, finally.", vibe: "relief" },
    { id: "6", text: "I don't know who I am when I'm not waiting for you.", vibe: "heavy" },
    { id: "7", text: "Just breathe.", vibe: "calm" },
    { id: "8", text: "Is this it?", vibe: "reflective" },
    { id: "9", text: "Run.", vibe: "tension" }
]

export async function GET(request: Request) {
    const session = await getSession()
    const { vibe, isLocked, curiosity } = session.ghost

    // 1. Filter out seen stories
    const unseen = STORY_DB.filter(s => !session.history.includes(s.id))

    // 2. Weighting Logic
    // If Locked: 70% match, 20% adjacent, 10% surprise
    // If Unlocked: 40% match, 30% adjacent, 30% random (high curiosity)

    let candidates = unseen

    // Simple probability filter for MVP
    // If we have candidates matching the vibe, prioritize them
    const matches = unseen.filter(s => s.vibe === vibe)
    const others = unseen.filter(s => s.vibe !== vibe)

    let nextStory = matches[0] // Default to match

    // Ambiguity Injection (Surprise)
    if (Math.random() < (isLocked ? 0.1 : 0.4)) {
        if (others.length > 0) {
            nextStory = others[Math.floor(Math.random() * others.length)]
        }
    } else {
        if (matches.length > 0) {
            nextStory = matches[Math.floor(Math.random() * matches.length)]
        } else {
            nextStory = unseen[0] // Fallback
        }
    }

    if (!nextStory) {
        return NextResponse.json({ empty: true, effects: distillGhostEffects(session) })
    }

    // Record "View"
    session.history.push(nextStory.id)

    return NextResponse.json({
        stories: [nextStory],
        effects: distillGhostEffects(session)
    })
}

// Endpoint for recording interactions (Scrolls, Pauses, Reactions)
export async function POST(request: Request) {
    const session = await getSession()
    try {
        const body = await request.json()
        const { type, duration } = body

        if (type) {
            store.updateGhost(session.id, { type, duration })
        }

        return NextResponse.json({ success: true, effects: distillGhostEffects(session) })
    } catch (e) {
        return NextResponse.json({ error: "Invalid Event" }, { status: 400 })
    }
}
