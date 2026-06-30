'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const schema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  email:    z.string().email('Please enter a valid email address'),
  company:  z.string().min(2, 'Company name required'),
  phone:    z.string().optional(),
  service:  z.string().min(1, 'Please select a service'),
  budget:   z.string().optional(),
  message:  z.string().min(20, 'Please tell us a bit more (min 20 characters)'),
})

type FormData = z.infer<typeof schema>

const SERVICES = [
  'Artificial Intelligence', 'Cloud Solutions', 'Software Development',
  'Web Development', 'Mobile Apps', 'Cybersecurity', 'DevOps',
  'Data Engineering', 'UI/UX Design', 'Business Automation', 'IT Consulting', 'Other',
]

const BUDGETS = ['Under ₹10 Lakhs', '₹10–50 Lakhs', '₹50 Lakhs–1 Crore', 'Above ₹1 Crore', 'Not sure yet']

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; error?: string
}
function Field({ label, error, className, ...props }: InputProps) {
  return (
    <label className={cn('block', className)}>
      <span className="text-sm font-medium text-slate-700 mb-1.5 block">{label}</span>
      <input
        className={cn(
          'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors',
          'placeholder:text-slate-300 bg-slate-50 focus:bg-white',
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
            : 'border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100',
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </label>
  )
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))
    console.log('Form data:', data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 size={48} className="text-teal-500 mx-auto mb-4" />
        <h3 className="font-bold text-slate-900 text-xl mb-2">Message Sent!</h3>
        <p className="text-slate-500 text-sm">Thank you for reaching out. Our team will get back to you within 24 business hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Full Name *"
          placeholder="Rajesh Kumar"
          autoComplete="name"
          {...register('name')}
          error={errors.name?.message}
        />
        <Field
          label="Work Email *"
          type="email"
          placeholder="rajesh@company.com"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Company *"
          placeholder="Your Company Ltd."
          autoComplete="organization"
          {...register('company')}
          error={errors.company?.message}
        />
        <Field
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          autoComplete="tel"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1.5 block">Service of Interest *</span>
          <select
            className={cn(
              'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-slate-50 focus:bg-white',
              errors.service
                ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100',
            )}
            {...register('service')}
          >
            <option value="">Select a service…</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.service && <span className="text-xs text-red-500 mt-1 block">{errors.service.message}</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1.5 block">Budget Range</span>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-colors bg-slate-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            {...register('budget')}
          >
            <option value="">Select budget…</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700 mb-1.5 block">Your Message *</span>
        <textarea
          rows={5}
          placeholder="Briefly describe your project, challenge, or what you'd like to discuss…"
          className={cn(
            'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none bg-slate-50 focus:bg-white',
            errors.message
              ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100',
          )}
          {...register('message')}
        />
        {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message.message}</span>}
      </label>

      <p className="text-xs text-slate-400">
        By submitting this form you agree to our{' '}
        <a href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</a>.
        We never share your data with third parties.
      </p>

      <Button type="submit" loading={isSubmitting} size="lg" className="w-full sm:w-auto">
        <Send size={16} /> Send Message
      </Button>
    </form>
  )
}
