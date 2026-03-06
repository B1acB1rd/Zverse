import { Mood } from "./types"

export interface SeedStory {
    id: string
    text: string
    vibe: Mood
}

export const SEED_STORIES: SeedStory[] = [
    // CALM (Blue/Grey - #1B263B) - Grounding, simple, observational
    { id: "c1", text: "The coffee is still warm.", vibe: "calm" },
    { id: "c2", text: "I watched the dust motes dance in the light for twenty minutes.", vibe: "calm" },
    { id: "c3", text: "It’s okay to just exist right now.", vibe: "calm" },
    { id: "c4", text: "The rain stopped. The smell of wet pavement is enough.", vibe: "calm" },
    { id: "c5", text: "No one is expecting anything from you today.", vibe: "calm" },
    { id: "c6", text: "I kept the ticket stub.", vibe: "calm" },
    { id: "c7", text: "The train rhythm is a heartbeat.", vibe: "calm" },
    { id: "c8", text: "Just breathe.", vibe: "calm" },
    { id: "c9", text: "They accepted the apology.", vibe: "calm" },
    { id: "c10", text: "The plants are still alive.", vibe: "calm" },

    // REFLECTIVE (Indigo - #2A2E45) - Nostalgic, questioning, intellectual
    { id: "r1", text: "Sometimes I drive past your old street just to see if the lights are on.", vibe: "reflective" },
    { id: "r2", text: "I wonder if they remember me the way I remember them.", vibe: "reflective" },
    { id: "r3", text: "Was it a mistake, or just a chapter?", vibe: "reflective" },
    { id: "r4", text: "The version of me that loved you doesn't exist anymore.", vibe: "reflective" },
    { id: "r5", text: "I found the letter I never sent.", vibe: "reflective" },
    { id: "r6", text: "Do we inherit our parents' fears?", vibe: "reflective" },
    { id: "r7", text: "I miss who I was before the internet.", vibe: "reflective" },
    { id: "r8", text: "It’s strange how fast a year goes.", vibe: "reflective" },
    { id: "r9", text: "Maybe we were both right.", vibe: "reflective" },
    { id: "r10", text: "I still check your profile sometimes.", vibe: "reflective" },

    // HEAVY (Purple/Black - #2E1F3A) - Depressive, weight, isolation, grief
    { id: "h1", text: "It's quieter than I expected.", vibe: "heavy" },
    { id: "h2", text: "I don't know how to tell them I'm not okay.", vibe: "heavy" },
    { id: "h3", text: "The ceiling fan is the only thing moving.", vibe: "heavy" },
    { id: "h4", text: "I feel like a ghost in my own life.", vibe: "heavy" },
    { id: "h5", text: "Why does it always come back at night?", vibe: "heavy" },
    { id: "h6", text: "I’m tired of being strong.", vibe: "heavy" },
    { id: "h7", text: "The empty chair screams.", vibe: "heavy" },
    { id: "h8", text: "I can't wake up.", vibe: "heavy" },
    { id: "h9", text: "Gravity feels twice as strong today.", vibe: "heavy" },
    { id: "h10", text: "I just want to disappear for a while.", vibe: "heavy" },

    // TENSION (Red/Pink - #3A1F2E) - Anxiety, urgency, fear, cliffhangers
    { id: "t1", text: "And then I realized...", vibe: "tension" },
    { id: "t2", text: "Don't look behind you.", vibe: "tension" },
    { id: "t3", text: "They know.", vibe: "tension" },
    { id: "t4", text: "The phone rang at 3 AM.", vibe: "tension" },
    { id: "t5", text: "I shouldn't have said that.", vibe: "tension" },
    { id: "t6", text: "It’s getting closer.", vibe: "tension" },
    { id: "t7", text: "Can you hear it?", vibe: "tension" },
    { id: "t8", text: "We have to leave. Now.", vibe: "tension" },
    { id: "t9", text: "Wait—that wasn’t there before.", vibe: "tension" },
    { id: "t10", text: "Run.", vibe: "tension" },

    // RELIEF (Teal/Green - #1E3A36) - Release, clarity, nature, forgiveness
    { id: "l1", text: "The fever broke.", vibe: "relief" },
    { id: "l2", text: "They said yes.", vibe: "relief" },
    { id: "l3", text: "Finally, silence.", vibe: "relief" },
    { id: "l4", text: "The knot in my chest loosened.", vibe: "relief" },
    { id: "l5", text: "I forgave myself.", vibe: "relief" },
    { id: "l6", text: "The ocean took it away.", vibe: "relief" },
    { id: "l7", text: "It wasn’t cancer.", vibe: "relief" },
    { id: "l8", text: "We made it.", vibe: "relief" },
    { id: "l9", text: "The sun came out.", vibe: "relief" },
    { id: "l10", text: "I don't have to hide anymore.", vibe: "relief" },
]
