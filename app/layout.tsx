import './globals.css'
import type { Metadata } from 'next'
import { cn } from "@/lib/utils"
import Script from 'next/script'
import { Toaster } from '@/components/ui/toaster'
import { Crimson_Pro, Inter } from 'next/font/google'

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-crimson-pro',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '96mins | Designers become freelancers together every Tuesday',
  description: 'Weekly online and IRL sessions to land clients and launch your freelance career.',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon.ico',
    },
  ],
  openGraph: {
    title: 'Designers become freelancers together every Tuesday for 96mins',
    description: 'Weekly online and IRL sessions to land clients and launch your freelance career.',
    url: 'https://96mins.com',
    siteName: '96mins',
    images: [
      {
        url: 'https://ucarecdn.com/5da79f72-ffde-45e6-97e7-54c81243c493/96SocialImage.png',
        width: 1200,
        height: 630,
        alt: '96mins - Designers become freelancers together'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Designers become freelancers together every Tuesday for 96mins',
    description: 'Weekly online and IRL sessions to land clients and launch your freelance career.',
    images: ['https://ucarecdn.com/5da79f72-ffde-45e6-97e7-54c81243c493/96SocialImage.png'],
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
      <body className={cn(
        crimsonPro.variable,
        inter.variable,
        "bg-background font-sans antialiased tracking-[-.40px] width-full mx-auto overflow-x-hidden text-foreground",
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
