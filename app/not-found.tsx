"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/3 to-accent/3" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="mb-8 relative">
          <div className="text-[12rem] md:text-[16rem] font-bold text-primary/10 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
              <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-accent/50" />
            </div>
          </div>
        </div>

        <h1 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold text-primary mb-4">
          Page Not Found
        </h1>
        
        <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
          Oops! The page you&apos;re looking for seems to have wandered off to find some peace and relaxation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-secondary transition-all shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Back to Home</span>
          </Link>
          
          <Link
            href="/services"
            className="group flex items-center gap-2 px-8 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Explore Services</span>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-text-light text-sm mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/booking"
              className="text-sm text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-accent"
            >
              Book an Appointment
            </Link>
            <span className="text-text-light">·</span>
            <Link
              href="/story"
              className="text-sm text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-accent"
            >
              Our Story
            </Link>
            <span className="text-text-light">·</span>
            <Link
              href="/services"
              className="text-sm text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-accent"
            >
              View All Services
            </Link>
          </div>
        </div>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1 text-sm text-text-light hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go back to previous page</span>
          </button>
        </div>
      </div>
    </div>
  );
}
