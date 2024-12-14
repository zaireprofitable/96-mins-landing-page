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
    <div className="bg-[#F1EFEC] text-primary p-4 rounded-lg inline-block">
      <div className="text-center mb-2 font-serif text-[18px]">
        Next 'Problem Solve' in
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="text-[28px] leading-[1.1] tracking-sm font-sans rounded-md w-14">
              {padWithZero(value)}
            </div>
            <div className="text-[18px] text-muted-foreground capitalize">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


<p className="text-[1.2rem] sm:text-[1.35rem] md:text-[1.4rem] leading-[-0.05rem] leading-[1.2] mt-6 mb-6 text-foreground font-sans w-full max-w-[100%] ">
</p>