'use client';

import { m } from 'motion/react';
import { useState, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import Link from 'next/link';

export default function HeroHeadline() {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-auto py-24 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <m.div
          className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #C9E6EF 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -30, 0],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <m.div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #FDE8E8 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, 30, 0],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-label-lg text-primary-600 tracking-widest">
            WELCOME TO SPATIA SAUNA
          </span>
        </m.div>

        <div className="relative">
          <m.h1
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-display-xl font-[var(--font-display)] text-primary leading-tight"
          >
            Where Stillness
          </m.h1>

          <m.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-display-xl font-[var(--font-display)] text-accent leading-tight mt-2"
          >
            Finds You
          </m.h2>
        </div>

        <m.p
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 md:mt-12 text-body-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
        >
          A sanctuary of bespoke wellness experiences designed for your transformation.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 md:mt-16"
        >
          <Link href="/booking">
            <m.button
              whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-xl)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent-600 transition-colors"
            >
              Book a Session
            </m.button>
          </Link>
          <Link href="/story">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary-50 transition-colors"
            >
              Discover Our Story
            </m.button>
          </Link>
        </m.div>
      </div>

      <m.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </m.div>
    </div>
  );
}

export function HeroHeadlineMinimal() {
  return (
    <h1 className="text-display-xl font-[var(--font-display)] text-primary">
      Where Stillness <span className="text-accent">Finds You</span>
    </h1>
  );
}

export function HeroHeadlineVertical() {
  return (
    <div className="space-y-6">
      <div className="text-display-lg font-light text-primary">Where</div>
      <div className="text-9xl font-bold text-accent">Stillness</div>
      <div className="text-display-lg font-light text-text-secondary">Finds You</div>
    </div>
  );
}