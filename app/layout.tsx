import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '96mins',
  description: 'Join us every Tuesday morning for freelance tips and tricks',
  icons: {
    icon: 'https://ucarecdn.com/9cbc99a2-6a9d-4e8a-af84-132afa1f3700/96Favicon.png',
    shortcut: 'https://ucarecdn.com/9cbc99a2-6a9d-4e8a-af84-132afa1f3700/96Favicon.png',
    apple: 'https://ucarecdn.com/9cbc99a2-6a9d-4e8a-af84-132afa1f3700/96Favicon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`bg-[#FBF9F6] ${inter.className}`} suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
