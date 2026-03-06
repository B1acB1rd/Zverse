"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function GhostMonitor() {
    const [stats, setStats] = useState<any>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // Toggle with 'D' key
        const down = (e: KeyboardEvent) => {
            if (e.key === 'd' && e.ctrlKey) {
                e.preventDefault()
                setVisible(prev => !prev)
            }
        }
        document.addEventListener('keydown', down)

        // Polling
        const interval = setInterval(async () => {
            if (!visible) return
            try {
                const res = await fetch('/api/debug')
                const data = await res.json()
                setStats(data)
            } catch (e) { }
        }, 1000)

        return () => {
            document.removeEventListener('keydown', down)
            clearInterval(interval)
        }
    }, [visible])

    if (!visible) return (
        <div className="fixed bottom-2 right-2 z-50 opacity-30 hover:opacity-100 text-[10px] text-white/50 cursor-pointer" onClick={() => setVisible(true)}>
            [Ghost Monitor: Ctrl+D]
        </div>
    )

    if (!stats || !stats.ghost) return null

    const { vibe, intensity, curiosity, paceTolerance, attachment, isLocked } = stats.ghost

    return (
        <div className="fixed bottom-4 right-4 z-[100] w-64 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4 font-mono text-xs text-white/80 shadow-2xl">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <span className="font-bold text-white uppercase tracking-widest">Ghost Engine</span>
                <button onClick={() => setVisible(false)} className="hover:text-white">x</button>
            </div>

            <div className="space-y-3">
                {/* VIBE */}
                <div className="flex justify-between">
                    <span>Vibe</span>
                    <span className={cn(
                        "uppercase font-bold",
                        isLocked ? "text-red-400" : "text-blue-400"
                    )}>
                        {vibe} {isLocked && "(LOCKED)"}
                    </span>
                </div>

                {/* Bars */}
                <StatBar label="Intensity" value={intensity} color="bg-purple-500" />
                <StatBar label="Attachment" value={attachment} color="bg-pink-500" />
                <StatBar label="Curiosity" value={curiosity} color="bg-blue-500" />
                <StatBar label="Pace Tol." value={paceTolerance} color="bg-yellow-500" />

                <div className="pt-2 text-[10px] text-white/40 flex justify-between">
                    <span>Interactions: {stats.historyCount}</span>
                    <span>ID: ...{stats.ghost?.vibe?.substring(0, 0)}</span> {/* Obfuscated */}
                </div>
            </div>
        </div>
    )
}

function StatBar({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase opacity-70">
                <span>{label}</span>
                <span>{value.toFixed(2)}</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-500", color)}
                    style={{ width: `${Math.max(0, Math.min(100, value * 100))}%` }}
                />
            </div>
        </div>
    )
}
