'use client'

import { useState, useEffect } from 'react'

interface CountdownClockProps {
  targetDate: Date
}

export function CountdownClock({ targetDate }: CountdownClockProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    function calculateTimeLeft() {
      const difference = +targetDate - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000)

    return () => clearInterval(timer)
  }, [targetDate])

  const padWithZero = (num: number) => String(num).padStart(2, '0')

  return (
    <div className="bg-[#E32636]/50 backdrop-blur-sm text-white p-4 rounded-lg shadow-md inline-block">
      <div className="text-center mb-2 font-sans text-sm">
        Next date: January 13, 2025
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="text-2xl font-bold font-mono bg-[#E32636]/20 p-2 rounded-md w-14">
              {padWithZero(value)}
            </div>
            <div className="text-xs mt-1 uppercase">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
