"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

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
].filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

export function RotatingAvatars() {
  const [currentAvatars, setCurrentAvatars] = useState<string[]>([]);
  
  useEffect(() => {
    // Function to get 5 random avatars (excluding duplicates)
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
    <div className="flex items-center justify-center -space-x-4">
      {/* Fixed "You" avatar */}
      <div className="relative w-12 h-12 border-2 border-background rounded-full bg-secondary flex items-center justify-center text-white font-medium z-10">
        You
      </div>
      
      {/* Rotating avatars */}
      {currentAvatars.map((avatar, index) => (
        <div
          key={`${avatar}-${index}`}
          className="relative w-12 h-12 border-2 border-background rounded-full overflow-hidden transition-all duration-300 ease-in-out"
          style={{ zIndex: 5 - index }}
        >
          <Image
            src={avatar}
            alt={`Avatar ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
