import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData.ts';
import { useClinic } from '../context/ClinicContext.tsx';
import { AdSection } from '../components/AdSection.tsx';
import { isValidEmail, isValidPhone } from '../utils/logic.ts';

export const ContactPage: React.FC = () => {
  const { openBookingModal, addContactMessage } = useClinic();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your name');
      return;
    }
    if (!isValidPhone(phone)) {
      setError('Please provide a valid 10-digit mobile number');
      return;
    }
    if (email && !isValidEmail(email)) {
      setError('Please provide a valid email address');
      return;
    }
    if (!message.trim()) {
      setError('Please provide a brief message or question');
      return;
    }

    addContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 sm:py-16 px-4">
          <div className="max-w-5xl mx-auto space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700/50">
              Contact & Location
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Connect with FacePlant Clinic Mumbai
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Reach out to Dr. Huma Shaikh and our clinical support staff for appointments, inquiries, or personalized skincare consultations.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">Call or WhatsApp</h3>
              <p className="text-xs text-slate-500">
                Direct phone helpline for consultations and questions.
              </p>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="block text-sm font-bold text-blue-600 hover:underline pt-1"
              >
                {CLINIC_INFO.displayPhone}
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">Email Inquiries</h3>
              <p className="text-xs text-slate-500">
                Send diagnostic photos, medical reports, or feedback.
              </p>
              <a
                href={`mailto:${CLINIC_INFO.email}`}
                className="block text-sm font-bold text-blue-600 hover:underline pt-1"
              >
                {CLINIC_INFO.email}
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">Clinic Address</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {CLINIC_INFO.address}
              </p>
              <a
                href={CLINIC_INFO.gmapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-600 hover:underline pt-1"
              >
                <span>View Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Form & Timings Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Contact Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Send a Message
                </span>
                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  How Can We Help You?
                </h3>
              </div>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Thank you! Your message has been safely received. Our clinic team will get in touch with you shortly.
                  </span>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-full-name" className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="contact-full-name"
                    type="text"
                    required
                    placeholder="e.g. Preeti Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-form-phone" className="block text-xs font-medium text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="contact-form-phone"
                      type="tel"
                      required
                      placeholder="e.g. 9970849909"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-form-email" className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="contact-form-email"
                      type="email"
                      placeholder="e.g. preeti@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-form-message" className="block text-xs font-medium text-slate-700 mb-1">
                    Your Concern / Message *
                  </label>
                  <textarea
                    id="contact-form-message"
                    rows={4}
                    required
                    placeholder="Tell us what skin or hair concern you'd like Dr. Huma to evaluate..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition cursor-pointer text-sm"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* Right 5 Cols: Working Hours Schedule */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-lg font-heading">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Working Hours</span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                {CLINIC_INFO.timings.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-2 border-b border-slate-100 last:border-none"
                  >
                    <span className="font-semibold text-slate-700">{t.day}</span>
                    <span
                      className={
                        t.status === 'Closed' ? 'text-rose-500 font-bold' : 'text-slate-900'
                      }
                    >
                      {t.status === 'Closed' ? 'Closed' : '12-3 PM & 7-11 PM'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openBookingModal()}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Book an Appointment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Location Map Embed */}
          <div id="location" className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Find Us On Google Maps
            </h3>
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-96 bg-slate-100">
              <iframe
                title="FacePlant Clinic Map"
                src={CLINIC_INFO.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Base Page Ad Section */}
      <AdSection />
    </div>
  );
};
