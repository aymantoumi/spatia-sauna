"use client";

import { useBookingState } from "@/hooks/useBookingState";
import BookingHero from "@/components/sections/BookingHero";
import ServiceSelector from "@/components/sections/ServiceSelector";
import BookingForm from "@/components/sections/BookingForm";
import BookingSummary from "@/components/sections/BookingSummary";
import BookingConfirm from "@/components/sections/BookingConfirm";
import { spaContent } from "@/lib/content";

export default function BookingPage() {
  const { booking, updateBooking, currentStep, isSubmitted } = useBookingState();

  const handleSelectService = (
    service: (typeof spaContent.services)[0],
    duration: number
  ) => {
    const price =
      (service.pricing as unknown as Record<string, number>)[duration.toString()] ||
      service.startingPrice;
    
    updateBooking({
      service: {
        id: service.id,
        name: service.name,
        price,
        duration,
      },
    });
  };

  if (isSubmitted) {
    return <BookingConfirm />;
  }

  const selectedServiceId = booking.service?.id ?? null;
  const selectedDuration = booking.service?.duration ?? null;
  const hasService = booking.service !== null;

  return (
    <main>
      <BookingHero />
      
      {currentStep === 1 && !hasService && (
        <ServiceSelector
          selectedServiceId={selectedServiceId}
          selectedDuration={selectedDuration}
          onSelectService={handleSelectService}
        />
      )}

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