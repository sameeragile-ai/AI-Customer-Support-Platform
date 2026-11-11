export interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  conversations: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  billingType: 'monthly' | 'one-time';
  description: string;
  tag?: string;
  iconName: string;
}

export interface CartItem {
  id: string;
  itemId: string;
  type: 'plan' | 'addon';
  name: string;
  price: number;
  billingType: 'monthly' | 'one-time';
  billingCycle?: 'monthly' | 'yearly';
  quantity: number;
  description?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'accuracy' | 'integrations' | 'pricing';
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'ai' | 'system';
  text: string;
  timestamp: string;
  intent?: string;
  confidence?: number;
  apiAction?: {
    service: string;
    action: string;
    status: 'calling' | 'success';
    details?: string;
  };
  citation?: {
    title: string;
    source: string;
  };
  handoff?: {
    ticketId: string;
    assignee: string;
    eta: string;
  };
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning';
}
