'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/use-toast'

export function EmailForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Log Supabase connection info (without exposing sensitive data)
      console.log('Supabase URL configured:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('Supabase Key configured:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      
      console.log('Attempting to insert:', email)
      const { error, data } = await supabase
        .from('waitlist')
        .insert([
          { 
            email,
            created_at: new Date().toISOString(),
            source: 'website',
            status: 'pending'
          }
        ])
        .select()

      if (error) {
        console.error('Supabase error:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        })
        throw error
      }

      console.log('Success:', data)
      toast({
        title: "🎉 Success!",
        description: "You're on the list! See you soon.",
        className: "bg-white text-black border-none",
      })
      setEmail('')
    } catch (error: any) {
      console.error('Detailed error:', {
        name: error?.name,
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint
      })
      toast({
        title: "❌ Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        className: "bg-white text-black border-none",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-md mx-auto w-full px-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 bg-white/10 border-white/60 text-white placeholder:text-white/60 focus-visible:ring-white/90"
          />
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="h-12 whitespace-nowrap px-8 bg-white text-black hover:bg-white/90 font-medium"
          >
            {isSubmitting ? 'Joining...' : 'Join waitlist'}
          </Button>
        </form>
      </div>
    </div>
  )
}
