"use client";

import { useState } from "react";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useBookingState } from "@/hooks/useBookingState";
import { useAvailability } from "@/hooks/useAvailability";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import FormCheckbox from "@/components/ui/FormCheckbox";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { spaContent } from "@/lib/content";
import { formatTime, getEndTime, submitBooking } from "@/lib/bookingUtils";
import { validateContactInfo, ValidationErrors } from "@/lib/formValidation";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Date & Time" },
  { id: 2, title: "Preferences" },
  { id: 3, title: "Contact" },
  { id: 4, title: "Review" },
];

export default function BookingForm() {
  const {
    booking,
    updateBooking,
    updatePreferences,
    updateContact,
    currentStep,
    setCurrentStep,
    setIsSubmitted,
    setConfirmationNumber,
  } = useBookingState();
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const { timeSlots, therapists, loading } = useAvailability(booking.date);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBooking({ date: e.target.value, time: null });
    setErrors((prev) => ({ ...prev, date: undefined, time: undefined }));
  };

  const handleTimeSelect = (time: string) => {
    updateBooking({ time });
    setErrors((prev) => ({ ...prev, time: undefined }));
  };

  const handleTherapistSelect = (therapistId: string) => {
    const therapist = therapists.find((t) => t.id === therapistId);
    if (therapist && therapist.available) {
      updateBooking({ therapist: { id: therapist.id, name: therapist.name } });
    }
  };

  const validateStep = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (currentStep === 1) {
      if (!booking.date) newErrors.date = "Please select a date";
      if (!booking.time) newErrors.time = "Please select a time";
    }
    
    if (currentStep === 3) {
      const contactErrors = validateContactInfo(booking.contact);
      Object.assign(newErrors, contactErrors);
    }
    
    if (currentStep === 4) {
      if (!booking.agreeToTerms) {
        newErrors.agreeToTerms = "You must agree to the terms";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsLoading(true);
    const result = await submitBooking(booking as unknown as Record<string, unknown>);
    setConfirmationNumber(result.confirmationNumber);
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const availableTimeSlots = timeSlots.filter((slot) => slot.available);

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    currentStep === step.id
                      ? "bg-accent text-white"
                      : currentStep > step.id
                      ? "bg-success text-white"
                      : "bg-border text-text-secondary"
                  )}
                >
                  {currentStep > step.id ? "✓" : step.id}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-12 h-0.5 mx-2",
                      currentStep > step.id ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center mt-4 text-text-secondary">
            Step {currentStep}: {STEPS[currentStep - 1].title}
          </p>
        </div>

        <m.div
          key={currentStep}
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? {} : fadeUp}
          className="bg-white p-8 rounded-2xl border border-border"
        >
          {currentStep === 1 && (
            <div>
              <h2 className="font-[var(--font-display)] text-2xl font-semibold text-primary mb-6">
                When would you like to visit?
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Select Date <span className="text-error">*</span>
                </label>
                <input
                  type="date"
                  value={booking.date || ""}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={cn(
                    "w-full px-4 py-3 border-2 rounded-lg text-base transition-colors",
                    errors.date
                      ? "border-error bg-error/5 focus:ring-error"
                      : "border-border bg-surface focus:ring-accent focus:border-accent"
                  )}
                />
                {errors.date && <p className="text-error text-sm mt-2">{errors.date}</p>}
              </div>

              {booking.date && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Select Time <span className="text-error">*</span>
                  </label>
                  {loading ? (
                    <p className="text-text-secondary">Loading available times...</p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {availableTimeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => handleTimeSelect(slot.time)}
                          className={cn(
                            "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            booking.time === slot.time
                              ? "bg-accent text-white"
                              : "bg-bg border border-border text-text-secondary hover:border-accent"
                          )}
                        >
                          {formatTime(slot.time)}
                        </button>
                      ))}
                    </div>
                  )}
                  {errors.time && <p className="text-error text-sm mt-2">{errors.time}</p>}
                </div>
              )}

              {booking.time && therapists.length > 0 && (
                <FormSelect
                  label="Preferred Therapist (optional)"
                  name="therapist"
                  value={booking.therapist?.id || ""}
                  onChange={(value) => handleTherapistSelect(value)}
                  placeholder="Any available therapist"
                  options={therapists
                    .filter((t) => t.available)
                    .map((t) => ({ value: t.id, label: t.name }))}
                />
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="font-[var(--font-display)] text-2xl font-semibold text-primary mb-6">
                Customize Your Experience
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Pressure Preference
                </label>
                <div className="flex gap-3">
                  {spaContent.pressureLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        updatePreferences({
                          pressure: level.toLowerCase() as "light" | "medium" | "firm",
                        })
                      }
                      className={cn(
                        "flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        booking.preferences.pressure === level.toLowerCase()
                          ? "bg-accent text-white"
                          : "bg-bg border border-border text-text-secondary hover:border-accent"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <FormSelect
                label="Scent Preference"
                name="scent"
                value={booking.preferences.scent}
                onChange={(value) => updatePreferences({ scent: value })}
                options={spaContent.scents.map((s) => ({ value: s, label: s }))}
                required
              />

              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={booking.preferences.notes}
                  onChange={(e) =>
                    updatePreferences({ notes: e.target.value })
                  }
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about any injuries, allergies, or areas of focus..."
                  className="w-full px-4 py-3 border-2 border-border rounded-lg text-base bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                />
                <p className="text-xs text-text-light mt-1">
                  {booking.preferences.notes.length}/500 characters
                </p>
              </div>

              <FormCheckbox
                label="This is my first visit to Spatia Sauna"
                name="isNewClient"
                checked={booking.isNewClient}
                onChange={(checked) => updateBooking({ isNewClient: checked })}
                hint="First-time clients arrive 10 minutes early to fill out our wellness form."
              />
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="font-[var(--font-display)] text-2xl font-semibold text-primary mb-6">
                How should we reach you?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  name="firstName"
                  value={booking.contact.firstName}
                  onChange={(value) => updateContact({ firstName: value })}
                  error={errors.firstName}
                  required
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  value={booking.contact.lastName}
                  onChange={(value) => updateContact({ lastName: value })}
                  error={errors.lastName}
                  required
                />
              </div>

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={booking.contact.email}
                onChange={(value) => updateContact({ email: value })}
                error={errors.email}
                required
              />

              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                value={booking.contact.phone}
                onChange={(value) => updateContact({ phone: value })}
                error={errors.phone}
                required
              />
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="font-[var(--font-display)] text-2xl font-semibold text-primary mb-6">
                Review Your Booking
              </h2>

              <div className="space-y-4 mb-6">
                {booking.service && (
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-text-secondary">Service</span>
                    <span className="font-medium text-text-primary">{booking.service.name}</span>
                  </div>
                )}
                {booking.date && (
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-text-secondary">Date</span>
                    <span className="font-medium text-text-primary">
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {booking.time && booking.service && (
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-text-secondary">Time</span>
                    <span className="font-medium text-text-primary">
                      {formatTime(booking.time)} - {formatTime(getEndTime(booking.time, booking.service.duration))}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-text-secondary">Pressure</span>
                  <span className="font-medium text-text-primary capitalize">
                    {booking.preferences.pressure}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-text-secondary">Scent</span>
                  <span className="font-medium text-text-primary">
                    {booking.preferences.scent}
                  </span>
                </div>
              </div>

              <FormCheckbox
                label="I agree to the cancellation policy and terms of service"
                name="agreeToTerms"
                checked={booking.agreeToTerms}
                onChange={(checked) => updateBooking({ agreeToTerms: checked })}
                error={errors.agreeToTerms}
                required
              />
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button variant="primary" onClick={handleNext} className="gap-2">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isLoading || !booking.agreeToTerms}
                className="gap-2"
              >
                {isLoading ? "Processing..." : "Confirm & Book"}
              </Button>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
}