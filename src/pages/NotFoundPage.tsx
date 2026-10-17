import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, Search, Calendar } from 'lucide-react';
import { useClinic } from '../context/ClinicContext.tsx';
import { AdSection } from '../components/AdSection.tsx';

export const NotFoundPage: React.FC = () => {
  const { openBookingModal } = useClinic();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center border border-slate-200 shadow-lg space-y-5">
          <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-3xl font-extrabold font-heading">
            404
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              We couldn't locate the clinical page or resource you requested. It might have moved, or the URL might be mistyped.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-center text-xs sm:text-sm shadow-xs transition flex items-center justify-center space-x-1.5"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/services"
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl text-center text-xs sm:text-sm transition flex items-center justify-center space-x-1.5"
            >
              <Search className="w-4 h-4" />
              <span>All Treatments</span>
            </Link>
          </div>
        </div>
      </div>

      <AdSection />
    </div>
  );
};
