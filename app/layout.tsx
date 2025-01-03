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
  title: '96mins',
  description: 'Designers become freelancers together every Tuesday.',
  icons: {
    icon: 'https://ucarecdn.com/9cbc99a2-6a9d-4e8a-af84-132afa1f3700/96Favicon.png',
    shortcut: 'https://ucarecdn.com/9cbc99a2-6a9d-4e8a-af84-132afa1f3700/96Favicon.png',
    apple: 'https://ucarecdn.com/9cbc99a2-6a9d-4e8a-af84-132afa1f3700/96Favicon.png',
  },
  openGraph: {
    title: '96mins',
    description: 'Designers become freelancers together every Tuesday.',
    url: 'https://96mins.com',
    siteName: '96mins',
    images: [
      {
        url: 'https://ucarecdn.com/5da79f72-ffde-45e6-97e7-54c81243c493/96SocialImage.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '96mins',
    description: 'Designers become freelancers together every Tuesday.',
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
