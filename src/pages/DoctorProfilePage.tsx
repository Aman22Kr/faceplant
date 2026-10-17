import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Clock,
  ShieldCheck,
  Phone,
  Mail,
  Video,
  Building2,
  Calendar,
  CheckCircle,
  Star,
  MapPin,
  ChevronRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { DOCTOR_PROFILE, CLINIC_INFO, SERVICES } from '../data/clinicData.ts';
import { useClinic } from '../context/ClinicContext.tsx';
import { AdSection } from '../components/AdSection.tsx';

export const DoctorProfilePage: React.FC = () => {
  const { openBookingModal, reviews } = useClinic();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* Profile Hero Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 sm:py-16 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Doctor Photo */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative w-64 sm:w-72 aspect-square rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-slate-800">
                <img
                  src={DOCTOR_PROFILE.photo}
                  alt={DOCTOR_PROFILE.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Verified Doctor
                </div>
              </div>
            </div>

            {/* Doctor Headline */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700/50">
                Doctor Profile • Licence No. {DOCTOR_PROFILE.licenceNo}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
                {DOCTOR_PROFILE.name}
              </h1>

              <p className="text-base sm:text-lg font-semibold text-blue-200">
                {DOCTOR_PROFILE.title}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  {DOCTOR_PROFILE.degrees}
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-400" />
                  {DOCTOR_PROFILE.experience}
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {DOCTOR_PROFILE.rating} Rating ({reviews.length} Patient Reviews)
                </span>
              </div>

              {/* Consultation Modes */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => openBookingModal()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center space-x-2 text-sm cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation With Dr. Huma</span>
                </button>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-5 py-3.5 rounded-xl transition text-sm flex items-center space-x-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: {CLINIC_INFO.displayPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 Cols: Bio, Experience, Hospital Training */}
            <div className="lg:col-span-8 space-y-10">
              {/* Detailed Biography (Exact Reference Replication) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                  About Dr. Huma Shaikh
                </h2>
                <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
                  <p>
                    {DOCTOR_PROFILE.about}
                  </p>
                  <p>
                    Throughout her 12 years of practice in Mumbai, Dr. Huma has championed minimally invasive, evidence-backed aesthetic medicine. Her clinical ethos centers on skin barrier preservation, patient education, and natural-looking rejuvenation rather than over-treating or utilizing aggressive, damaging modalities.
                  </p>
                </div>
              </div>

              {/* Hospital Training & Clinical Clerkships */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  Hospital Clerkships & Clinical Training
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Extensive internship experience and hands-on medical training at leading Mumbai hospitals:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DOCTOR_PROFILE.internships.map((hospital, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 p-4 rounded-2xl bg-blue-50/60 border border-blue-100"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                        {hospital}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialization & Scope of Procedures */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  Key Areas of Clinical Focus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Cosmetology</h4>
                    <p className="text-xs text-slate-600">
                      Acne vulgaris, cystic flares, hyperpigmentation, melasma, and chemical resurfacing.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Trichology & PRP</h4>
                    <p className="text-xs text-slate-600">
                      Telogen effluvium, androgenetic alopecia, autologous PRP, and scalp mesotherapy.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Minor Surgeries</h4>
                    <p className="text-xs text-slate-600">
                      Painless in-office lipoma enucleation, sebaceous cyst excision, and sutureless earlobe repair.
                    </p>
                  </div>
                </div>
              </div>

              {/* Patient Testimonials for Dr. Huma */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                    Patient Reviews & Experiences
                  </h3>
                  <span className="text-xs font-semibold text-blue-600">
                    {reviews.length} Verified Reviews
                  </span>
                </div>

                <div className="space-y-4">
                  {reviews.slice(0, 4).map((r) => (
                    <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xs sm:text-sm text-slate-900">{r.author}</div>
                        <div className="flex items-center text-amber-400">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 italic">&ldquo;{r.text}&rdquo;</p>
                      {r.treatment && (
                        <div className="text-[11px] text-blue-600 font-medium">{r.treatment}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Quick Appointment & Clinic Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-5 sticky top-28">
                <div className="text-center pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Consultation Fee
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1 font-heading">
                    {DOCTOR_PROFILE.consultationFee}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Pay in clinic or during online consult</p>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{CLINIC_INFO.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Tue - Sun: 12-3 PM & 7-11 PM (Mon Closed)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Direct: {CLINIC_INFO.displayPhone}</span>
                  </div>
                </div>

                <button
                  onClick={() => openBookingModal()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition cursor-pointer text-sm flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book an appointment</span>
                </button>

                <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-500 text-center">
                  Instant confirmation. Slot stored safely in your browser local storage.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Base Page Ad Section */}
      <AdSection />
    </div>
  );
};
