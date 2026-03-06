import { v4 as uuidv4 } from 'uuid'
import { cookies } from 'next/headers'
import { store, SESSION_TTL } from './store'
import { Mood, GhostEffects, SessionData } from './types'

const COOKIE_NAME = 'zverse_ghost_id'

export async function getSessionId(): Promise<string> {
    const cookieStore = await cookies()
    const cookie = cookieStore.get(COOKIE_NAME)

    if (cookie?.value) {
        return cookie.value
    }

    // New Ghost
    const newId = uuidv4()
    return newId
}

export async function getSession() {
    const id = await getSessionId()
    let session = store.getSession(id)

    // Silent Renewal / Phantom Continuity
    if (!session) {
        // If we had an ID but no session, it expired. 
        // We create a new one, but could potentially seed it from a "long-term" hash if we had one.
        // For MVP, we just start fresh but maybe pick a random vibe to feel "shifted".
        session = store.createSession(id)
    }

    return session
}

export async function setSessionCookie(id: string) {
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: SESSION_TTL / 1000,
        path: '/',
    })
}

// THE GHOST CURTAIN
// Converts raw internal state to client-safe "Effects"
// NEVER returns the raw state object
export function distillGhostEffects(session: SessionData): GhostEffects {
    const { vibe, intensity, paceTolerance } = session.ghost

    // 1. Mood Color Mapping (Note: These match globals.css / Tailwind config)
    const moodColors: Record<Mood, string> = {
        calm: "var(--mood-calm)",
        reflective: "var(--mood-reflective)",
        heavy: "var(--mood-heavy)",
        tension: "var(--mood-tension)",
        relief: "var(--mood-relief)",
    }

    // 2. Pacing Calculation
    // Higher tolerance = shorter delay
    const baseDelay = 1500
    const pacingDelay = Math.max(400, baseDelay * (1 - paceTolerance))

    return {
        moodColor: moodColors[vibe],
        pacingDelay,
        intensity, // Safe to expose 0-1 for visuals
        shouldRipple: intensity > 0.8 // Trigger special visuals if intense
    }
}
