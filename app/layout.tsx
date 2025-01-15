import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script'

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
      {/* CRITICAL: DO NOT REMOVE - Site Analytics Implementation */}
      {/* This script is essential for business metrics and must remain in place */}
      <Script 
        src="https://scripts.simpleanalyticscdn.com/latest.js"
        data-collect-dnt="true"
        data-hostname="96mins.com"
        async
        defer
        strategy="afterInteractive"
      />
      <noscript>
        <img 
          src="https://queue.simpleanalyticscdn.com/noscript.gif" 
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>

      {/* Microsoft Clarity Analytics */}
      <Script id="clarity-analytics" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "pu2y9t4wum");
        `}
      </Script>

      <body className={`bg-[#FBF9F6] ${inter.className}`} suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
