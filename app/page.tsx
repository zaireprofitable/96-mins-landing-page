import { EmailForm } from './components/email-form'
import { CountdownClock } from './components/countdown-clock'
import Link from 'next/link'

export default function Home() {
  const nextSessionDate = new Date('2025-01-13T07:00:00-05:00')

  return (
    <div className="min-h-screen h-full bg-[#E32636] bg-texture bg-blend-multiply text-white relative flex flex-col overflow-x-hidden">
      <div className="pt-6 pb-4 text-center">
        <h2 className="font-sans text-2xl font-extrabold tracking-[-1px]">96 Mins</h2>
        <Link
          href="https://www.linkedin.com/in/zca"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-sm text-white hover:text-white/80 underline transition-colors"
        >
          Connect on LinkedIn
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl px-4 py-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight mx-auto max-w-[90%] font-sans relative px-2">
            <span className="absolute -left-8 -top-6 text-2xl rotate-[15deg] opacity-60">✦</span>
            Ambitious people get unstuck together, every Monday at 7am
            <span className="absolute -right-8 -bottom-6 text-2xl rotate-[-15deg] opacity-60">✦</span>
          </h1>
          <div className="flex justify-center px-4">
            <p className="text-[18px] mb-6 text-white/90 w-full md:w-3/5">
              Meet and share work or career challenges with 5 others who get it. Walk away with real solutions.
            </p>
          </div>
          <div className="mb-6">
            <EmailForm />
          </div>
          <div className="mb-6">
            <CountdownClock targetDate={nextSessionDate} />
          </div>
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white">
              Currently in NYC only 🗽
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
