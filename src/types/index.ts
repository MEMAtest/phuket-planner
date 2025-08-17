// Type definitions for the entire application

export type ActivityType = 'travel' | 'eat' | 'nap' | 'indoor' | 'outdoor' | 'mixed';

export interface Activity {
  id: string | number;
  title: string;
  time: string;
  type: ActivityType;
  notes?: string;
  cost?: number;
  currency?: 'THB' | 'GBP';
  location?: {
    name?: string;
    lat?: number;
    lng?: number;
    mapUrl?: string;
  };
  completed?: boolean;
  createdBy?: string;
  createdAt?: Date;
  lastModified?: Date;
  photos?: string[];
  tags?: string[];
}

export interface PlanDay {
  id?: string;
  date: string;
  dow: string;
  dayOrder?: number;
  blocks: Activity[];
  location: 'maiKhao' | 'oldTown' | 'other';
  budget?: number;
  expenses?: Expense[];
  notes?: string;
}

export interface Expense {
  id: string;
  amount: number;
  currency: 'THB' | 'GBP';
  category: 'food' | 'transport' | 'activity' | 'shopping' | 'other';
  description: string;
  timestamp: Date;
}

export interface Weather {
  date: string;
  dow: string;
  hi: number;
  lo: number;
  summary: string;
}

export interface Recommendation {
  name: string;
  rating: number;
  type: 'eat' | 'activity';
  notes: string;
  map: string;
  travelTime: string;
}

export interface FoodItem {
  name: string;
  thai: string;
  desc: string;
  spice: number;
  kidFriendly?: boolean;
}

export interface JetLagTask {
  id: string;
  title: string;
  text: string;
  nudge: string;
  completed?: boolean;
}

export interface TripData {
  hotel: {
    name: string;
  };
  forecast: Weather[];
  recommendations: {
    maiKhao: Recommendation[];
    oldTown: Recommendation[];
  };
  initialPlan: PlanDay[];
  foodData: {
    kidFriendly: FoodItem[];
    phuketSpecialties: FoodItem[];
  };
  jetLagTasks: JetLagTask[];
  phuketFacts: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isActive?: boolean;
}
