import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  ShieldCheck,
  Award,
  Sparkles,
  Heart,
  Video,
  Building2,
  ExternalLink,
  Plus,
  Minus,
  MessageSquare,
  Search,
} from 'lucide-react';
import {
  CLINIC_INFO,
  DOCTOR_PROFILE,
  GALLERY_PICTURES,
  HERO_SLIDES,
  SERVICES,
  SPECIALIZATIONS,
  FAQS,
} from '../data/clinicData.ts';
import { useClinic } from '../context/ClinicContext.tsx';
import { useAnimation } from '../context/AnimationContext.tsx';
import { AdSection } from '../components/AdSection.tsx';
import { isValidEmail, isValidPhone } from '../utils/logic.ts';

export const HomePage: React.FC = () => {
  const { openBookingModal, toggleFavorite, isFavorite, reviews, addReview, addContactMessage } =
    useClinic();
  const { speed } = useAnimation();

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide interval (disabled if animation speed is off)
  useEffect(() => {
    if (speed === 'off') return;
    const intervalTime = speed === 'slow' ? 8000 : speed === 'fast' ? 4000 : 6000;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [speed]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Services Filter State on Home
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const serviceCategories = [
    'All',
    'Skin & Pigmentation',
    'Hair & Scalp',
    'Anti-Aging & Rejuvenation',
    'Clinical Minor Surgeries',
    'Medi-Facials & Glow',
  ];

  const filteredServices =
    selectedCategory === 'All'
      ? SERVICES.slice(0, 8)
      : SERVICES.filter((s) => s.category === selectedCategory).slice(0, 8);

  // FAQs Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');
    if (!contactName.trim()) {
      setContactError('Please enter your name');
      return;
    }
    if (!isValidPhone(contactPhone)) {
      setContactError('Please enter a valid phone number');
      return;
    }
    if (contactEmail && !isValidEmail(contactEmail)) {
      setContactError('Please enter a valid email address');
      return;
    }
    if (!contactMessage.trim()) {
      setContactError('Please enter a short message');
      return;
    }

    addContactMessage({
      name: contactName.trim(),
      email: contactEmail.trim(),
      phone: contactPhone.trim(),
      message: contactMessage.trim(),
    });

    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactMessage('');
    setTimeout(() => setContactSuccess(false), 5000);
  };

  // Lightbox Modal for Media Pictures
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Add Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [revAuthor, setRevAuthor] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revText, setRevText] = useState('');
  const [revTreatment, setRevTreatment] = useState('Acne Treatment');

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revAuthor.trim() || !revText.trim()) return;
    addReview({
      author: revAuthor.trim(),
      rating: revRating,
      text: revText.trim(),
      treatment: revTreatment,
    });
    setRevAuthor('');
    setRevText('');
    setShowReviewModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* 1. HERO BANNER SLIDER (Matching Reference Visual Layout) */}
      <section className="relative bg-slate-900 text-white overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center">
        {HERO_SLIDES.map((slide, index) => {
          const isCurrent = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Gradient Overlay */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent"></div>
              <div className="absolute inset-0 bg-radial from-transparent to-slate-950/40"></div>

              {/* Slide Content */}
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center py-12">
                <div className="max-w-2xl space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-blue-600/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase text-white shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                    <span>{slide.badge}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-heading">
                    {slide.title}
                  </h1>

                  <p className="text-base sm:text-lg font-medium text-blue-200">
                    {slide.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => openBookingModal()}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer text-sm flex items-center space-x-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{slide.ctaText}</span>
                    </button>
                    <Link
                      to="/services"
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold px-5 py-3.5 rounded-xl transition text-sm flex items-center space-x-1.5"
                    >
                      <span>Explore All Services</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-sm border border-white/20 transition cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-sm border border-white/20 transition cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. STATS HIGHLIGHTS STRIP */}
      <section className="bg-white border-b border-slate-200/80 shadow-xs relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {CLINIC_INFO.stats.map((stat) => (
              <div key={stat.label} className="pt-4 lg:pt-0">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-heading">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT US SECTION (Exact Reference Copy Adapted for FacePlant) */}
      <section id="about" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Photo banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="https://uat-icareheal.s3.ap-south-1.amazonaws.com/uatwebcontent/ABOUTBANNERIMAGE_260.webp"
                  alt="FacePlant Clinic Interior"
                  className="w-full h-[360px] sm:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                    Mumbai Clinic
                  </span>
                  <p className="text-sm font-semibold">
                    Antop Hill, Mujavar Compound, Mumbai 400037
                  </p>
                </div>
              </div>

              {/* Floating verified badge */}
              <div className="absolute -bottom-5 -right-3 sm:right-4 bg-white rounded-xl shadow-lg border border-slate-100 p-3.5 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Dr. Huma Shaikh</div>
                  <div className="text-[11px] text-slate-500">12+ Years Clinical Practice</div>
                </div>
              </div>
            </div>

            {/* Right Col: About Text matching reference */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  About Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                  FacePlant Clinic
                </h2>
              </div>

              <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  <strong className="text-slate-900">FacePlant Clinic</strong> is a cutting-edge medical institution that specializes in providing unparalleled cosmetology and aesthetic services in Mumbai. The clinic offers a comprehensive range of treatments for a variety of skin conditions and general health, utilizing the most advanced technology and equipment available.
                </p>
                <p>
                  Advanced treatments for acne, rosacea, eczema, psoriasis, and melasma as well as anti-aging and rejuvenation solutions are provided by the clinic's highly trained and experienced staff. Led by <strong className="text-slate-900">Dr. Huma Shaikh</strong>, a renowned Cosmetologist and General Practitioner, the clinic's primary objective is to deliver exceptional medical care to each and every patient.
                </p>
                <p>
                  In addition to cosmetology services, FacePlant Clinic also offers an array of aesthetic treatments such as Botox, fillers, laser skin resurfacing, and chemical peels. The clinic maintains a strict adherence to precision, safety, and efficacy in all procedures. FacePlant Clinic offers comprehensive care for skin, hair, and nail health, including innovative solutions for hair loss and scalp disorders. It is the ultimate destination for all of your skincare needs, where patients can expect outstanding results.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => openBookingModal()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition cursor-pointer text-sm flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Consultation</span>
                </button>
                <Link
                  to="/doctor-profile"
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center space-x-1"
                >
                  <span>Read Doctor Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR SPECIALIZATIONS SECTION (Reference Match) */}
      <section id="specialities" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Areas of Medical Mastery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Our Specializations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Comprehensive Care for Skin, Hair, Nail Health & Aesthetic Procedures
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALIZATIONS.map((spec) => (
              <div
                key={spec.id}
                className="bg-white rounded-2xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/90 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 p-2">
                    <img src={spec.image} alt={spec.title} className="w-12 h-12 object-contain" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                    {spec.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {spec.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {spec.treatmentCount}+ Treatments
                  </span>
                  <Link
                    to={`/services?category=${encodeURIComponent(spec.title)}`}
                    className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center"
                  >
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-white border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 font-bold px-6 py-3 rounded-xl shadow-xs transition"
            >
              <span>View All Specializations & Services</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HEALTHCARE SERVICES (All 21 Services from Reference) */}
      <section id="services" className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Clinical Dermatology & Aesthetics
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-1">
                Our Healthcare Services
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Expert Cosmetology, Aesthetic Services and General Health Treatments
              </p>
            </div>
            <Link
              to="/services"
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center self-start md:self-end"
            >
              <span>View All 21 Treatments</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {filteredServices.map((service) => {
              const favorited = isFavorite(service.id);
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative overflow-hidden aspect-4/3 bg-slate-100">
                    <img
                      src={service.photo}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {service.category}
                    </span>

                    <button
                      onClick={() => toggleFavorite(service.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition cursor-pointer ${
                        favorited
                          ? 'bg-rose-50 text-rose-500 fill-rose-500'
                          : 'bg-slate-900/40 text-white hover:bg-slate-900/70'
                      }`}
                      title={favorited ? 'Remove from saved' : 'Save treatment'}
                      aria-label="Save treatment"
                    >
                      <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-base leading-snug drop-shadow-xs font-heading">
                        {service.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {service.shortDesc}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">
                        {service.priceEstimate.split(' ')[0]} est.
                      </span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {service.durationMinutes} mins
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        to={`/services/${service.slug}`}
                        className="text-center text-xs font-semibold py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 transition"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => openBookingModal(service.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition shadow-2xs cursor-pointer"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-6 py-3 rounded-xl transition"
            >
              <span>View All 21 Medical Services</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. MEET DOCTOR SHOWCASE (Dr. Huma Shaikh - Direct Reference Replication) */}
      <section id="doctor" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Doctor Card */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-6 shadow-inner">
                <img
                  src={DOCTOR_PROFILE.photo}
                  alt={DOCTOR_PROFILE.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Verified Practitioner
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                    {DOCTOR_PROFILE.name}
                  </h3>
                  <p className="text-sm font-semibold text-blue-600">
                    {DOCTOR_PROFILE.title}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-700 py-3 border-y border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-medium">{DOCTOR_PROFILE.degrees}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{DOCTOR_PROFILE.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Licence No. {DOCTOR_PROFILE.licenceNo}</span>
                  </div>
                </div>

                {/* Consultation Modes (Reference Match) */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Available Consultation Modes
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                    <div className="bg-slate-50 border border-slate-200 py-2 rounded-lg text-slate-700 flex flex-col items-center">
                      <Phone className="w-4 h-4 text-emerald-600 mb-1" />
                      <span>Call</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 py-2 rounded-lg text-slate-700 flex flex-col items-center">
                      <Video className="w-4 h-4 text-purple-600 mb-1" />
                      <span>Video Call</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 py-2 rounded-lg text-slate-700 flex flex-col items-center">
                      <Building2 className="w-4 h-4 text-blue-600 mb-1" />
                      <span>In Person</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openBookingModal()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition cursor-pointer text-sm flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book an appointment</span>
                </button>
              </div>
            </div>

            {/* Right Doctor Bio and Background */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Lead Cosmetologist & General Practitioner
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mt-1">
                  Excellence in Aesthetic Medicine
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {DOCTOR_PROFILE.about}
              </p>

              {/* Prestigious Hospital Internships */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300 font-heading">
                  Clinical Clerkships & Hospital Training
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                  {DOCTOR_PROFILE.internships.map((inst) => (
                    <div key={inst} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/doctor-profile"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3 rounded-xl transition text-sm flex items-center space-x-2"
                >
                  <span>More Details & Credentials</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="text-blue-300 hover:text-white font-semibold text-sm flex items-center space-x-1.5 py-3"
                >
                  <Phone className="w-4 h-4" />
                  <span>Direct Help: {CLINIC_INFO.displayPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PATIENT TESTIMONIALS (Reference Match) */}
      <section id="testimonials" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Patient Feedback
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-1">
                Testimonials
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                What our Patients say about Dr. Huma Shaikh & FacePlant Clinic
              </p>
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-white border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Leave a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{t.author}</h4>
                    {t.treatment && (
                      <span className="text-[11px] text-blue-600 font-medium">{t.treatment}</span>
                    )}
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified Patient
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. MEDIA PICTURES / CLINICAL GALLERY (Reference Match) */}
      <section id="gallery" className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Clinic Environment
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-1">
                Media Pictures
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Explore our treatment suites, hygiene setup, and clinical diagnostic stations
              </p>
            </div>
            <Link
              to="/gallery"
              className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
            >
              <span>View Full Gallery</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_PICTURES.map((pic) => (
              <div
                key={pic.id}
                onClick={() => setLightboxImage(pic.image)}
                className="group relative rounded-2xl overflow-hidden shadow-xs border border-slate-200 aspect-4/3 cursor-pointer"
              >
                <img
                  src={pic.image}
                  alt={pic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300">
                    {pic.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                    {pic.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS (Accordion with all 9 reference FAQs) */}
      <section id="faq" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Clear Guidance & Medical Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">
              Authentic answers to common patient questions regarding treatments, safety, and procedures
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-800 hover:text-blue-600 transition cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-heading">{faq.question}</span>
                    <span className="p-1 rounded-full bg-slate-100 text-slate-600 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Category: {faq.category}</span>
                        <button
                          onClick={() => openBookingModal()}
                          className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                        >
                          Book consultation regarding this &rarr;
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              Have another question? Call us directly at{' '}
              <a href={`tel:${CLINIC_INFO.phone}`} className="text-blue-600 font-bold underline">
                {CLINIC_INFO.displayPhone}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 10. LOCATION & LOCATION MAP SECTION (Reference Match) */}
      <section id="location" className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Visit Us in Mumbai
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-1">
              Location & Location Map
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Address & Timings Details Card */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Address
                    </h3>
                    <p className="text-sm font-semibold text-slate-900 mt-1 leading-relaxed">
                      {CLINIC_INFO.address}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Landmark: Behind Shaikh Mistri Dargah, Antop Hill
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={CLINIC_INFO.gmapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition"
                  >
                    <span>Get Direction</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`tel:${CLINIC_INFO.phone}`}
                    className="inline-flex items-center space-x-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Call Clinic</span>
                  </a>
                </div>
              </div>

              {/* Working Hours Schedule (Reference Match) */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Working Hours</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  {CLINIC_INFO.timings.map((t, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between py-1 border-b border-slate-200/60 last:border-none"
                    >
                      <span className="font-semibold text-slate-700">{t.day}</span>
                      <span
                        className={
                          t.status === 'Closed' ? 'text-rose-500 font-bold' : 'text-slate-900'
                        }
                      >
                        {t.status === 'Closed'
                          ? 'Closed'
                          : '12:00 PM - 03:00 PM & 07:00 PM - 11:00 PM'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Map Embed Iframe (Reference Match) */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-md h-[400px] sm:h-[460px] bg-slate-100 relative">
              <iframe
                title="FacePlant Clinic Location"
                src={CLINIC_INFO.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 11. CONTACT US FORM SECTION (Reference Match) */}
      <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200">
            <div className="text-center mb-8 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Get In Touch
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Contact Us
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Send your skincare inquiry directly to Dr. Huma Shaikh's clinical staff
              </p>
            </div>

            {contactSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Thank you! Your message has been sent to FacePlant Clinic. We will call you shortly.
                </span>
              </div>
            )}

            {contactError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm">
                {contactError}
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. Faheem Khan"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 mb-1">
                    Email Id (Optional)
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="e.g. faheem@gmail.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-medium text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="e.g. 9970849909"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-medium text-slate-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  placeholder="Describe your skin concern or inquiry..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition cursor-pointer text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 12. SMALLER SECTION IN BASE OF PAGE FOR ADS (Explicit Prompt Requirement) */}
      <AdSection />

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700">
            <img src={lightboxImage} alt="Clinic Full View" className="w-full h-full object-contain" />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 bg-slate-900/80 text-white p-2 rounded-full cursor-pointer hover:bg-slate-800"
              aria-label="Close image preview"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 font-heading mb-3">
              Share Your Experience
            </h3>
            <form onSubmit={handleAddReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={revAuthor}
                  onChange={(e) => setRevAuthor(e.target.value)}
                  placeholder="e.g. Ananya S."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Treatment Received</label>
                <select
                  value={revTreatment}
                  onChange={(e) => setRevTreatment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRevRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= revRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your Review *</label>
                <textarea
                  rows={3}
                  required
                  value={revText}
                  onChange={(e) => setRevText(e.target.value)}
                  placeholder="Tell others how Dr. Huma helped your skin or hair..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-800"
                ></textarea>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl cursor-pointer text-sm"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 rounded-xl cursor-pointer text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
