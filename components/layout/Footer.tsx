"use client";

import { cn } from "@/lib/utils";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { spaContent } from "@/lib/content";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={shouldReduceMotion ? {} : fadeUp}
      className="border-t border-border bg-surface"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div>
            <a
              href="#home"
              className="font-[var(--font-display)] text-2xl font-bold text-primary tracking-widest"
            >
              {spaContent.name.toUpperCase()}
            </a>
            <p className="mt-4 text-sm text-text-secondary max-w-xs">
              {spaContent.hero.subtitle}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-4">
              <a
                href={spaContent.contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={spaContent.contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={spaContent.contact.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} {spaContent.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </m.footer>
  );
}