"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DropPage() {
    const [text, setText] = useState("")
    const [isSending, setIsSending] = useState(false)
    const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([])

    const handleSubmit = () => {
        if (!text.trim() || isSending) return

        setIsSending(true)

        // Trigger Ripple
        const newRipple = { x: 50, y: 50, id: Date.now() } // Center ripple for now
        setRipples([...ripples, newRipple])

        // Simulate "Dropping" into the void
        setTimeout(() => {
            setText("")
            setIsSending(false)
            // Clear ripple after animation
            setTimeout(() => setRipples([]), 1000)
        }, 800)
    }

    return (
        <div className="relative min-h-[70vh] flex flex-col justify-center items-center">
            {/* Ripple Container */}
            {ripples.map((r) => (
                <div
                    key={r.id}
                    className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
                >
                    <div className="w-10 h-10 rounded-full border-2 border-foreground/20 animate-ping duration-[1000ms]" />
                </div>
            ))}

            <div className="w-full max-w-sm space-y-8 relative z-10">
                <label htmlFor="drop-input" className="sr-only">Drop a thought</label>
                <textarea
                    id="drop-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={280}
                    placeholder="Cast it into the void..."
                    className={cn(
                        "w-full bg-transparent text-xl md:text-2xl text-center text-foreground placeholder:text-muted-foreground/30",
                        "resize-none focus:outline-none min-h-[200px]",
                        "transition-opacity duration-500",
                        isSending ? "opacity-0 blur-sm" : "opacity-100"
                    )}
                    disabled={isSending}
                />

                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={!text.trim() || isSending}
                        className={cn(
                            "p-4 rounded-full transition-all duration-500",
                            text.trim() ? "text-foreground opacity-100 scale-100" : "text-muted-foreground opacity-0 scale-90",
                            isSending && "scale-0"
                        )}
                        aria-label="Drop"
                    >
                        <Send strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            {/* Feedback Message (Delayed/Probabilistic in real app) */}
            {isSending && (
                <div className="absolute bottom-20 text-xs tracking-widest text-muted-foreground/60 animate-in fade-in duration-1000">
                    ECHOING...
                </div>
            )}
        </div>
    )
}
