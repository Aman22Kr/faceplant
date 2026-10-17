import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  Heart,
  ChevronRight,
  Calendar,
  Sparkles,
  ArrowUpDown,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { SERVICES } from '../data/clinicData.ts';
import { useClinic } from '../context/ClinicContext.tsx';
import { AdSection } from '../components/AdSection.tsx';
import { filterServices } from '../utils/logic.ts';

export const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialFilter = searchParams.get('filter');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilter === 'saved' ? 'Saved' : initialCategory
  );
  const [sortBy, setSortBy] = useState<'name' | 'duration'>('name');

  const { openBookingModal, toggleFavorite, isFavorite, favorites } = useClinic();

  const categories = [
    'All',
    'Saved',
    'Skin & Pigmentation',
    'Hair & Scalp',
    'Anti-Aging & Rejuvenation',
    'Clinical Minor Surgeries',
    'Medi-Facials & Glow',
  ];

  // Update URL query parameters when category changes
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      searchParams.delete('filter');
    } else if (cat === 'Saved') {
      searchParams.delete('category');
      searchParams.set('filter', 'saved');
    } else {
      searchParams.delete('filter');
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Base list depending on Saved toggle
  let baseList = SERVICES;
  if (selectedCategory === 'Saved') {
    baseList = SERVICES.filter((s) => favorites.includes(s.id));
  } else if (selectedCategory !== 'All') {
    baseList = SERVICES.filter((s) => s.category === selectedCategory);
  }

  // Filter with search term
  let filtered = filterServices(baseList, searchTerm, 'All');

  // Sort
  if (sortBy === 'duration') {
    filtered = [...filtered].sort((a, b) => a.durationMinutes - b.durationMinutes);
  } else {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 sm:py-16 px-4">
          <div className="max-w-7xl mx-auto space-y-3 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700/50">
              Clinical Directory • 21 Treatments
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
              Healthcare Services & Aesthetic Treatments
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              Scientifically grounded cosmetology, advanced trichology, anti-aging therapies, and minor clinical surgeries provided by Dr. Huma Shaikh in Mumbai.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 px-4 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by condition, treatment name, or keywords (e.g. acne, PRP, scar)..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 self-end lg:self-center">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'duration')}
                className="bg-slate-50 border border-slate-300 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none"
              >
                <option value="name">Name (A-Z)</option>
                <option value="duration">Duration (Shortest)</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pt-3 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat === 'Saved' && <Heart className="w-3.5 h-3.5 fill-current" />}
                <span>{cat}</span>
                {cat === 'Saved' && favorites.length > 0 && (
                  <span className="bg-white/30 text-white text-[10px] px-1.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Services Results List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
            <span>
              Showing <strong className="text-slate-800">{filtered.length}</strong> treatments
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              {searchTerm ? ` matching "${searchTerm}"` : ''}
            </span>
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  handleCategoryChange('All');
                }}
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4 my-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-heading">
                No matching treatments found
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We couldn't find any procedures matching &ldquo;{searchTerm}&rdquo;. Try another term or browse our complete treatment catalog.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-xs transition"
              >
                Show All Treatments
              </button>
            </div>
          ) : (
            /* Services Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((service) => {
                const favorited = isFavorite(service.id);
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                      <img
                        src={service.photo}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>

                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        {service.category}
                      </span>

                      <button
                        onClick={() => toggleFavorite(service.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition cursor-pointer ${
                          favorited
                            ? 'bg-rose-50 text-rose-500 fill-rose-500'
                            : 'bg-slate-900/40 text-white hover:bg-slate-900/70'
                        }`}
                        title={favorited ? 'Remove bookmark' : 'Bookmark treatment'}
                        aria-label="Bookmark treatment"
                      >
                        <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
                      </button>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold text-base leading-snug drop-shadow-xs font-heading">
                          {service.name}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {service.shortDesc}
                      </p>

                      {/* Key Benefits Preview */}
                      <div className="space-y-1 py-1 border-y border-slate-100">
                        {service.benefits.slice(0, 2).map((b, i) => (
                          <div key={i} className="flex items-center space-x-1.5 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="line-clamp-1">{b}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">
                          {service.priceEstimate.split(' ')[0]} est.
                        </span>
                        <span className="text-slate-500 flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {service.durationMinutes} mins
                        </span>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <Link
                          to={`/services/${service.slug}`}
                          className="text-center text-xs font-semibold py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 transition"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => openBookingModal(service.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-2xs cursor-pointer flex items-center justify-center space-x-1"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Base Page Ad Section */}
      <AdSection />
    </div>
  );
};
