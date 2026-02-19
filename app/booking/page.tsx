"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useBookingState } from "@/hooks/useBookingState";
import BookingHero from "@/components/sections/BookingHero";
import BookingForm from "@/components/sections/BookingForm";
import BookingSummary from "@/components/sections/BookingSummary";
import BookingConfirm from "@/components/sections/BookingConfirm";
import { getServiceBySlug, getServiceById } from "@/lib/servicesData";
import { m, useReducedMotion } from "motion/react";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

function NoServiceSelected() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-white/50 to-bg" />
      
      <m.div
        animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
      />
      <m.div
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="relative max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-accent/20 to-accent-warm/20 flex items-center justify-center"
        >
          <Calendar className="w-12 h-12 text-accent" />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
        >
          <Sparkles className="w-4 h-4" />
          Select Your Experience
        </m.div>

        <m.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4"
        >
          Choose a Service First
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-text-secondary mb-8 max-w-lg mx-auto"
        >
          To book an appointment, please browse our services and select the treatment that suits your needs.
        </m.p>

        <m.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-1 bg-gradient-to-r from-accent via-primary to-accent-warm mx-auto mb-10 rounded-full"
        />

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="/services">
            <m.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className={cn(
                "inline-flex items-center gap-3 px-8 py-4 rounded-full",
                "bg-primary text-white font-medium text-lg",
                "shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-shadow"
              )}
            >
              Browse Services
              <ArrowRight className="w-5 h-5" />
            </m.button>
          </Link>
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-sm text-text-light"
        >
          You can also browse services by category and read detailed descriptions before booking.
        </m.p>
      </div>
    </section>
  );
}

function BookingContent() {
  const { booking, updateBooking, isSubmitted } = useBookingState();
  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceSlug = searchParams.get("service");
    if (serviceSlug && !booking.service) {
      const serviceData = getServiceBySlug(serviceSlug) || getServiceById(serviceSlug);
      if (serviceData) {
        const firstDuration = serviceData.durations[0];
        const price = serviceData.pricing[firstDuration] || serviceData.startingPrice;
        updateBooking({
          service: {
            id: serviceData.id,
            name: serviceData.name,
            price,
            duration: firstDuration,
          },
        });
      }
    }
  }, [searchParams, booking.service, updateBooking]);

  if (isSubmitted) {
    return <BookingConfirm />;
  }

  const hasService = booking.service !== null;

  return (
    <main>
      <BookingHero />
      
      {!hasService && <NoServiceSelected />}

      {hasService && (
        <div className="bg-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <BookingForm />
              </div>
              <div className="hidden lg:block">
                <BookingSummary />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function BookingLoading() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-secondary">Loading booking...</p>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<BookingLoading />}>
      <BookingContent />
    </Suspense>
  );
}