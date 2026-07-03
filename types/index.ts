import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface Service {
  slug: string
  title: string
  shortDesc: string
  description: string
  icon: LucideIcon
  color: string
  features: string[]
  benefits: string[]
}

export interface Industry {
  slug: string
  title: string
  icon: LucideIcon
  description: string
  color: string
}

export interface Technology {
  name: string
  category: string
  color: string
}

export interface CaseStudy {
  slug: string
  title: string
  industry: string
  challenge: string
  solution: string
  results: string[]
  tech: string[]
  roi: string
  image: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  avatar: string
  linkedin?: string
}

export interface JobOpening {
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
}

export interface Stat {
  value: string
  label: string
  suffix?: string
}

export interface FAQ {
  question: string
  answer: string
}
