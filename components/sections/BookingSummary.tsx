"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { useBookingState } from "@/hooks/useBookingState";
import { Calendar, Clock, User, CreditCard } from "lucide-react";
import { formatTime, getEndTime } from "@/lib/bookingUtils";

export default function BookingSummary() {
  const { booking, totalPrice, taxAmount, grandTotal } = useBookingState();
  const shouldReduceMotion = useReducedMotion();

  if (!booking.service) {
    return (
      <div className="p-6 bg-surface rounded-2xl border border-border">
        <p className="text-text-secondary text-center">
          Select a service to see your booking summary
        </p>
      </div>
    );
  }

  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={shouldReduceMotion ? {} : fadeUp}
      className="p-6 bg-surface rounded-2xl border border-border sticky top-24"
    >
      <h3 className="font-[var(--font-display)] text-xl font-semibold text-primary mb-6">
        Booking Summary
      </h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-text-light">Service</p>
            <p className="font-medium text-text-primary">{booking.service.name}</p>
            <p className="text-sm text-text-secondary">{booking.service.duration} min</p>
          </div>
        </div>

        {booking.date && (
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-text-light">Date & Time</p>
              <p className="font-medium text-text-primary">
                {new Date(booking.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              {booking.time && (
                <p className="text-sm text-text-secondary">
                  {formatTime(booking.time)} - {formatTime(getEndTime(booking.time, booking.service.duration))}
                </p>
              )}
            </div>
          </div>
        )}

        {booking.therapist && (
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-text-light">Therapist</p>
              <p className="font-medium text-text-primary">{booking.therapist.name}</p>
            </div>
          </div>
        )}

        {booking.preferences.pressure && (
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-text-light">Preferences</p>
              <p className="text-sm text-text-secondary">
                {booking.preferences.pressure} pressure, {booking.preferences.scent}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-text-secondary">Service</span>
          <span className="text-text-primary">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-text-secondary">Tax (est.)</span>
          <span className="text-text-primary">${taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-4">
          <span className="text-text-primary">Total</span>
          <span className="text-accent">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </m.div>
  );
}