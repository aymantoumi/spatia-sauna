export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface BookingFormData {
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
  contact: ContactFormData;
  isNewClient: boolean;
  agreeToTerms: boolean;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
  pressure?: string;
  scent?: string;
  agreeToTerms?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-()]{10,}$/;

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) {
    return "Email is required";
  }
  if (!EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address";
  }
  return undefined;
}

export function validatePhone(phone: string): string | undefined {
  if (!phone.trim()) {
    return "Phone number is required";
  }
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length < 10) {
    return "Please enter a valid phone number (at least 10 digits)";
  }
  return undefined;
}

export function validateName(name: string, fieldName: string): string | undefined {
  if (!name.trim()) {
    return `${fieldName} is required`;
  }
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }
  return undefined;
}

export function validateContactInfo(contact: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {};
  
  const firstNameError = validateName(contact.firstName, "First name");
  if (firstNameError) errors.firstName = firstNameError;
  
  const lastNameError = validateName(contact.lastName, "Last name");
  if (lastNameError) errors.lastName = lastNameError;
  
  const emailError = validateEmail(contact.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(contact.phone);
  if (phoneError) errors.phone = phoneError;
  
  return errors;
}

export function validateBookingStep(step: number, data: BookingFormData): ValidationErrors {
  const errors: ValidationErrors = {};
  
  switch (step) {
    case 1:
      if (!data.service) {
        errors.service = "Please select a service";
      }
      break;
    case 2:
      if (!data.date) {
        errors.date = "Please select a date";
      }
      if (!data.time) {
        errors.time = "Please select a time";
      }
      break;
    case 3:
      if (!data.preferences.pressure) {
        errors.pressure = "Please select a pressure preference";
      }
      if (!data.preferences.scent) {
        errors.scent = "Please select a scent preference";
      }
      break;
    case 4:
      return validateContactInfo(data.contact);
    case 5:
      if (!data.agreeToTerms) {
        errors.agreeToTerms = "You must agree to the terms and conditions";
      }
      break;
  }
  
  return errors;
}

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}