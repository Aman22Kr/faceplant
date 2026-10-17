import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Heart,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Share2,
} from 'lucide-react';
import { SERVICES, CLINIC_INFO, DOCTOR_PROFILE } from '../data/clinicData.ts';
import { useClinic } from '../context/ClinicContext.tsx';
import { AdSection } from '../components/AdSection.tsx';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { openBookingModal, toggleFavorite, isFavorite, showToast } = useClinic();

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 font-heading">
            Treatment Not Found
          </h2>
          <p className="text-xs text-slate-600">
            The requested medical procedure or treatment could not be located in our clinical directory.
          </p>
          <Link
            to="/services"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition"
          >
            Return to Healthcare Services
          </Link>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(service.id);
  const relatedServices = SERVICES.filter(
    (s) => s.category === service.category && s.id !== service.id
  ).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${service.name} - FacePlant Clinic`,
        text: service.shortDesc,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Treatment link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* Breadcrumb Bar */}
        <div className="bg-white border-b border-slate-200 py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-1.5 overflow-hidden">
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link to="/services" className="hover:text-blue-600">
                Healthcare Services
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
                {service.name}
              </span>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="hidden sm:flex items-center space-x-1 text-slate-600 hover:text-slate-900 font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Hero Detail Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-10 sm:py-14 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{service.category}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading leading-tight">
                {service.name}
              </h1>

              <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
                {service.shortDesc}
              </p>

              {/* Quick Specs */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Session: {service.durationMinutes} minutes</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Cost Est: {service.priceEstimate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => openBookingModal(service.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center space-x-2 text-sm cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Treatment</span>
                </button>

                <button
                  onClick={() => toggleFavorite(service.id)}
                  className={`px-4 py-3.5 rounded-xl border font-semibold text-sm transition flex items-center space-x-2 cursor-pointer ${
                    favorited
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                  <span>{favorited ? 'Bookmarked' : 'Save Treatment'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white cursor-pointer"
                  title="Share Treatment"
                  aria-label="Share Treatment"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 aspect-4/3 relative bg-slate-800">
                <img
                  src={service.photo}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Treatment Breakdown Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* 1. Clinical Overview */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                  Clinical Overview & Mechanism
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {service.fullDesc}
                </p>
                <div className="pt-2 text-xs text-slate-500">
                  Practiced by <strong className="text-slate-800">{CLINIC_INFO.doctorName}</strong> ({CLINIC_INFO.doctorDegrees}) in our sterilized clinical suites in Mumbai.
                </div>
              </div>

              {/* 2. Key Clinical Benefits */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  Key Treatment Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Step-by-Step In-Clinic Procedure */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  Step-by-Step Procedure Workflow
                </h3>
                <div className="space-y-4">
                  {service.procedureSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="flex-1 text-xs sm:text-sm text-slate-700 pt-0.5">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Ideal Candidate & Frequency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 font-heading">
                    Ideal Candidate
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {service.idealFor}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 font-heading">
                    Recommended Sessions
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {service.sessionsRecommended}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Doctor Booking Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-5 sticky top-28">
                <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                  <img
                    src={DOCTOR_PROFILE.photo}
                    alt={DOCTOR_PROFILE.name}
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-blue-500 shadow-xs"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{DOCTOR_PROFILE.name}</h4>
                    <p className="text-xs text-blue-600 font-medium">{DOCTOR_PROFILE.title}</p>
                    <span className="text-[11px] text-slate-500">{DOCTOR_PROFILE.experience}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Estimated Fee:</span>
                    <strong className="text-slate-900">{service.priceEstimate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Time:</span>
                    <strong className="text-slate-900">{service.durationMinutes} mins</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <strong className="text-slate-900">Antop Hill, Mumbai</strong>
                  </div>
                </div>

                <button
                  onClick={() => openBookingModal(service.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition text-xs sm:text-sm cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Treatment</span>
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  Online video, audio or in-person clinic visits available.
                </p>
              </div>

              {/* Related Treatments */}
              {relatedServices.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 font-heading">
                    Related {service.category} Procedures
                  </h4>
                  <div className="space-y-3">
                    {relatedServices.map((rel) => (
                      <Link
                        key={rel.id}
                        to={`/services/${rel.slug}`}
                        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <img
                          src={rel.photo}
                          alt={rel.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate">
                            {rel.name}
                          </h5>
                          <span className="text-[10px] text-slate-500">{rel.durationMinutes} mins</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Base Page Ad Section */}
      <AdSection />
    </div>
  );
};
