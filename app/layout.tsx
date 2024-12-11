import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Toaster } from '@/components/ui/toaster'

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
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
