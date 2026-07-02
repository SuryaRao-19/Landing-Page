import { z } from 'zod'

/**
 * Shared contact-form schema — imported by both the client form
 * (react-hook-form resolver) and the server Route Handler so validation
 * rules can never drift apart.
 */
export const contactSchema = z.object({
  name:    z.string().min(2, 'At least 2 characters'),
  email:   z.string().email('Enter a valid email'),
  company: z.string().min(2, 'Company name required'),
  phone:   z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget:  z.string().optional(),
  message: z.string().min(20, 'Min 20 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>
