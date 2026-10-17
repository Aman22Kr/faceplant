/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AnimationProvider } from './context/AnimationContext.tsx';
import { ClinicProvider } from './context/ClinicContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { AnimationControlsModal } from './components/AnimationControlsModal.tsx';
import { ToastContainer } from './components/ToastContainer.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { ServiceDetailPage } from './pages/ServiceDetailPage.tsx';
import { DoctorProfilePage } from './pages/DoctorProfilePage.tsx';
import { MyAppointmentsPage } from './pages/MyAppointmentsPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { FAQPage } from './pages/FAQPage.tsx';
import { GalleryPage } from './pages/GalleryPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

export default function App() {
  return (
    <AnimationProvider>
      <ClinicProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen text-slate-800 bg-slate-50 selection:bg-blue-600 selection:text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                {/* Support reference doctor profile path alias as well */}
                <Route path="/doctor-profile" element={<DoctorProfilePage />} />
                <Route
                  path="/website-doctor-profile/*"
                  element={<DoctorProfilePage />}
                />
                <Route path="/my-appointments" element={<MyAppointmentsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />

            {/* Global Overlays & Modals */}
            <BookingModal />
            <AnimationControlsModal />
            <ToastContainer />
          </div>
        </HashRouter>
      </ClinicProvider>
    </AnimationProvider>
  );
}
