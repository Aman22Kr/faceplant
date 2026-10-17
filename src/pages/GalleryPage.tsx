import React, { useState } from 'react';
import { GALLERY_PICTURES, SERVICES } from '../data/clinicData.ts';
import { AdSection } from '../components/AdSection.tsx';
import { Sparkles, X, ZoomIn } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  // Combine clinic pictures with some service procedure photos for an extensive gallery
  const allGalleryItems = [
    ...GALLERY_PICTURES,
    ...SERVICES.slice(0, 8).map((s) => ({
      id: `srv-${s.id}`,
      title: s.name,
      caption: s.shortDesc,
      image: s.photo,
      category: 'Procedures',
    })),
  ];

  const categories = ['All', 'Clinic', 'Consultation', 'Procedures'];

  const filteredItems =
    selectedCategory === 'All'
      ? allGalleryItems
      : allGalleryItems.filter((i) => i.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 sm:py-16 px-4">
          <div className="max-w-5xl mx-auto space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700/50">
              Visual Tour
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Media Pictures & Clinical Facilities
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Take a closer look at FacePlant Clinic's aesthetic suites, diagnostic equipment, and treatment rooms in Mumbai.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage({ src: item.image, title: item.title })}
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200 cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-slate-900 rounded-full p-2.5 shadow-md">
                      <ZoomIn className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="font-bold text-sm text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[75vh] w-auto mx-auto object-contain"
            />
            <div className="p-4 bg-slate-900/95 text-white flex items-center justify-between">
              <span className="font-semibold text-sm">{lightboxImage.title}</span>
              <button
                onClick={() => setLightboxImage(null)}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 bg-slate-950/70 text-white p-2 rounded-full cursor-pointer hover:bg-slate-900"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Base Page Ad Section */}
      <AdSection />
    </div>
  );
};
