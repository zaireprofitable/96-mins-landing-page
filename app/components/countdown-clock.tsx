'use client'

import { useState, useEffect } from 'react'
import { MapPinArea } from '@phosphor-icons/react'

interface CountdownClockProps {
  targetDate: Date
}

export function CountdownClock({ targetDate }: CountdownClockProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextTuesday = new Date(now);
      nextTuesday.setDate(now.getDate() + ((2 + 7 - now.getDay()) % 7));
      nextTuesday.setHours(7, 0, 0, 0);

      if (now > nextTuesday) {
        nextTuesday.setDate(nextTuesday.getDate() + 7);
      }

      const difference = nextTuesday.getTime() - now.getTime();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [])

  const padWithZero = (num: number) => String(num).padStart(2, '0')

  return (
    <div className="bg-[#F1EFEC] text-primary p-4 rounded-lg inline-block tracking-[-0.48px] w-full">
      
      {/* Location badge */}
      <div className="flex justify-center mb-4">
            <span className="text-[1.1rem] tracking-[-0.28px] inline-flex items-center px-3 py-1 rounded-full gap-1">
              Next <MapPinArea size={20} weight="fill" className="text-secondary gap-1" /> <div className="font-medium text-secondary">NYC</div> problem solve:
            </span>
          </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="text-[1.5rem] leading-[1.1] tracking-[-0.02em] font-sans rounded-md w-14">
              {padWithZero(value)}
            </div>
            <div className="text-[1rem] text-muted-foreground capitalize">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


<p className="text-[1.2rem] sm:text-[1.35rem] md:text-[1.4rem] leading-[-0.05rem] leading-[1.2] mt-6 mb-6 text-foreground font-sans w-full max-w-[100%] ">
</p>