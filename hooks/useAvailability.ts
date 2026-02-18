"use client";

import { useState, useEffect, useCallback } from "react";
import { getMockAvailability, generateTimeSlots } from "@/lib/bookingUtils";

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface TherapistAvailability {
  id: string;
  name: string;
  available: boolean;
}

interface AvailabilityData {
  timeSlots: TimeSlot[];
  therapists: TherapistAvailability[];
  loading: boolean;
}

export function useAvailability(selectedDate: string | null) {
  const [data, setData] = useState<AvailabilityData>({
    timeSlots: [],
    therapists: [],
    loading: false,
  });

  const fetchAvailability = useCallback(() => {
    if (!selectedDate) {
      setData({ timeSlots: [], therapists: [], loading: false });
      return;
    }

    setData((prev) => ({ ...prev, loading: true }));

    setTimeout(() => {
      const availability = getMockAvailability(selectedDate);
      setData({
        timeSlots: availability.timeSlots,
        therapists: availability.therapists,
        loading: false,
      });
    }, 300);
  }, [selectedDate]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  return {
    timeSlots: data.timeSlots,
    therapists: data.therapists,
    loading: data.loading,
    refetch: fetchAvailability,
  };
}

export function useTimeSlots() {
  const allSlots = generateTimeSlots(9, 19, 30);

  return {
    allSlots,
    morningSlots: allSlots.filter((t) => parseInt(t.split(":")[0]) < 12),
    afternoonSlots: allSlots.filter((t) => {
      const hour = parseInt(t.split(":")[0]);
      return hour >= 12 && hour < 17;
    }),
    eveningSlots: allSlots.filter((t) => parseInt(t.split(":")[0]) >= 17),
  };
}