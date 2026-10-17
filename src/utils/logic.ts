import type { ConsultationMode, Service } from '../types/index.ts';

/**
 * Generate 15-minute appointment time slots for a given date based on clinic hours
 * Monday: Closed
 * Tuesday - Sunday: 12:00 PM - 03:00 PM and 07:00 PM - 11:00 PM
 */
export function getAvailableSlotsForDate(dateString: string): string[] {
  if (!dateString) return [];
  
  const date = new Date(dateString + 'T00:00:00');
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Monday is closed
  if (day === 1) {
    return [];
  }

  const slots: string[] = [];

  // Afternoon slot: 12:00 PM to 02:45 PM (last appointment before 3:00 PM)
  const afternoonHours = [12, 13, 14];
  const minutes = ['00', '15', '30', '45'];

  for (const h of afternoonHours) {
    for (const m of minutes) {
      const displayHour = h === 12 ? 12 : h - 12;
      const formatted = `${String(displayHour).padStart(2, '0')}:${m} PM`;
      slots.push(formatted);
    }
  }

  // Evening slot: 07:00 PM to 10:45 PM (last appointment before 11:00 PM)
  const eveningHours = [19, 20, 21, 22];
  for (const h of eveningHours) {
    for (const m of minutes) {
      const displayHour = h - 12;
      const formatted = `${String(displayHour).padStart(2, '0')}:${m} PM`;
      slots.push(formatted);
    }
  }

  return slots;
}

/**
 * Validate phone number (accepts Indian 10-digit mobile or international formats)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15 && /^\d+$/.test(cleaned);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Filter services by search term and category
 */
export function filterServices(
  services: Service[],
  searchTerm: string,
  category: string
): Service[] {
  const term = searchTerm.toLowerCase().trim();

  return services.filter((srv) => {
    const matchesCategory =
      category === 'All' || srv.category.toLowerCase() === category.toLowerCase();

    const matchesSearch =
      !term ||
      srv.name.toLowerCase().includes(term) ||
      srv.shortDesc.toLowerCase().includes(term) ||
      srv.category.toLowerCase().includes(term) ||
      srv.idealFor.toLowerCase().includes(term) ||
      srv.benefits.some((b) => b.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });
}

/**
 * Format date string to friendly readable format (e.g. "Friday, Oct 24, 2026")
 */
export function formatReadableDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Helper to get consultation label
 */
export function getModeLabel(mode: ConsultationMode): string {
  switch (mode) {
    case 'clinic':
      return 'In-Person Clinic Visit';
    case 'video':
      return 'Video Consultation';
    case 'call':
      return 'Voice Call Consultation';
    default:
      return 'Consultation';
  }
}

/**
 * Safely parse JSON from localStorage
 */
export function safeGetStorage<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const item = window.localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Failed reading localStorage key: ${key}`, e);
    return fallback;
  }
}

/**
 * Safely save JSON to localStorage
 */
export function safeSetStorage<T>(key: string, value: T): boolean {
  try {
    if (typeof window === 'undefined') return false;
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`Failed writing to localStorage key: ${key}`, e);
    return false;
  }
}
