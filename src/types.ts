export interface ServiceItem {
  id: string;
  category: 'therapeutic' | 'relaxation' | 'alternative';
  title: string;
  items: string[];
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  quote: string;
  stars: number;
}

export interface PricingPlan {
  id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
  highlight?: string;
  isPopular?: boolean;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NeedCategory {
  id: string;
  title: string;
  iconName: string;
  recommendedServiceId: string;
  description: string;
}

export interface BookingFormData {
  serviceId: string;
  duration: string;
  date: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
}
