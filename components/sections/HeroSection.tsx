'use client';

import HeroHeadline from '@/components/sections/HeroHeadline';
import { m } from 'motion/react';
import { useReducedMotion } from 'motion/react';

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-primary-50 to-bg-500 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <m.div
          className="absolute top-20 right-0 w-96 h-96 bg-primary-100 rounded-full opacity-30"
          style={{ filter: 'blur(80px)' }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -30, 0],
                  scale: [1, 1.05, 1],
                }
          }
          transition={{ duration: 6, repeat: Infinity }}
        />
        <m.div
          className="absolute bottom-0 left-0 w-72 h-72 bg-accent-50 rounded-full opacity-20"
          style={{ filter: 'blur(80px)' }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, 30, 0],
                  scale: [1, 1.1, 1],
                }
          }
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24 pt-32">
        <HeroHeadline />

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">5000+</div>
            <div className="text-sm text-text-secondary uppercase tracking-wide">
              Happy Clients
            </div>
          </div>
          <div className="h-8 w-px bg-gray-300 hidden sm:block" />
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">15+</div>
            <div className="text-sm text-text-secondary uppercase tracking-wide">
              Years Experience
            </div>
          </div>
          <div className="h-8 w-px bg-gray-300 hidden sm:block" />
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">25+</div>
            <div className="text-sm text-text-secondary uppercase tracking-wide">
              Therapists
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}