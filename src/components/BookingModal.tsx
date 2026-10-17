import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  Building2,
  CheckCircle2,
  X,
  AlertCircle,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext.tsx';
import { CLINIC_INFO, SERVICES } from '../data/clinicData.ts';
import type { ConsultationMode } from '../types/index.ts';
import {
  formatReadableDate,
  getAvailableSlotsForDate,
  getModeLabel,
  isValidEmail,
  isValidPhone,
} from '../utils/logic.ts';

export const BookingModal: React.FC = () => {
  const { isBookingModalOpen, preselectedServiceId, closeBookingModal, bookAppointment } =
    useClinic();

  // Tomorrow's date as default (avoiding Mondays if tomorrow is Monday)
  const getDefaultDate = (): string => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 1) {
      d.setDate(d.getDate() + 1); // skip Monday
    }
    return d.toISOString().split('T')[0];
  };

  const [mode, setMode] = useState<ConsultationMode>('clinic');
  const [selectedDate, setSelectedDate] = useState<string>(getDefaultDate);
  const [selectedLocation, setSelectedLocation] = useState(CLINIC_INFO.shortAddress);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientAge, setPatientAge] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showAllSlots, setShowAllSlots] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  // Sync preselectedServiceId
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    } else if (SERVICES.length > 0 && !selectedServiceId) {
      setSelectedServiceId(SERVICES[0].id);
    }
  }, [preselectedServiceId]);

  // Reset or pick initial slot whenever date changes
  const availableSlots = getAvailableSlotsForDate(selectedDate);

  useEffect(() => {
    if (availableSlots.length > 0) {
      if (!availableSlots.includes(selectedSlot)) {
        setSelectedSlot(availableSlots[0]);
      }
    } else {
      setSelectedSlot('');
    }
  }, [selectedDate]);

  if (!isBookingModalOpen) return null;

  const handleClose = () => {
    setConfirmedBookingId(null);
    setErrors({});
    closeBookingModal();
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!patientName.trim()) {
      errs.patientName = 'Please enter your full name';
    }
    if (!isValidPhone(patientPhone)) {
      errs.patientPhone = 'Please enter a valid 10-digit mobile number';
    }
    if (patientEmail && !isValidEmail(patientEmail)) {
      errs.patientEmail = 'Please enter a valid email address';
    }
    if (!selectedDate) {
      errs.selectedDate = 'Please choose an appointment date';
    }
    if (availableSlots.length === 0) {
      errs.selectedDate = 'Clinic is closed on Mondays. Please choose another date.';
    }
    if (!selectedSlot) {
      errs.selectedSlot = 'Please select an appointment time slot';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedService = SERVICES.find((s) => s.id === selectedServiceId);
    const serviceName = matchedService ? matchedService.name : 'General Cosmetology Consultation';

    const bookingId = bookAppointment({
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim() || 'Not provided',
      patientAge: patientAge.trim() || undefined,
      mode,
      serviceId: selectedServiceId,
      serviceName,
      appointmentDate: selectedDate,
      appointmentSlot: selectedSlot,
      location: mode === 'clinic' ? selectedLocation : `${getModeLabel(mode)} Online`,
      notes: notes.trim() || undefined,
    });

    setConfirmedBookingId(bookingId);
  };

  const displayedSlots = showAllSlots ? availableSlots : availableSlots.slice(0, 8);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 my-8 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 id="booking-title" className="font-bold text-lg leading-tight text-white">
                Book an Appointment
              </h2>
              <p className="text-xs text-blue-100">
                Consult with {CLINIC_INFO.doctorName} ({CLINIC_INFO.doctorDegrees})
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="Close appointment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
          {confirmedBookingId ? (
            /* Confirmation Success State */
            <div className="text-center py-6 px-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Confirmed & Scheduled
                </span>
                <h3 className="text-2xl font-bold text-slate-800 mt-2 font-heading">
                  Appointment Booked Successfully!
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Your appointment with <strong className="text-slate-800">{CLINIC_INFO.doctorName}</strong> has been registered.
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Booking ID:</span>
                  <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {confirmedBookingId}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Patient:</span>
                  <span className="font-semibold text-slate-800">{patientName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Mode:</span>
                  <span className="font-medium text-slate-800 flex items-center gap-1.5">
                    {mode === 'clinic' && <Building2 className="w-4 h-4 text-blue-600" />}
                    {mode === 'video' && <Video className="w-4 h-4 text-purple-600" />}
                    {mode === 'call' && <Phone className="w-4 h-4 text-emerald-600" />}
                    {getModeLabel(mode)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Date & Time:</span>
                  <span className="font-semibold text-slate-800">
                    {formatReadableDate(selectedDate)} at {selectedSlot}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Treatment:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {SERVICES.find((s) => s.id === selectedServiceId)?.name || 'General Consultation'}
                  </span>
                </div>
                {mode === 'clinic' && (
                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{CLINIC_INFO.address}</span>
                  </div>
                )}
              </div>

              <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 text-left">
                <p className="font-medium">
                  Stored securely in your browser's local storage. You can view or reschedule this booking anytime under the &ldquo;My Appointments&rdquo; section.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="#/my-appointments"
                  onClick={handleClose}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-center shadow-xs transition cursor-pointer"
                >
                  View in My Appointments
                </a>
                <button
                  onClick={handleClose}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-xl transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Mode of Appointment */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  1. Mode of Appointment
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode('clinic')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                      mode === 'clinic'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <Building2
                      className={`w-5 h-5 mb-1.5 ${
                        mode === 'clinic' ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    />
                    <span className="font-semibold text-xs sm:text-sm">In Person</span>
                    <span className="text-[10px] text-slate-500">Clinic Visit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('video')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                      mode === 'video'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <Video
                      className={`w-5 h-5 mb-1.5 ${
                        mode === 'video' ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    />
                    <span className="font-semibold text-xs sm:text-sm">Video Call</span>
                    <span className="text-[10px] text-slate-500">HD Online</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('call')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition cursor-pointer ${
                      mode === 'call'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <Phone
                      className={`w-5 h-5 mb-1.5 ${
                        mode === 'call' ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    />
                    <span className="font-semibold text-xs sm:text-sm">Audio Call</span>
                    <span className="text-[10px] text-slate-500">Direct Phone</span>
                  </button>
                </div>
              </div>

              {/* 2. Treatment Selection */}
              <div>
                <label
                  htmlFor="booking-service"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2"
                >
                  2. Select Treatment / Service
                </label>
                <select
                  id="booking-service"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                >
                  <option value="">General Cosmetology & Aesthetic Consultation</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Date & Location Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2"
                  >
                    3. Appointment Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                  />
                  {errors.selectedDate && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.selectedDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-location"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2"
                  >
                    Clinic Location
                  </label>
                  <select
                    id="booking-location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    disabled={mode !== 'clinic'}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 disabled:opacity-60"
                  >
                    <option value={CLINIC_INFO.shortAddress}>
                      FacePlant Clinic - Mujavar Compound, Antop Hill
                    </option>
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {mode === 'clinic' ? 'Mumbai 400037, Maharashtra' : 'Online tele-consultation'}
                  </p>
                </div>
              </div>

              {/* 4. Select Slots */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    4. Select Available Slot (15 mins)
                  </label>
                  <span className="text-xs text-blue-600 font-medium">
                    {formatReadableDate(selectedDate)}
                  </span>
                </div>

                {availableSlots.length === 0 ? (
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3.5 text-xs">
                    FacePlant Clinic is closed on Mondays for sterile deep cleaning. Please pick Tuesday through Sunday.
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {displayedSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    {availableSlots.length > 8 && (
                      <button
                        type="button"
                        onClick={() => setShowAllSlots(!showAllSlots)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-2 cursor-pointer flex items-center gap-1"
                      >
                        {showAllSlots ? 'Show Fewer Slots' : `Show All ${availableSlots.length} Slots`}
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            showAllSlots ? 'rotate-90' : ''
                          }`}
                        />
                      </button>
                    )}
                  </>
                )}
                {errors.selectedSlot && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.selectedSlot}
                  </p>
                )}
              </div>

              {/* 5. Patient Details */}
              <div className="border-t border-slate-200 pt-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  5. Patient Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="patient-name"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="patient-name"
                      type="text"
                      placeholder="e.g. Hinal Patel"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                        errors.patientName
                          ? 'border-red-400 focus:ring-red-400/20'
                          : 'border-slate-300 focus:ring-blue-600/30 focus:border-blue-600'
                      }`}
                    />
                    {errors.patientName && (
                      <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="patient-phone"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="patient-phone"
                      type="tel"
                      placeholder="e.g. 9970849909"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                        errors.patientPhone
                          ? 'border-red-400 focus:ring-red-400/20'
                          : 'border-slate-300 focus:ring-blue-600/30 focus:border-blue-600'
                      }`}
                    />
                    {errors.patientPhone && (
                      <p className="text-red-500 text-xs mt-1">{errors.patientPhone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="patient-email"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="patient-email"
                      type="email"
                      placeholder="e.g. patient@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 ${
                        errors.patientEmail
                          ? 'border-red-400 focus:ring-red-400/20'
                          : 'border-slate-300 focus:ring-blue-600/30 focus:border-blue-600'
                      }`}
                    />
                    {errors.patientEmail && (
                      <p className="text-red-500 text-xs mt-1">{errors.patientEmail}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="patient-age"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Age (Optional)
                    </label>
                    <input
                      id="patient-age"
                      type="text"
                      placeholder="e.g. 28"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="patient-notes"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Brief Note or Chief Complaint (Optional)
                  </label>
                  <textarea
                    id="patient-notes"
                    rows={2}
                    placeholder="e.g. Hair fall on crown area, active acne on forehead since 2 months..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  data-testid="booking-submit-btn"
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-sm flex items-center justify-center space-x-2"
                >
                  <span>Confirm & Book Appointment</span>
                  <Sparkles className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  No advance payment required. Saved in your browser local storage for demo purposes.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
