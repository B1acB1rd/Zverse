"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ThresholdProps {
    onEnter: () => void
}

export function Threshold({ onEnter }: ThresholdProps) {
    const [isExiting, setIsExiting] = useState(false)
    const [showStory, setShowStory] = useState(false)

    // Trigger Story fade-in after initial load
    useEffect(() => {
        const timer = setTimeout(() => setShowStory(true), 2000)
        return () => clearTimeout(timer)
    }, [])

    // Custom Enter Handler
    const handleEnter = () => {
        setIsExiting(true)
        // Delay real navigation to allow fade-out
        setTimeout(() => {
            onEnter()
        }, 1000)
    }

    return (
        <div className={cn(
            "relative w-full h-screen flex flex-col items-center justify-center overflow-hidden",
            "bg-[#0E1014] text-[#E6E6E6]",
            "transition-opacity duration-[1500ms] ease-in-out",
            isExiting ? "opacity-0" : "opacity-100"
        )}>

            {/* 1. Grain Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                <svg className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* 2. Abstract Ambient Accents */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[10%] w-[50vw] h-[50vw] bg-[#2A2E45] rounded-full blur-[120px] opacity-[0.08] animate-pulse duration-[20s]" />
                <div className="absolute bottom-[-10%] right-[10%] w-[60vw] h-[60vw] bg-[#1E3A36] rounded-full blur-[140px] opacity-[0.06] animate-pulse duration-[30s] delay-1000" />
            </div>

            {/* 3. Hero Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-16 md:space-y-24 max-w-[90vw]">

                {/* LOGO: Stylish, Split-Layer effect */}
                <div className="relative group cursor-default">
                    {/* Main Layer */}
                    <div className="text-4xl md:text-6xl font-light tracking-[0.5em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/60 animate-in fade-in slide-in-from-top-4 duration-[2000ms]">
                        Zverse
                    </div>
                    {/* Ghost Layer (Blur + Drift) */}
                    <div className="absolute inset-0 text-4xl md:text-6xl font-light tracking-[0.5em] uppercase text-indigo-400/20 blur-sm animate-pulse duration-[4000ms] select-none pointer-events-none">
                        Zverse
                    </div>
                </div>

                {/* The Line */}
                <h1 className="text-xl md:text-3xl font-light tracking-wide leading-relaxed max-w-[32ch] opacity-80 animate-in fade-in duration-[3000ms] delay-500">
                    A place that reflects you back.
                </h1>

                {/* The Action */}
                <button
                    onClick={handleEnter}
                    className={cn(
                        "relative group text-sm md:text-base tracking-[0.3em] font-light uppercase px-12 py-6",
                        "transition-all duration-700 ease-out",
                        "hover:tracking-[0.4em] hover:text-white",
                        "focus:outline-none",
                        "animate-in fade-in duration-[4000ms] delay-1000"
                    )}
                >
                    <span className="relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                        Enter the Void
                    </span>
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 blur-2xl rounded-full transition-opacity duration-1000" />
                </button>

            </div>

            {/* 4. The Ghost Story (Bottom Scroller) */}
            <div className={cn(
                "absolute bottom-12 z-10 max-w-md text-center px-6 transition-opacity duration-[2000ms]",
                showStory ? "opacity-100" : "opacity-0"
            )}>
                <div className="space-y-6 text-sm md:text-base font-light tracking-widest leading-loose text-white/30 mix-blend-plus-lighter select-none">
                    <p className="animate-in fade-in slide-in-from-bottom-4 duration-[3000ms] delay-[0ms]">
                        You are tired of performing.
                    </p>
                    <p className="animate-in fade-in slide-in-from-bottom-4 duration-[3000ms] delay-[2000ms]">
                        There are no profiles here. No history.
                    </p>
                    <p className="animate-in fade-in slide-in-from-bottom-4 duration-[3000ms] delay-[4000ms]">
                        Only the resonance of now.
                    </p>
                </div>
            </div>
        </div>
    )
}
