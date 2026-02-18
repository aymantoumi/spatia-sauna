import { spaContent } from "./content";

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AvailabilityResult {
  date: string;
  timeSlots: TimeSlot[];
  therapists: Array<{ id: string; name: string; available: boolean }>;
}

export function generateTimeSlots(
  startHour: number = 9,
  endHour: number = 19,
  interval: number = 30
): string[] {
  const slots: string[] = [];
  let currentHour = startHour;
  let currentMinute = 0;
  
  while (currentHour < endHour || (currentHour === endHour && currentMinute === 0)) {
    const timeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
    slots.push(timeString);
    
    currentMinute += interval;
    if (currentMinute >= 60) {
      currentMinute = 0;
      currentHour += 1;
    }
  }
  
  return slots;
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHour = Math.floor(totalMinutes / 60);
  const endMinute = totalMinutes % 60;
  return `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;
}

export function calculateTotalPrice(
  serviceId: string,
  duration: number
): number {
  const service = spaContent.services.find((s) => s.id === serviceId);
  if (!service) return 0;
  
  const pricing = service.pricing as unknown as Record<string, number>;
  return pricing[duration.toString()] || service.startingPrice;
}

export function calculateTax(price: number, taxRate: number = 0.09): number {
  return Math.round(price * taxRate * 100) / 100;
}

export function generateConfirmationNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
  return `CONF-${year}-${random}`;
}

export async function submitBooking(bookingData: Record<string, unknown>): Promise<{ success: boolean; confirmationNumber: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        confirmationNumber: generateConfirmationNumber(),
      });
    }, 2000);
  });
}

export function getMockAvailability(date: string): AvailabilityResult {
  const allTimeSlots = generateTimeSlots(9, 19, 30);
  const bookedSlots = new Set<string>();
  
  const randomSlots = Math.floor(Math.random() * 6) + 3;
  for (let i = 0; i < randomSlots; i++) {
    const randomIndex = Math.floor(Math.random() * allTimeSlots.length);
    bookedSlots.add(allTimeSlots[randomIndex]);
  }
  
  const timeSlots: TimeSlot[] = allTimeSlots.map((time) => ({
    time,
    available: !bookedSlots.has(time),
  }));
  
  const therapists = spaContent.team.map((t) => ({
    id: t.id,
    name: t.name,
    available: Math.random() > 0.3,
  }));
  
  return {
    date,
    timeSlots,
    therapists,
  };
}

export function isDateAvailable(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (date < today) return false;
  
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  if (date > maxDate) return false;
  
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0) {
    const hour = date.getHours();
    if (hour < 10 || hour >= 18) return false;
  } else {
    const hour = date.getHours();
    if (hour < 9 || hour >= 19) return false;
  }
  
  return true;
}