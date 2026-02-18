"use client";

import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import Button from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock, Check, Instagram, Facebook, Linkedin } from "lucide-react";
import { useState } from "react";
import { spaContent } from "@/lib/content";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  agreeToOffers: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    agreeToOffers: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={shouldReduceMotion ? {} : fadeUp}
          >
            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
              Get in Touch
            </h2>
            <p className="mt-4 text-white/80 text-lg max-w-md">
              Ready to begin your wellness journey? Reach out and we'll help you find the perfect treatment.
            </p>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <m.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mt-8 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto"
                  >
                    <Check className="w-8 h-8 text-success" />
                  </m.div>
                  <h3 className="mt-6 text-2xl font-semibold text-white text-center">
                    Thank You!
                  </h3>
                  <p className="mt-2 text-white/80 text-center">
                    We'll contact you within 24 hours to confirm your booking.
                  </p>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg bg-white/95 border-2 border-white/40 text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white",
                          errors.name && "border-error"
                        )}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-error">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg bg-white/95 border-2 border-white/40 text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white",
                          errors.email && "border-error"
                        )}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-error">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/95 border-2 border-white/40 text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-white/80 mb-2">
                        Service of Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/95 border-2 border-white/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-white focus:border-white appearance-none cursor-pointer"
                      >
                        <option value="">Select a service</option>
                        {spaContent.services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-medium text-white/80 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/95 border-2 border-white/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-white focus:border-white cursor-pointer"
                      />
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-white/80 mb-2">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/95 border-2 border-white/40 text-text-primary focus:outline-none focus:ring-2 focus:ring-white focus:border-white cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      Additional Notes *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg bg-white/95 border-2 border-white/40 text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white resize-none",
                        errors.message && "border-error"
                      )}
                      placeholder="Tell us about your wellness goals..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-error">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToOffers"
                      name="agreeToOffers"
                      checked={formData.agreeToOffers}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-white/40 text-accent focus:ring-white"
                    />
                    <label htmlFor="agreeToOffers" className="text-sm text-white/80">
                      I agree to be contacted about special offers and promotions.
                      <span className="block text-white/60 text-xs mt-1">
                        We respect your privacy. No spam, ever.
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-white text-primary hover:bg-white/90"
                  >
                    Send My Request
                  </Button>
                </m.form>
              )}
            </AnimatePresence>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={shouldReduceMotion ? {} : fadeUp}
            className="space-y-8"
          >
            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <h3 className="font-[var(--font-display)] text-2xl font-semibold text-white mb-6">
                Visit Us
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white">{spaContent.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-accent" />
                  <a
                    href={`tel:${spaContent.contact.phone}`}
                    className="text-white hover:text-accent transition-colors"
                  >
                    {spaContent.contact.phone}
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-accent" />
                  <a
                    href={`mailto:${spaContent.contact.email}`}
                    className="text-white hover:text-accent transition-colors"
                  >
                    {spaContent.contact.email}
                  </a>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white">
                      Monday–Friday: {spaContent.contact.hours.weekday}
                    </p>
                    <p className="text-white/70">
                      Saturday–Sunday: {spaContent.contact.hours.weekend}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/20 h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.35617399586!2d-7.66962176875!3d33.57241829999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sma!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "sepia(20%) contrast(90%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Spatia Sauna Location"
              />
            </div>

            <div className="flex justify-center gap-4">
              <a
                href={spaContent.contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 text-white hover:bg-accent hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={spaContent.contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 text-white hover:bg-accent hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={spaContent.contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 text-white hover:bg-accent hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}