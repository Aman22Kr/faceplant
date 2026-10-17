import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  Building2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Heart,
  ChevronRight,
  User,
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext.tsx';
import { SERVICES, CLINIC_INFO } from '../data/clinicData.ts';
import { formatReadableDate, getModeLabel } from '../utils/logic.ts';
import { AdSection } from '../components/AdSection.tsx';

export const MyAppointmentsPage: React.FC = () => {
  const {
    appointments,
    cancelAppointment,
    openBookingModal,
    favorites,
    toggleFavorite,
  } = useClinic();

  const savedServices = SERVICES.filter((s) => favorites.includes(s.id));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Patient Portal • LocalStorage
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              My Appointments & Saved Treatments
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Track your scheduled consultations with Dr. Huma Shaikh and access bookmarked aesthetic treatments anytime on this device.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
          {/* Section 1: Booked Appointments */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                <span>Scheduled Appointments ({appointments.length})</span>
              </h2>
              <button
                onClick={() => openBookingModal()}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                + Book New
              </button>
            </div>

            {appointments.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-xs space-y-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 font-heading">
                  No Appointments Booked Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You haven't scheduled any consultations with Dr. Huma Shaikh yet. Pick a time slot to consult online or in our Mumbai clinic.
                </p>
                <button
                  onClick={() => openBookingModal()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Book an Appointment
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200">
                          {apt.id}
                        </span>
                        <h4 className="font-bold text-base text-slate-900">{apt.serviceName}</h4>
                      </div>

                      <div className="flex items-center space-x-2">
                        {apt.status === 'Confirmed' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Confirmed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                            <XCircle className="w-3.5 h-3.5" />
                            Cancelled
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                      <div>
                        <span className="text-slate-400 block mb-0.5">Patient Details</span>
                        <strong className="text-slate-900 block">{apt.patientName}</strong>
                        <span>{apt.patientPhone}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block mb-0.5">Date & Time</span>
                        <strong className="text-slate-900 block">
                          {formatReadableDate(apt.appointmentDate)}
                        </strong>
                        <span className="text-blue-600 font-semibold">{apt.appointmentSlot}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block mb-0.5">Consultation Mode</span>
                        <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                          {apt.mode === 'clinic' && <Building2 className="w-4 h-4 text-blue-600" />}
                          {apt.mode === 'video' && <Video className="w-4 h-4 text-purple-600" />}
                          {apt.mode === 'call' && <Phone className="w-4 h-4 text-emerald-600" />}
                          <span>{getModeLabel(apt.mode)}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{apt.location}</span>
                      </div>
                    </div>

                    {apt.notes && (
                      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <strong>Patient Note:</strong> {apt.notes}
                      </div>
                    )}

                    {apt.status === 'Confirmed' && (
                      <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-800 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Saved / Bookmarked Treatments */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                <span>Saved Treatments ({savedServices.length})</span>
              </h2>
              <Link
                to="/services"
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline"
              >
                Browse All Treatments &rarr;
              </Link>
            </div>

            {savedServices.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 space-y-3">
                <p className="text-xs text-slate-500">
                  You haven't bookmarked any treatments yet. Tap the heart icon on any treatment card to save it for quick reference!
                </p>
                <Link
                  to="/services"
                  className="inline-block bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-4 py-2 rounded-xl transition"
                >
                  Explore Healthcare Services
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={service.photo}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => toggleFavorite(service.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white text-rose-500 shadow-sm cursor-pointer"
                        title="Remove bookmark"
                        aria-label="Remove bookmark"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 font-heading">{service.name}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{service.shortDesc}</p>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                        <Link
                          to={`/services/${service.slug}`}
                          className="text-xs font-semibold text-slate-700 hover:text-blue-600"
                        >
                          Details &rarr;
                        </Link>
                        <button
                          onClick={() => openBookingModal(service.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Base Page Ad Section */}
      <AdSection />
    </div>
  );
};
