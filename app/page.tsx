'use client'

import { EmailForm } from './components/email-form'
import { CountdownClock } from './components/countdown-clock'
import { RotatingAvatars } from "./components/rotating-avatars"
import { LoadingAnimation } from './components/loading-animation'
import Link from 'next/link'
import { LinkedinLogo, MapPinArea } from "@phosphor-icons/react"
import { useState, useEffect } from 'react'

const avatarImages = [
  "https://ucarecdn.com/83017205-d153-469e-aff5-bde35749a826/9.png",
  "https://ucarecdn.com/4d806a12-a5cb-46c9-89a0-86cbf608ae78/10.png",
  "https://ucarecdn.com/6cb09092-da3e-43f4-9225-5b904997bedc/8.png",
  "https://ucarecdn.com/07907f16-e7a8-4a67-8ab5-3c49731acf6f/4.png",
  "https://ucarecdn.com/ca49b19a-9bac-4488-82e5-a4aa27b71aa9/3.png",
  "https://ucarecdn.com/9470832c-5568-4be5-8bc0-14b8c2bf8f5d/7.png",
  "https://ucarecdn.com/6d0c6bb5-3296-49d4-b048-eabaae3d2910/1.png",
  "https://ucarecdn.com/5f9786dd-bec4-4dca-9442-286f9c86bc9c/2.png",
  "https://ucarecdn.com/0b789cce-e27a-466e-92a1-7f06f7a3c9b0/5.png"
].filter((value, index, self) => self.indexOf(value) === index);

export default function Alternative() {
  // Set the next session date for the countdown timer (January 13, 2025 at 7 AM EST)
  const nextSessionDate = new Date('2025-01-13T07:00:00-05:00')

  const [currentAvatars, setCurrentAvatars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload images
    const preloadImages = async () => {
      const loadImage = (src: string) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
      };

      try {
        await Promise.all(avatarImages.map(src => loadImage(src)));
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };

    preloadImages();

    // Function to get 5 random avatars
    const getRandomAvatars = () => {
      const shuffled = [...avatarImages].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 5);
    };

    // Initial set of avatars
    setCurrentAvatars(getRandomAvatars());

    // Rotate avatars every 4 seconds
    const interval = setInterval(() => {
      setCurrentAvatars(getRandomAvatars());
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Header section with branding and social link */}
      <div className="pt-20 text-center">
        <h2 className="font-tanker text-[48px] text-secondary font-medium tracking-[-0.15rem]">96Mins</h2>
      </div>

      {/* Main content section with centered layout */}
      <div className="items-center justify-center">
        <div className="w-full max-w-3xl px-4 text-center">
          {/* Hero heading with decorative stars */}
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[2.7rem] leading-[1.1] tracking-sm mx-auto max-w-[90%] font-primary font-serif tracking-tighter relative px-2">
            Ambitious people get unstuck together every Tuesday @ 7am
          </h1>

          {/* Avatar grid */}
          <div className="flex flex-wrap justify-center gap-6 max-w-md mx-auto pt-12 pb-8">
            {isLoading ? (
              <div className="col-span-full flex items-center justify-center py-8">
                <LoadingAnimation />
              </div>
            ) : (
              <>
                {currentAvatars.slice(0, 1).map((avatar, index) => (
                  <div key={`first-${avatar}`} className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] max-w-[120px] aspect-square rounded-full bg-[#FFE4E1] overflow-hidden">
                    <img 
                      src={avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover transition-opacity duration-500 ease-in opacity-0 hover:opacity-100" 
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.opacity = '1';
                      }}
                    />
                  </div>
                ))}
                <div className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] max-w-[120px] aspect-square rounded-full bg-secondary flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl">
                  <span>You?</span>
                </div>
                {currentAvatars.slice(1, 2).map((avatar, index) => (
                  <div key={`second-${avatar}`} className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] max-w-[120px] aspect-square rounded-full bg-[#E0F4F1] overflow-hidden">
                    <img 
                      src={avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover transition-opacity duration-500 ease-in opacity-0 hover:opacity-100" 
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.opacity = '1';
                      }}
                    />
                  </div>
                ))}
                {currentAvatars.slice(2, 5).map((avatar, index) => (
                  <div key={`third-${avatar}`} className={`${index > 0 ? 'hidden sm:block' : ''} w-[calc(50%-1rem)] sm:w-[calc(33.33%-1.5rem)] max-w-[120px] aspect-square rounded-full ${
                    ['bg-[#E8F5E9]', 'bg-[#FFF3E0]', 'bg-[#E0F7FA]'][index]
                  } overflow-hidden`}>
                    <img 
                      src={avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover transition-opacity duration-500 ease-in opacity-0 hover:opacity-100" 
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.opacity = '1';
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Description text */}
          <div className="flex justify-center text-center">
            <p className="text-[1.35rem] sm:text-[1.425rem] md:text-[1.5rem] leading-[-0.05rem] leading-[1.3] mt-2 mb-6 text-foreground font-sans w-full max-w-[100%] ">
              Share work or career challenges with 5 others who get it and leave with real solutions to grow.
            </p>
          </div>

          {/* Email signup form component */}
          <div className="mb-1 max-w-[100%]">
            <EmailForm />
          </div>

          {/* Connect on LinkedIn */}
          <span className="text-[18px] my-6 inline-flex items-center gap-1">
          Connect on 
          <Link
            href="https://www.linkedin.com/in/zca"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center transition-all duration-150 ease-in-out"
          >
            <div className="text-secondary hover:text-secondary/80 font-medium inline-flex items-center gap-1 transition-all duration-150 ease-in-out hover:scale-95">
              <LinkedinLogo size={20} weight="fill" />
              LinkedIn
            </div>
          </Link>
        </span>

          {/* Countdown timer component */}
          <div>
            <CountdownClock targetDate={nextSessionDate} />
          </div>
        </div>
      </div>
    </div>
  )
}
