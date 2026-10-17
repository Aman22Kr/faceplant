import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
  Users,
  ChevronRight,
  Stethoscope,
} from 'lucide-react';
import { CLINIC_INFO, DOCTOR_PROFILE } from '../data/clinicData.ts';
import { useClinic } from '../context/ClinicContext.tsx';
import { AdSection } from '../components/AdSection.tsx';

export const AboutPage: React.FC = () => {
  const { openBookingModal } = useClinic();

  const values = [
    {
      title: 'Precision Diagnosis',
      desc: 'In-depth digital trichoscopy, Wood’s lamp analysis, and individualized skin barrier assessments before commencing any aesthetic or medical protocol.',
      icon: Stethoscope,
    },
    {
      title: 'Evidence-Based Medicine',
      desc: 'Every aesthetic injectable, peel, and minor surgical intervention is grounded in certified medical peer-reviewed dermatological literature.',
      icon: Award,
    },
    {
      title: 'Strict Hospital Sterilization',
      desc: 'Multi-stage ultrasonic instrument cleaning, autoclave sterilization, and single-use disposable consumables ensuring 100% patient safety.',
      icon: ShieldCheck,
    },
    {
      title: 'Patient-First Ethics',
      desc: 'Transparent pricing with no overtreating. We prioritize gentle, long-lasting biological results over aggressive quick fixes.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-14 sm:py-20 px-4">
          <div className="max-w-5xl mx-auto space-y-3 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700/50">
              About FacePlant Clinic
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
              Pioneering Cosmetology & Aesthetic Medicine in Mumbai
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Founded on the pillars of scientific precision, patient care, and clinical safety, FacePlant Clinic is Mumbai's trusted destination for transformative skincare and wellness.
            </p>
          </div>
        </div>

        {/* Story & Philosophy */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-12">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Our Mission & Practice
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Delivering Unparalleled Clinical Care
                </h2>
                <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
                  <p>
                    FacePlant Clinic is a cutting-edge medical institution that specializes in providing unparalleled cosmetology and aesthetic services. The clinic offers a comprehensive range of treatments for a variety of skin conditions and general health, utilizing the most advanced technology and equipment available.
                  </p>
                  <p>
                    Advanced treatments for acne, rosacea, eczema, psoriasis, and melasma as well as anti-aging and rejuvenation solutions are provided by the clinic's highly trained and experienced staff. Led by Dr. Huma Shaikh, a renowned Cosmetologist and General Practitioner, the clinic's primary objective is to deliver exceptional medical care to each and every patient.
                  </p>
                  <p>
                    In addition to their cosmetology services, FacePlant Clinic also offers an array of aesthetic treatments such as Botox, fillers, laser skin resurfacing, and chemical peels. The clinic maintains a strict adherence to precision, safety and efficacy in all procedures. FacePlant Clinic offers comprehensive care for skin, hair, and nail health, including innovative solutions for hair loss and scalp disorders. It is the ultimate destination for all of your skincare needs, where patients can expect outstanding results.
                  </p>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-4/5">
                  <img
                    src="https://uat-icareheal.s3.ap-south-1.amazonaws.com/uatwebcontent/ABOUTBANNERIMAGE_260.webp"
                    alt="FacePlant Clinic Interior"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Our Standards
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                What Sets FacePlant Apart
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v) => {
                const IconComponent = v.icon;
                return (
                  <div
                    key={v.title}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-heading">{v.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Doctor Highlight */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl">
            <img
              src={DOCTOR_PROFILE.photo}
              alt={DOCTOR_PROFILE.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover object-top border-2 border-blue-400 shrink-0"
            />
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Clinical Director
              </span>
              <h3 className="text-2xl font-bold font-heading text-white">{DOCTOR_PROFILE.name}</h3>
              <p className="text-xs text-blue-200 font-medium">
                {DOCTOR_PROFILE.degrees} • {DOCTOR_PROFILE.experience}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Alumna of prestigious medical clerkships at Sir JJ Hospital, St. George Hospital, Prince Ali Khan Hospital, and Vadia Hospital with 12 years of specialized aesthetic practice.
              </p>
              <div className="pt-2">
                <Link
                  to="/doctor-profile"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl transition"
                >
                  <span>View Full Credentials</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
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
