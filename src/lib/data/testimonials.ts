import { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Digital Marketing Executive",
    company: "TechStartup, Gurgaon",
    program: "Full Stack Digital Marketing",
    rating: 5,
    review:
      "I was a commerce graduate with zero marketing knowledge. Within 4 months at Digital Magician, I got placed at ₹28,000/month. Gaurav sir doesn't just teach — he prepares you for the real world. The live campaign experience on eSahayak's clients was a game-changer.",
    salaryBefore: "₹0 (fresher)",
    salaryAfter: "₹28,000/month",
  },
  {
    name: "Rohit Kumar",
    role: "Performance Marketing Specialist",
    company: "E-commerce Brand, Delhi",
    program: "Performance Marketing Mastery",
    rating: 5,
    review:
      "I was managing a small shop. Now I manage ₹8 Lakh in monthly ad spend for a D2C brand. The ROI concepts and hands-on Google Ads practice at Digital Magician completely changed my career trajectory. Worth every rupee.",
    salaryBefore: "₹15,000/month",
    salaryAfter: "₹42,000/month",
  },
  {
    name: "Sakshi Verma",
    role: "Freelance SEO Consultant",
    company: "Self-employed",
    program: "SEO Mastery",
    rating: 5,
    review:
      "I now earn ₹60,000/month freelancing — from home, in Panipat. The SEO course gave me the exact skills clients are looking for. Gaurav sir is brutally honest about what works and what doesn't. No fluff, pure value.",
    salaryBefore: "₹12,000/month",
    salaryAfter: "₹60,000/month",
  },
  {
    name: "Arjun Singh",
    role: "Social Media Manager",
    company: "Fashion Brand, Noida",
    program: "Meta Ads Mastery",
    rating: 5,
    review:
      "The WhatsApp automation module alone was worth the entire fee. I now run fully automated lead nurture sequences for 3 clients. Placed in 3 weeks after completing the course. The placement support team was incredible.",
    salaryBefore: "₹18,000/month",
    salaryAfter: "₹35,000/month",
  },
  {
    name: "Neha Agarwal",
    role: "Web Designer & WordPress Developer",
    company: "Freelancer",
    program: "Website Design & Development",
    rating: 5,
    review:
      "I had zero tech background. Now I charge ₹25,000 per website project and have 6 regular clients. The course is incredibly practical — we built 3 real websites during training. Best investment of ₹20,000 I ever made.",
    salaryBefore: "₹0 (housewife)",
    salaryAfter: "₹35,000+/month freelancing",
  },
  {
    name: "Vikram Yadav",
    role: "Google Ads Specialist",
    company: "Digital Marketing Agency, Rohtak",
    program: "Google Ads Mastery",
    rating: 5,
    review:
      "Cleared Google Ads certification on first attempt. Got hired within 2 weeks of course completion. The practical campaign management experience on real client accounts made my resume stand out from 100+ applicants. Highly recommended.",
    salaryBefore: "₹20,000/month",
    salaryAfter: "₹38,000/month",
  },
];

export const batchDates = [
  { program: "Full Stack Digital Marketing", startDate: "May 5, 2026", timing: "Mon / Wed / Fri — 7:00–9:00 PM", seatsLeft: 4, mode: "Hybrid (Online + Offline)" },
  { program: "Performance Marketing Mastery", startDate: "May 12, 2026", timing: "Tue / Thu / Sat — 7:00–9:00 PM", seatsLeft: 6, mode: "Hybrid (Online + Offline)" },
  { program: "Google Ads Mastery", startDate: "May 5, 2026", timing: "Mon / Wed / Fri — 9:00–11:00 AM", seatsLeft: 5, mode: "Hybrid (Online + Offline)" },
];

export const stats = [
  { value: 100, suffix: "+", label: "Students Trained", icon: "👨‍🎓" },
  { value: 4.9, suffix: "★", label: "Average Rating", icon: "⭐" },
  { value: 10, suffix: "+", label: "Certifications Offered", icon: "🏆" },
  { value: 80, suffix: "%", label: "Placed in 30 Days", icon: "💼" },
];
