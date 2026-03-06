import { NextResponse } from "next/server"
import { getSessionId } from "@/lib/session"
import { store } from "@/lib/store"

export async function GET() {
    // SECURITY: In prod, check for an admin token or disable entirely
    // if (process.env.NODE_ENV === 'production') return NextResponse.json({}, { status: 403 })

    const id = await getSessionId()
    const session = store.getSession(id)

    if (!session) return NextResponse.json({ error: "No Ghost" })

    return NextResponse.json({
        ghost: session.ghost,
        historyCount: session.history.length
    })
}
