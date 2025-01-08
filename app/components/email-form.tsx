'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/use-toast'

type EmailFormProps = {
  formType?: 'portfolio-review' | 'waitlist'
}

export function EmailForm({ formType = 'waitlist' }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log('Form type:', formType)

      // First check if email already exists
      const { data: existingEmail } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email.toLowerCase())
        .single()

      if (existingEmail) {
        toast({
          title: "⚠️ Already Signed Up",
          description: "You're already on the list! Redirecting you to the onboarding form...",
          className: "bg-white text-black border-none text-center",
        })
        window.location.href = 'https://tally.so/r/mDABV5'
        return
      }

      // Insert new email
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ email: email.toLowerCase() }])

      if (insertError) {
        throw insertError
      }

      // Send welcome email
      await fetch('/api/resend-welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.toLowerCase() }),
      })

      toast({
        title: "🎉 You're In!",
        description: "Redirecting you to complete your application...",
        className: "bg-white text-black border-none text-center",
      })

      // Redirect immediately to Tally form
      window.location.href = 'https://tally.so/r/mDABV5'

    } catch (error) {
      console.error('Full error object:', error)
      toast({
        title: "⚠️ Error",
        description: "Something went wrong. Please try again.",
        className: "bg-white text-black border-none text-center",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-md mx-auto w-full px-0">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-1 w-full">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 bg-[#F1EFEC] text-primary placeholder:text-[#787776] placeholder:text-md focus-visible:ring-secondary focus-visible:ring-2 font-normal tracking-[.3px]"
          />
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="h-12 whitespace-nowrap px-8 bg-secondary text-white hover:bg-secondary/90 font-normal tracking-[.2px]"
          >
            {isSubmitting ? 'Joining...' : formType === 'portfolio-review' ? 'Join a session' : 'Join waitlist'}
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2">Please check your spam folder if you don't see our email.</p>
      </div>
    </div>
  )
}
