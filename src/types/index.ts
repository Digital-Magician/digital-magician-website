export interface Program {
  slug: string;
  name: string;
  shortName: string;
  metaTitle?: string; // SEO <title> override (falls back to `${name} in Sonipat`)
  duration: string;
  level: "Beginner" | "Intermediate" | "All Levels";
  fee: number;
  originalFee?: number;
  certifications: number;
  description: string;
  tagline: string;
  icon: string;
  color: string;
  outcomes: string[];
  tools: string[];
  modules: Module[];
  faqs: FAQ[];
}

export interface Module {
  name: string;
  lessons: number;
  duration: string;
  topics: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  program: string;
  rating: number;
  review: string;
  image?: string;
  salaryBefore?: string;
  salaryAfter?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BatchDate {
  program: string;
  startDate: string;
  timing: string;
  seatsLeft: number;
  mode: string;
}
