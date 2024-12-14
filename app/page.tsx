'use client'

import { EmailForm } from './components/email-form'
import { CountdownClock } from './components/countdown-clock'
import Link from 'next/link'
import { LinkedinLogo, MapPinArea } from "@phosphor-icons/react"

export default function Home() {
  // Set the next session date for the countdown timer (January 13, 2025 at 7 AM EST)
  const nextSessionDate = new Date('2025-01-13T07:00:00-05:00')

  return (
    // Main container with full viewport height and overflow control
    <div className="relative flex flex-col overflow-x-hidden">
      {/* Header section with branding and social link */}
      <div className="pt-20 pb-0 text-center">
        <h2 className="font-tanker text-[48px] text-secondary font-medium tracking-[-0.15rem]">96Mins</h2>
        <span className="text-[20px] mt-1 inline-flex items-center gap-1">
          Connect on 
          <Link
            href="https://www.linkedin.com/in/zca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-muted-foreground transition-colors"
          >
            <div className="text-secondary font-bold inline-flex items-center gap-1">
              <LinkedinLogo size={24} weight="fill" />
              LinkedIn
            </div>
          </Link>
        </span>
      </div>

      {/* Main content section with centered layout */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl px-4 text-center">
          {/* Hero heading with decorative stars */}
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[2.7rem] leading-[1.1] tracking-sm mx-auto max-w-[90%] font-crimson Pro font-medium tracking-tighter relative px-2">
            Ambitious people get unstuck together every Tuesday @7am
          </h1>

          {/* Avatar grid */}
          <div className="flex flex-wrap justify-center gap-6 max-w-md mx-auto pt-12 pb-8">
            <div className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] max-w-[120px] aspect-square rounded-full bg-[#FFE4E1] overflow-hidden">
              <img src="https://ucarecdn.com/4d806a12-a5cb-46c9-89a0-86cbf608ae78/10.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] max-w-[120px] aspect-square rounded-full bg-secondary flex items-center justify-center text-white text-xl">
              <span>You?</span>
            </div>
            <div className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] max-w-[120px] aspect-square rounded-full bg-[#E0F4F1] overflow-hidden">
              <img src="https://ucarecdn.com/6cb09092-da3e-43f4-9225-5b904997bedc/-/preview/300x300/" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] max-w-[120px] aspect-square rounded-full bg-[#E8F5E9] overflow-hidden">
              <img src="https://ucarecdn.com/ca49b19a-9bac-4488-82e5-a4aa27b71aa9/-/preview/300x300/" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] max-w-[120px] aspect-square rounded-full bg-[#FFF3E0] overflow-hidden">
              <img src="https://ucarecdn.com/814fc47e-98e6-47d1-b428-aabb73649ebc/-/preview/300x300/" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] max-w-[120px] aspect-square rounded-full bg-[#E0F7FA] overflow-hidden">
              <img src="https://ucarecdn.com/9470832c-5568-4be5-8bc0-14b8c2bf8f5d/-/preview/300x300/" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Description text */}
          <div className="flex justify-center text-center">
            <p className="text-[1.2rem] sm:text-[1.35rem] md:text-[1.4rem] leading-[-0.05rem] leading-[1.3] mt-2 mb-6 text-foreground font-sans w-full max-w-[100%] ">
              Meet and share work or career challenges with 5 others who get it. Walk away with real solutions.
            </p>
          </div>

          {/* Email signup form component */}
          <div className="mb-1">
            <EmailForm />
          </div>

          {/* Location badge */}
          <div className="flex justify-center mb-4">
            <span className="text-[20px] inline-flex items-center px-3 py-1 rounded-full">
              Currently in 
              <span className="text-secondary font-bold px-1 inline-flex items-center gap-1">
                <MapPinArea size={24} weight="fill" /> NYC
              </span>
            </span>
          </div>

          {/* Countdown timer component */}
          <div className="mb-6">
            <CountdownClock targetDate={nextSessionDate} />
          </div>
        </div>
      </div>
    </div>
  )
}
