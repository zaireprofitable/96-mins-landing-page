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
        console.error('Supabase error:', error)
        if (error.message?.includes('duplicate key value violates unique constraint')) {
          toast({
            title: "Welcome Back! ✨",
            description: "Great to see your enthusiasm! You're already part of our Monday morning crew.",
            className: "bg-white text-black border-none text-center",
          })
          setEmail('')
          return
        }
        throw error
      }

      console.log('Success:', data)
      toast({
        title: "🎉 Success!",
        description: "You're on the list! See you soon.",
        className: "bg-white text-black border-none text-center",
      })
      setEmail('')
    } catch (error: any) {
      console.error('Error:', error)
      toast({
        title: "❌ Error",
        description: error?.message || "Something went wrong. Please try again.",
        variant: "destructive",
        className: "bg-white text-black border-none text-center",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-md mx-auto w-full px-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-1 w-full">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 bg-[#F1EFEC] text-primary placeholder:text-[#9E9C9B] placeholder:text-md focus-visible:ring-secondary focus-visible:ring-2"
          />
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="h-12 whitespace-nowrap px-8 bg-secondary text-white hover:bg-secondary/90 font-medium"
          >
            {isSubmitting ? 'Joining...' : 'Join waitlist'}
          </Button>
        </form>
      </div>
    </div>
  )
}
