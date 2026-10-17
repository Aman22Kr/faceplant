import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData.ts';
import { useClinic } from '../context/ClinicContext.tsx';

export const Footer: React.FC = () => {
  const { openBookingModal } = useClinic();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner / Quick CTA in Footer */}
      <div className="bg-blue-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-blue-700/60 px-2.5 py-1 rounded-full">
              Ready for Healthier, Radiant Skin?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-2 font-heading">
              Consult with Dr. Huma Shaikh Today
            </h3>
            <p className="text-sm text-blue-100 max-w-xl mt-1">
              Experienced Cosmetologist & General Practitioner offering in-clinic, video, and audio consultations in Antop Hill, Mumbai.
            </p>
          </div>
          <button
            onClick={() => openBookingModal()}
            className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap text-sm flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Book an appointment</span>
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Col 1: About FacePlant */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                  Face<span className="text-blue-400">Plant</span>
                </span>
                <span className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  Cosmetology & Aesthetics
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              FacePlant Clinic is a premier medical institution in Mumbai specializing in cutting-edge cosmetology, aesthetic dermatology, and primary healthcare services led by Dr. Huma Shaikh.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div><strong>Registration No:</strong> 56076</div>
              <div><strong>Qualifications:</strong> BHMS, CCH, DIPLOMA (SKIN AESTHETICS)</div>
            </div>
          </div>

          {/* Col 2: What We Offer (Reference Match) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              What We Offer
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link
                  to="/services"
                  className="hover:text-blue-400 transition flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                  <span>Our Healthcare Services (21 Treatments)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/#specialities"
                  className="hover:text-blue-400 transition flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                  <span>Our Specializations</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=Hair+%26+Scalp"
                  className="hover:text-blue-400 transition flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                  <span>PRP Hair & Alopecia Care</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=Skin+%26+Pigmentation"
                  className="hover:text-blue-400 transition flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                  <span>Acne & Melasma Solutions</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=Clinical+Minor+Surgeries"
                  className="hover:text-blue-400 transition flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                  <span>Minor Surgeries (Lipoma, Cyst, Tags)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/doctor-profile"
                  className="hover:text-blue-400 transition flex items-center space-x-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                  <span>Meet Dr. Huma Shaikh</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Working Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Clinic Working Hours</span>
            </h4>
            <div className="text-xs space-y-2 text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="font-semibold text-rose-400">Monday</span>
                <span className="text-rose-400 font-bold">Closed</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Tuesday - Sunday</span>
                <span className="text-emerald-400 font-semibold">12:00 PM - 03:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Evening Session</span>
                <span className="text-emerald-400 font-semibold">07:00 PM - 11:00 PM</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Prior appointment booking is recommended to minimize waiting time.
              </p>
            </div>
          </div>

          {/* Col 4: Contact Us (Reference Match) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {CLINIC_INFO.address}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="hover:text-blue-400 transition"
                >
                  Phone: {CLINIC_INFO.displayPhone}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="hover:text-blue-400 transition"
                >
                  Email: {CLINIC_INFO.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={CLINIC_INFO.gmapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} FacePlant Clinic. All rights reserved.</p>
          <div className="flex items-center space-x-5">
            <Link to="/about" className="hover:text-slate-200 transition">
              About
            </Link>
            <Link to="/faq" className="hover:text-slate-200 transition">
              FAQs
            </Link>
            <a
              href="#/about"
              className="hover:text-slate-200 transition"
            >
              Terms of Use
            </a>
            <a
              href="#/about"
              className="hover:text-slate-200 transition"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
