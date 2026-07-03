'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { contactSchema, type ContactFormData } from '@/lib/contact-schema'

const schema = contactSchema
type FormData = ContactFormData

const SERVICES = [
  'Artificial Intelligence','Cloud Solutions','Software Development',
  'Web Development','Mobile Apps','Cybersecurity','DevOps',
  'Data Engineering','UI/UX Design','Business Automation','IT Consulting','Other',
]
const BUDGETS = ['Under ₹10 Lakhs','₹10–50 Lakhs','₹50 Lakhs–1 Crore','Above ₹1 Crore','Not sure yet']

/* ── Premium field ───────────────────────────── */
function Field({
  label, error, className, id, name, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const fieldId = id ?? name
  const errorId = fieldId ? `${fieldId}-error` : undefined
  return (
    <div className={cn('group', className)}>
      <label htmlFor={fieldId} className="block text-[.8125rem] font-semibold text-[#475569] mb-2">{label}</label>
      <div className="relative">
        <input
          id={fieldId}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'input-base text-[.875rem]',
            error && 'input-error',
          )}
          {...props}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 mt-1.5 text-[11.5px] text-red-500 font-medium"
          >
            <AlertCircle size={11} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function SelectField({
  label, error, children, className, id, name, ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  const fieldId = id ?? name
  const errorId = fieldId ? `${fieldId}-error` : undefined
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="block text-[.8125rem] font-semibold text-[#475569] mb-2">{label}</label>
      <select
        id={fieldId}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'input-base text-[.875rem] cursor-pointer appearance-none',
          'bg-[image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%2394A3B8\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")]',
          'bg-no-repeat bg-[right_14px_center]',
          error && 'input-error',
        )}
        {...props}
      >
        {children}
      </select>
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 mt-1.5 text-[11.5px] text-red-500 font-medium"
          >
            <AlertCircle size={11} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Success state ───────────────────────────── */
function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: .4, ease: [.22, 1, .36, 1] }}
      className="py-14 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-5 shadow-[0_8px_24px_rgba(16,185,129,.3)]">
        <CheckCircle2 size={28} className="text-white" />
      </div>
      <h3 className="font-extrabold text-[#0A0F1C] text-xl mb-2 tracking-tight">Message Received</h3>
      <p className="text-[#64748B] text-sm leading-relaxed max-w-xs mx-auto">
        Thank you for reaching out. A senior consultant will contact you within <strong className="text-[#0A0F1C]">2 business hours.</strong>
      </p>
      <div className="mt-6 inline-flex items-center gap-2 text-xs text-[#64748B]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Our team has been notified
      </div>
    </motion.div>
  )
}

/* ── Form ────────────────────────────────────── */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? 'Something went wrong. Please try again.')
      }
      setSubmitted(true)
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Network error — please check your connection and try again.',
      )
    }
  }

  if (submitted) return <SuccessState />

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name *" placeholder="Rajesh Kumar" autoComplete="name" {...register('name')} error={errors.name?.message} />
        <Field label="Work Email *" type="email" placeholder="rajesh@company.com" autoComplete="email" {...register('email')} error={errors.email?.message} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Company *" placeholder="Company Ltd." autoComplete="organization" {...register('company')} error={errors.company?.message} />
        <Field label="Phone" type="tel" placeholder="+91 98765 43210" autoComplete="tel" {...register('phone')} error={errors.phone?.message} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField label="Service of Interest *" {...register('service')} error={errors.service?.message}>
          <option value="">Select a service…</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </SelectField>
        <SelectField label="Budget Range" {...register('budget')}>
          <option value="">Select budget…</option>
          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </SelectField>
      </div>

      <div>
        <label htmlFor="message" className="block text-[.8125rem] font-semibold text-[#475569] mb-2">Message *</label>
        <textarea
          id="message"
          rows={5}
          placeholder="Briefly describe your project, challenge, or goals…"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn('input-base text-[.875rem] resize-none', errors.message && 'input-error')}
          {...register('message')}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              id="message-error"
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-1.5 mt-1.5 text-[11.5px] text-red-500 font-medium"
            >
              <AlertCircle size={11} /> {errors.message.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[11.5px] text-[#64748B] leading-relaxed">
        By submitting you agree to our{' '}
        <a href="/privacy-policy" className="text-[#1D4ED8] underline underline-offset-2">Privacy Policy</a>.
        {' '}We never share your data with third parties.
      </p>

      <AnimatePresence>
        {serverError && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="flex items-start gap-2 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600"
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{serverError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        loading={isSubmitting}
        size="lg"
        iconRight={<Send size={15} />}
        className="w-full sm:w-auto"
      >
        Send Message
      </Button>
    </form>
  )
}
