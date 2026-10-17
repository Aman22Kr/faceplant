import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Appointment, ContactMessage, Testimonial } from '../types/index.ts';
import { TESTIMONIALS } from '../data/clinicData.ts';
import { safeGetStorage, safeSetStorage } from '../utils/logic.ts';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface ClinicContextType {
  appointments: Appointment[];
  favorites: string[]; // service IDs
  reviews: Testimonial[];
  contactMessages: ContactMessage[];
  isBookingModalOpen: boolean;
  preselectedServiceId?: string;
  toasts: Toast[];
  openBookingModal: (serviceId?: string) => void;
  closeBookingModal: () => void;
  bookAppointment: (data: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => string;
  cancelAppointment: (id: string) => boolean;
  toggleFavorite: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;
  addReview: (data: Omit<Testimonial, 'id' | 'verified' | 'date'>) => void;
  addContactMessage: (data: Omit<ContactMessage, 'id' | 'createdAt'>) => void;
  removeToast: (id: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const STORAGE_KEYS = {
  APPOINTMENTS: 'faceplant_appointments',
  FAVORITES: 'faceplant_favorites',
  REVIEWS: 'faceplant_reviews',
  MESSAGES: 'faceplant_contact_messages',
};

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    return safeGetStorage<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, []);
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    return safeGetStorage<string[]>(STORAGE_KEYS.FAVORITES, []);
  });

  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    return safeGetStorage<Testimonial[]>(STORAGE_KEYS.REVIEWS, TESTIMONIALS);
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    return safeGetStorage<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
  }, [appointments]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.REVIEWS, reviews);
  }, [reviews]);

  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.MESSAGES, contactMessages);
  }, [contactMessages]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openBookingModal = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setPreselectedServiceId(undefined);
  };

  const bookAppointment = (data: Omit<Appointment, 'id' | 'createdAt' | 'status'>): string => {
    const id = 'FP-' + Math.floor(100000 + Math.random() * 900000);
    const newAppointment: Appointment = {
      ...data,
      id,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    showToast(`Appointment confirmed! Booking ID: ${id}`, 'success');
    return id;
  };

  const cancelAppointment = (id: string): boolean => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'Cancelled' } : apt))
    );
    showToast('Appointment has been cancelled', 'info');
    return true;
  };

  const toggleFavorite = (serviceId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(serviceId);
      const next = exists ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
      showToast(exists ? 'Removed from saved treatments' : 'Saved to your treatments', 'info');
      return next;
    });
  };

  const isFavorite = (serviceId: string) => favorites.includes(serviceId);

  const addReview = (data: Omit<Testimonial, 'id' | 'verified' | 'date'>) => {
    const newReview: Testimonial = {
      ...data,
      id: 'rev-' + Date.now(),
      date: 'Just now',
      verified: true,
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you for sharing your experience!', 'success');
  };

  const addContactMessage = (data: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    const newMsg: ContactMessage = {
      ...data,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    showToast('Your message has been sent to Dr. Huma Shaikh’s clinic!', 'success');
  };

  return (
    <ClinicContext.Provider
      value={{
        appointments,
        favorites,
        reviews,
        contactMessages,
        isBookingModalOpen,
        preselectedServiceId,
        toasts,
        openBookingModal,
        closeBookingModal,
        bookAppointment,
        cancelAppointment,
        toggleFavorite,
        isFavorite,
        addReview,
        addContactMessage,
        removeToast,
        showToast,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = (): ClinicContextType => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
