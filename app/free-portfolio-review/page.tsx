'use client'

import { EmailForm } from '../components/email-form'
import Link from 'next/link'
import { LinkedinLogo } from "@phosphor-icons/react"
import Image from 'next/image'

export default function PortfolioReview() {
  return (
    <div className='min-h-screen flex flex-col bg-[#FBF9F6] text-foreground'>
      <div className='flex-1 flex items-center'>
        <div className='w-full max-w-[560px] mx-auto px-4 py-6 md:py-0'>
          {/* Header section with branding */}
          <div className="pt-4 md:pt-19 text-center">
            <Link href="/">
              <h2 className="font-tanker text-[28px] tracking-[-0.08rem] md:text-[48px] md:tracking-[-0.15rem] text-secondary font-medium">96Mins</h2>
            </Link>
          </div>

          {/* Main content section with centered layout */}
          <div className="text-center">
            <h1 className="text-[1.75rem] sm:text-[2.5rem] md:text-[3rem] leading-[1.1] sm:leading-[1] tracking-sm mx-auto font-primary font-serif tracking-tighter relative px-2 text-foreground font-light">
              Get a <span className="text-secondary">free</span> portfolio review to<br className="hidden sm:block" />
              launch your freelance career
            </h1>

            {/* Portfolio img */}
            <div className="flex flex-wrap justify-center mx-auto pt-8 sm:pt-12 pb-6 sm:pb-8 px-2">
              <div className="w-[240px] sm:w-full sm:max-w-[400px]">
                <Image
                  src="https://ucarecdn.com/5428c2db-6311-4e76-a93a-6960e40eb191/screens.avif"
                  alt="Portfolio Review"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg"
                  priority
                />
              </div>
            </div>

            {/* Description text */}
            <p className="text-[1.1rem] sm:text-[1.25rem] md:text-[1.4rem] text-center text-foreground font-sans tracking-[-0.02em] leading-[130%] mt-2 mb-6 px-2">
              Receive personalized feedback to enhance<br className="hidden sm:block" /> your portfolio and attract clients.
            </p>

            {/* Email signup form */}
            <div className="mb-1 px-2">
              <EmailForm formType="portfolio-review" />
            </div>

            {/* Connect on LinkedIn */}
            <span className="text-[14px] sm:text-[16px] my-4 sm:my-6 inline-flex items-center gap-1 text-gray-600">
              Connect on 
              <Link
                href="https://www.linkedin.com/company/96mins"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center transition-all duration-150 ease-in-out"
              >
                <div className="text-secondary hover:text-secondary/80 font-normal inline-flex items-center gap-1 transition-all duration-150 ease-in-out hover:scale-95">
                  <LinkedinLogo size={20} weight="fill" />
                  LinkedIn
                </div>
              </Link>
            </span>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-xs sm:text-sm text-gray-500 py-4 px-4">
        By the team behind{' '}
        <a href="https://handheld.design/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
          Handheld Design
        </a>
        ,{' '}
        <a href="https://sitesexplained.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
          Sites Explained
        </a>
        {' '}and{' '}
        <a href="https://lovecircular.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
          Love Circular
        </a>
      </div>
    </div>
  )
}