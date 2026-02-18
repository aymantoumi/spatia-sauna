"use client";

import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp, scaleIn } from "@/lib/animations";
import Button from "@/components/ui/Button";
import { Check, Copy, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useBookingState } from "@/hooks/useBookingState";
import { formatTime, getEndTime } from "@/lib/bookingUtils";

export default function BookingConfirm() {
  const { booking, confirmationNumber, resetBooking } = useBookingState();
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = () => {
    navigator.clipboard.writeText(confirmationNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookAnother = () => {
    resetBooking();
  };

  return (
    <section className="py-16 md:py-24 bg-bg min-h-[80vh] flex items-center">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <m.div
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? {} : scaleIn}
          className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto"
        >
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-success flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-white" />
          </m.div>
        </m.div>

        <m.h1
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? {} : fadeUp}
          className="mt-8 font-[var(--font-display)] text-4xl md:text-5xl font-semibold text-primary"
        >
          Your Booking is Confirmed!
        </m.h1>

        <m.p
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? {} : fadeUp}
          className="mt-4 text-lg text-text-secondary"
        >
          Thank you, {booking.contact.firstName}! Your appointment is reserved.
        </m.p>

        <m.div
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? {} : fadeUp}
          className="mt-8 p-6 bg-surface rounded-2xl border border-border text-left"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-text-light">Confirmation Number</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-accent text-sm hover:text-secondary transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-xl font-mono font-bold text-primary mb-6">
            {confirmationNumber}
          </p>

          {booking.service && (
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-t border-border">
                <span className="text-text-secondary">Service</span>
                <span className="font-medium text-text-primary">{booking.service.name}</span>
              </div>
              {booking.date && (
                <div className="flex justify-between py-2 border-t border-border">
                  <span className="text-text-secondary">Date</span>
                  <span className="font-medium text-text-primary">
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
              {booking.time && booking.service && (
                <div className="flex justify-between py-2 border-t border-border">
                  <span className="text-text-secondary">Time</span>
                  <span className="font-medium text-text-primary">
                    {formatTime(booking.time)} - {formatTime(getEndTime(booking.time, booking.service.duration))}
                  </span>
                </div>
              )}
            </div>
          )}
        </m.div>

        <m.div
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? {} : fadeUp}
          className="mt-8 p-6 bg-primary/5 rounded-2xl text-left"
        >
          <h3 className="font-semibold text-primary mb-4">What's Next</h3>
          <ol className="space-y-3 text-text-secondary">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-sm flex items-center justify-center">1</span>
              Check your email for booking confirmation and directions
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-sm flex items-center justify-center">2</span>
              Arrive 10 minutes early to fill out our wellness form
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-sm flex items-center justify-center">3</span>
              Relax and enjoy your transformation
            </li>
          </ol>
        </m.div>

        <m.div
          initial="hidden"
          animate="visible"
          variants={shouldReduceMotion ? {} : fadeUp}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Button variant="primary" onClick={handleBookAnother} className="gap-2">
            <Calendar className="w-4 h-4" />
            Book Another Service
          </Button>
        </m.div>
      </div>
    </section>
  );
}