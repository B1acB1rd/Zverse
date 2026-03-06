"use client"

import { useState } from "react"
import { VibeSelector } from "@/components/onboarding/VibeSelector"
import { Feed } from "@/components/stories/Feed"
import { Threshold } from "@/components/landing/Threshold"
import { MoodOverlay } from "@/components/layout/MoodOverlay"
import { BottomNav } from "@/components/layout/BottomNav"
import { GhostMonitor } from "@/components/debug/GhostMonitor"

type AppStage = "landing" | "onboarding" | "feed"

export default function Home() {
  const [stage, setStage] = useState<AppStage>("landing")

  // 1. Landing -> Onboarding
  const handleEnter = () => {
    setStage("onboarding")
  }

  // 2. Onboarding -> Feed
  const handleVibeSelect = (vibe: string) => {
    console.log("Vibe selected:", vibe)
    // Session is seeded via VibeSelector internal API call
    setStage("feed")
  }

  return (
    <main className="min-h-screen">

      {/* Stage 1: The Threshold (Landing) */}
      {stage === "landing" && (
        <Threshold onEnter={handleEnter} />
      )}

      {/* Stage 2: Onboarding (Vibe check) */}
      {stage === "onboarding" && (
        <div className="flex flex-col items-center justify-center pt-20 min-h-screen animate-in fade-in duration-1000">
          <VibeSelector onSelect={handleVibeSelect} />
        </div>
      )}

      {/* Stage 3: The Feed */}
      {stage === "feed" && (
        <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-1000">
          <Feed />
        </div>
      )}

      {/* Debug Tool */}
      <GhostMonitor />

    </main>
  )
}
