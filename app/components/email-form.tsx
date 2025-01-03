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
        // Still redirect them to the form
        setTimeout(() => {
          window.location.href = 'https://tally.so/r/mDABV5'
        }, 2000)
        return
      }

      // Always use the waitlist table, but add type field
      const { data, error: dbError } = await supabase
        .from('waitlist')
        .insert([
          { 
            email: email.toLowerCase(),
            created_at: new Date().toISOString(),
            source: 'website',
            status: 'pending',
            type: formType // Add type field to distinguish portfolio review signups
          }
        ])
        .select('*')

      if (dbError) {
        console.error('Detailed Database error:', {
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
          code: dbError.code
        })
        throw dbError
      }

      console.log('Database insert successful:', data)

      // Send welcome email using appropriate endpoint
      const emailEndpoint = formType === 'portfolio-review' ? '/api/send-portfolio-email' : '/api/send-email'
      console.log('Using email endpoint:', emailEndpoint)
      
      const emailResponse = await fetch(emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const responseData = await emailResponse.json()
      console.log('Email API response:', responseData)

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
        window.location.href = 'https://tally.so/r/mDABV5'
      }, 2000)

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
