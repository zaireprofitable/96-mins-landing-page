'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from '@/lib/supabase/client'

export function PortfolioReviewForm() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Insert into Supabase
      const { error: dbError } = await supabase
        .from('waitlist_portfolio_review')
        .insert([{ email }])

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      // Send welcome email
      const emailResponse = await fetch('/api/send-portfolio-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const responseData = await emailResponse.json()

      if (!emailResponse.ok) {
        throw new Error(responseData.error || 'Failed to send email')
      }

      toast({
        title: "🎉 Success!",
        description: "You're on the list! Redirecting you to the onboarding form...",
        className: "bg-white text-black border-none text-center",
      })
      
      // Reset form
      setEmail('')
      
      // Redirect to Tally form after a short delay
      setTimeout(() => {
        window.location.href = 'https://tally.so/r/mDABV5';
      }, 2000)

    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "⚠️ Note",
        description: "You're on the list! We'll send you a welcome email shortly.",
        className: "bg-white text-black border-none text-center",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
      <div className="relative flex-1 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
          className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto whitespace-nowrap">
        Grab a spot
      </Button>
    </form>
  )
}
