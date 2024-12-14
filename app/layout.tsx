import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Toaster } from '@/components/ui/toaster'
import { Crimson_Pro } from 'next/font/google'

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: '96mins | Get unstuck together every Monday at 7am',
  description: 'Join ambitious professionals every Monday at 7am to tackle work and career challenges. Share your problems, get real solutions, and make progress in just 96 minutes.',
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon.svg',
    },
  ],
  openGraph: {
    title: '96mins | Get unstuck together every Monday at 7am',
    description: 'Join ambitious professionals every Monday at 7am to tackle work and career challenges. Share your problems, get real solutions, and make progress in just 96 minutes.',
    url: 'https://96mins.com',
    siteName: '96mins',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: '96mins',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '96mins | Get unstuck together every Monday at 7am',
    description: 'Join ambitious professionals every Monday at 7am to tackle work and career challenges. Share your problems, get real solutions, and make progress in just 96 minutes.',
    images: ['/og.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 100% privacy-first analytics */}
        <Script 
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          async
          strategy="afterInteractive"
        />
      </head>
      <body className={`${crimsonPro.className} min-h-screen max-w-[560px] mx-auto px-4 overflow-x-hidden bg-background text-foreground font-sans antialiased`}>


        {children}
        <Toaster />
      </body>
    </html>
  )
}
