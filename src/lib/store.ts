import { GhostState, SessionData, Mood } from "./types"

// In-Memory Store (MVP only - Reset on restart)
const sessions = new Map<string, SessionData>()

// Constants
export const SESSION_TTL = 24 * 60 * 60 * 1000 // 24 hours
const VIBE_LOCK_THRESHOLD = 0.6
const VIBE_LOCK_INTERACTIONS = 10

// Initial "Seed" State
const createInitialGhost = (seedVibe: Mood = "calm"): GhostState => ({
    vibe: seedVibe,
    intensity: 0.3,
    curiosity: 0.5,
    paceTolerance: 0.5,
    attachment: 0.1,

    isLocked: false,
    interactionCount: 0
})

// Hard Rules: Prevent jarring jumps (The "Eye-Safe" Protocol)
const MOOD_MATRIX: Record<Mood, Mood[]> = {
    calm: ["calm", "reflective", "relief"], // Can't go to Heavy/Tension directly
    reflective: ["calm", "reflective", "heavy", "relief"],
    heavy: ["reflective", "heavy", "tension"],
    tension: ["heavy", "tension", "relief"], // Must resolve to Relief before Calm
    relief: ["tension", "relief", "calm"],
}

export const store = {
    // Session Management
    sessions: new Map<string, SessionData>(),

    getSession(id: string): SessionData | undefined {
        const session = this.sessions.get(id)
        if (!session) return undefined

        // Check TTL
        if (Date.now() - session.createdAt > SESSION_TTL) {
            this.sessions.delete(id)
            return undefined
        }

        // Update activity
        session.lastActiveAt = Date.now()
        return session
    },

    createSession(id: string, seedVibe?: Mood): SessionData {
        const session: SessionData = {
            id,
            createdAt: Date.now(),
            lastActiveAt: Date.now(),
            ghost: createInitialGhost(seedVibe),
            history: []
        }
        this.sessions.set(id, session)
        return session
    },

    // Scoring Engine
    updateGhost(sessionId: string, events: {
        type: "scroll" | "pause" | "reaction" | "drop" | "frantic"
        duration?: number
    }) {
        const session = this.sessions.get(sessionId)
        if (!session) return

        const ghost = session.ghost
        const now = Date.now()
        const timeSinceLast = now - session.lastActiveAt // Use lastActiveAt for cooldown check

        // 1. INVISIBLE COOLDOWN (Stress Test)
        // If interactions are too frantic (< 400ms), dampen the intensity/attachment
        if (timeSinceLast < 400 && events.type !== 'frantic') {
            ghost.intensity = Math.max(0, ghost.intensity - 0.05)
            ghost.paceTolerance = Math.max(0, ghost.paceTolerance - 0.1)
            // Penalize but don't count as standard interaction
            return
        }
        ghost.interactionCount++

        // 2. Scoring Logic
        switch (events.type) {
            case "scroll":
                if ((events.duration || 0) < 2000) {
                    ghost.curiosity = Math.min(1, ghost.curiosity + 0.08)
                    ghost.attachment = Math.max(0, ghost.attachment - 0.05)
                }
                break
            case "pause":
                if ((events.duration || 0) > 6000) {
                    ghost.attachment = Math.min(1, ghost.attachment + 0.18)
                    ghost.intensity = Math.min(1, ghost.intensity + 0.1)
                } else if ((events.duration || 0) > 3000) {
                    ghost.attachment = Math.min(1, ghost.attachment + 0.12)
                }
                break
            case "reaction":
                ghost.attachment = Math.min(1, ghost.attachment + 0.25)
                break
            case "drop":
                ghost.attachment = Math.min(1, ghost.attachment + 0.35)
                break
            case "frantic":
                ghost.paceTolerance = Math.max(0, ghost.paceTolerance - 0.3)
                break
        }

        // 3. Vibe Lock Check
        if (!ghost.isLocked) {
            const explicitInterest = ghost.attachment > VIBE_LOCK_THRESHOLD
            const enoughTime = ghost.interactionCount >= VIBE_LOCK_INTERACTIONS

            if (explicitInterest && enoughTime) {
                ghost.isLocked = true
            }
        }

        // 4. Mood Drift (Dynamic Vibe Shift) with Matrix Rules
        if (!ghost.isLocked && ghost.intensity > 0.8) {
            this.attemptMoodShift(session, 'heavy') // Try shifting to heavy if intense
        } else if (!ghost.isLocked && ghost.intensity < 0.2) {
            this.attemptMoodShift(session, 'calm')
        }
    },

    // Safely attempt to shift mood based on Matrix
    attemptMoodShift(session: SessionData, target: Mood) {
        const current = session.ghost.vibe
        const allowed = MOOD_MATRIX[current]

        if (allowed.includes(target)) {
            session.ghost.vibe = target
        }
        // Else, do nothing (stabilize) or move to bridge - MVP: Do nothing
    },

    // Debug helper
    getDebugState: (id: string) => sessions.get(id)?.ghost
}
