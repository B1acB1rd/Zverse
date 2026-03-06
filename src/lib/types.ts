export type Mood = "calm" | "reflective" | "heavy" | "tension" | "relief"

export interface GhostState {
    // primary axis
    vibe: Mood

    // 0.0 - 1.0 vectors
    intensity: number    // How loud/visual is the feedback?
    curiosity: number    // How much variety/ambiguity to inject? (Higher = more surprise)
    paceTolerance: number // How fast is the user consuming? (Higher = faster pacing allowed)
    attachment: number   // How invested is the user? (Higher = more specialized content)

    // session locking
    isLocked: boolean
    interactionCount: number
}

export interface SessionData {
    id: string
    createdAt: number
    lastActiveAt: number
    ghost: GhostState
    history: string[] // IDs of stories seen this session (Ephemeral)
}

// Client-facing "Effects" (NEVER send full state)
export interface GhostEffects {
    moodColor: string // CSS HSL or Class
    pacingDelay: number // ms delay for next story
    intensity: number // 0-1 for visual pulse
    shouldRipple: boolean // Trigger a visual ripple?
}
