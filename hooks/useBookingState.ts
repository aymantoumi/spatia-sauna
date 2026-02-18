"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface BookingData {
  service: {
    id: string;
    name: string;
    price: number;
    duration: number;
  } | null;
  date: string | null;
  time: string | null;
  therapist: {
    id: string;
    name: string;
  } | null;
  preferences: {
    pressure: "light" | "medium" | "firm";
    scent: string;
    notes: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  isNewClient: boolean;
  agreeToTerms: boolean;
}

interface BookingContextType {
  booking: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
  updatePreferences: (preferences: Partial<BookingData["preferences"]>) => void;
  updateContact: (contact: Partial<BookingData["contact"]>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalPrice: number;
  taxAmount: number;
  grandTotal: number;
  resetBooking: () => void;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
  confirmationNumber: string;
  setConfirmationNumber: (number: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingData = {
  service: null,
  date: null,
  time: null,
  therapist: null,
  preferences: {
    pressure: "medium",
    scent: "Lavender",
    notes: "",
  },
  contact: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  isNewClient: true,
  agreeToTerms: false,
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingData>(initialState);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");

  const updateBooking = useCallback((updates: Partial<BookingData>) => {
    setBooking((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const updatePreferences = useCallback(
    (preferences: Partial<BookingData["preferences"]>) => {
      setBooking((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, ...preferences },
      }));
    },
    []
  );

  const updateContact = useCallback(
    (contact: Partial<BookingData["contact"]>) => {
      setBooking((prev) => ({
        ...prev,
        contact: { ...prev.contact, ...contact },
      }));
    },
    []
  );

  const totalPrice = booking.service?.price || 0;
  const taxAmount = Math.round(totalPrice * 0.09 * 100) / 100;
  const grandTotal = Math.round((totalPrice + taxAmount) * 100) / 100;

  const resetBooking = useCallback(() => {
    setBooking(initialState);
    setCurrentStep(1);
    setIsSubmitted(false);
    setConfirmationNumber("");
  }, []);

  const value: BookingContextType = {
    booking,
    updateBooking,
    updatePreferences,
    updateContact,
    currentStep,
    setCurrentStep,
    totalPrice,
    taxAmount,
    grandTotal,
    resetBooking,
    isSubmitted,
    setIsSubmitted,
    confirmationNumber,
    setConfirmationNumber,
  };

  return React.createElement(
    BookingContext.Provider,
    { value },
    children
  );
}

export function useBookingState() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingState must be used within BookingProvider");
  }
  return context;
}