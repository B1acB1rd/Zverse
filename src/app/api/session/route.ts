import { NextResponse } from "next/server"
import { getSession, setSessionCookie, distillGhostEffects } from "@/lib/session"
import { store } from "@/lib/store"
import { Mood } from "@/lib/types"

export async function POST(request: Request) {
    try {
        const session = await getSession()

        // Refresh cookie
        await setSessionCookie(session.id)

        // Parse body for vibe update if present (Onboarding)
        const body = await request.json()
        if (body.vibe && ["heavy", "light", "numb"].includes(body.vibe)) {
            // Map "light" -> "calm", "numb" -> "reflective", "heavy" -> "heavy"
            let seed: Mood = "calm"
            if (body.vibe === "heavy") seed = "heavy"
            if (body.vibe === "numb") seed = "reflective"

            session.ghost.vibe = seed
            // Boost attachment slightly for completing onboarding
            store.updateGhost(session.id, { type: "reaction" })
        }

        return NextResponse.json({
            effects: distillGhostEffects(session)
        })
    } catch (error) {
        return NextResponse.json({ error: "Ghost in the machine" }, { status: 500 })
    }
}

export async function GET() {
    const session = await getSession()
    return NextResponse.json({
        effects: distillGhostEffects(session)
    })
}
