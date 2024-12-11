'use client'

import { useState, useEffect } from 'react'

interface CountdownClockProps {
  targetDate: Date
}

export function CountdownClock({ targetDate }: CountdownClockProps) {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date()
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const padWithZero = (num: number) => String(num).padStart(2, '0')

  if (!mounted) {
    return (
      <div className="bg-white text-black p-4 rounded-lg shadow-md inline-block">
        <div className="text-center mb-2 font-sans">
          Next session: January 13, 2025
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="text-2xl font-bold font-mono bg-gray-200 p-2 rounded-md w-14">
                00
              </div>
              <div className="text-xs mt-1 uppercase">{unit}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-md inline-block">
      <div className="text-center mb-2 font-sans">
        Next session: January 13, 2025
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="text-2xl font-bold font-mono bg-gray-200 p-2 rounded-md w-14">
              {padWithZero(value)}
            </div>
            <div className="text-xs mt-1 uppercase">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
