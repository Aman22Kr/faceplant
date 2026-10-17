import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  Calendar,
  Menu,
  X,
  Sparkles,
  Bookmark,
  Search,
  MapPin,
  Clock,
  Heart,
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData.ts';
import { useClinic } from '../context/ClinicContext.tsx';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookingModal, appointments, favorites } = useClinic();
  const location = useLocation();

  const confirmedCount = appointments.filter((a) => a.status === 'Confirmed').length;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Specialities', path: '/#specialities' },
    { label: 'Healthcare Services', path: '/services' },
    { label: 'Meet Doctor', path: '/doctor-profile' },
    { label: 'Testimonials', path: '/#testimonials' },
    { label: 'Media Gallery', path: '/gallery' },
    { label: 'Location', path: '/contact#location' },
    { label: 'FAQs', path: '/faq' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path.startsWith('/#')) return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100">
      {/* Top Contact Bar (Matching Reference Site Top Row) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left contact info */}
          <div className="flex items-center flex-wrap justify-center sm:justify-start gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400">Call Us:</span>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="font-medium text-white hover:text-blue-400 transition flex items-center space-x-1"
              >
                <Phone className="w-3 h-3 text-blue-400" />
                <span>{CLINIC_INFO.displayPhone}</span>
              </a>
            </div>
            <div className="hidden md:inline text-slate-600">|</div>
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400">Email Us:</span>
              <a
                href={`mailto:${CLINIC_INFO.email}`}
                className="font-medium text-white hover:text-blue-400 transition flex items-center space-x-1"
              >
                <Mail className="w-3 h-3 text-blue-400" />
                <span>{CLINIC_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Right quick portals */}
          <div className="flex items-center space-x-3 text-[11px] sm:text-xs">
            <Link
              to="/my-appointments"
              className="flex items-center space-x-1.5 text-slate-300 hover:text-white transition py-0.5 px-2 rounded hover:bg-slate-800"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>My Appointments</span>
              {confirmedCount > 0 && (
                <span className="bg-blue-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {confirmedCount}
                </span>
              )}
            </Link>

            <Link
              to="/services?filter=saved"
              className="flex items-center space-x-1 text-slate-300 hover:text-white transition py-0.5 px-2 rounded hover:bg-slate-800"
              title="Saved Treatments"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
              <span>Saved</span>
              {favorites.length > 0 && (
                <span className="bg-rose-500 text-white font-bold text-[10px] px-1 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Branding */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-heading">
                Face<span className="text-blue-600">Plant</span>
              </span>
              <span className="block text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wider uppercase -mt-1">
                Cosmetology & Aesthetics Mumbai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-xs xl:text-sm font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    active
                      ? 'text-blue-600 bg-blue-50/80'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <Link
              to="/services"
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              title="Search Treatments"
              aria-label="Search Treatments"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              data-testid="header-book-btn"
              onClick={() => openBookingModal()}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center space-x-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => openBookingModal()}
              className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-xs cursor-pointer"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <Link
              to="/my-appointments"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-1.5 bg-slate-50 text-slate-700 py-2 rounded-lg text-xs font-semibold"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>My Appointments ({confirmedCount})</span>
            </Link>
            <Link
              to="/services?filter=saved"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-1.5 bg-rose-50 text-rose-700 py-2 rounded-lg text-xs font-semibold"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Saved ({favorites.length})</span>
            </Link>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive(link.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-center shadow-md cursor-pointer flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an appointment</span>
            </button>
            <div className="text-center text-xs text-slate-500 pt-1">
              Call us: <strong className="text-slate-800">{CLINIC_INFO.displayPhone}</strong>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
