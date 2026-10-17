export type ConsultationMode = 'clinic' | 'video' | 'call';

export type ServiceCategory = 
  | 'All'
  | 'Skin & Pigmentation'
  | 'Hair & Scalp'
  | 'Anti-Aging & Rejuvenation'
  | 'Clinical Minor Surgeries'
  | 'Medi-Facials & Glow';

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  photo: string;
  shortDesc: string;
  fullDesc: string;
  durationMinutes: number;
  priceEstimate: string;
  benefits: string[];
  procedureSteps: string[];
  idealFor: string;
  sessionsRecommended: string;
}

export interface Specialization {
  id: string;
  title: string;
  image: string;
  description: string;
  treatmentCount: number;
}

export interface DoctorProfile {
  name: string;
  title: string;
  degrees: string;
  experience: string;
  licenceNo: string;
  photo: string;
  about: string;
  internships: string[];
  consultationModes: ConsultationMode[];
  clinicAddress: string;
  phone: string;
  email: string;
  consultationFee: string;
  rating: number;
  totalReviews: number;
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  text: string;
  treatment?: string;
  date?: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge?: string;
  gender?: string;
  mode: ConsultationMode;
  serviceId?: string;
  serviceName: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentSlot: string; // e.g. "07:30 PM"
  location: string;
  notes?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export type AnimationSpeed = 'slow' | 'normal' | 'fast' | 'off';
export type AnimationIntensity = 'subtle' | 'medium' | 'strong';

export interface AnimationSettings {
  speed: AnimationSpeed;
  intensity: AnimationIntensity;
}
