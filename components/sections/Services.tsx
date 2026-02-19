"use client";

import { cn } from "@/lib/utils";
import { m, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { useReducedMotion } from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useState, useRef } from "react";
import {
  Heart,
  Zap,
  Sparkles,
  Flame,
  Droplets,
  HeartHandshake,
  ArrowRight,
  Clock,
  Star,
  Check,
} from "lucide-react";
import { spaContent } from "@/lib/content";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Zap,
  Sparkles,
  Flame,
  Droplets,
  HeartHandshake,
};

const categoryColors: Record<string, { bg: string; accent: string }> = {
  Massage: { bg: "from-primary/10 to-primary/5", accent: "text-primary" },
  Facials: { bg: "from-accent-warm/10 to-accent-warm/5", accent: "text-accent-warm" },
  Wellness: { bg: "from-accent/10 to-accent/5", accent: "text-accent" },
  Packages: { bg: "from-gold/10 to-gold/5", accent: "text-gold" },
};

const serviceIdToSlug: Record<string, string> = {
  "swedish": "swedish-massage",
  "deep-tissue": "deep-tissue",
  "facial": "rejuvenating-facial",
  "hot-stone": "hot-stone-massage",
  "aromatherapy": "aromatherapy-journey",
  "couples": "couples-retreat",
};

interface ServiceModalProps {
  service: (typeof spaContent.services)[0] | null;
  isOpen: boolean;
  onClose: () => void;
}

function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!service) return null;

  const IconComponent = iconMap[service.icon] || Heart;
  const colors = categoryColors[service.category] || categoryColors.Massage;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-24 z-50 flex items-center justify-center pointer-events-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto w-full max-w-4xl max-h-full overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="relative">
                <div className={cn(
                  "absolute inset-0 h-48 md:h-64 bg-gradient-to-br",
                  colors.bg
                )} />
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-text-secondary hover:text-primary hover:bg-white transition-all shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative pt-8 px-8 pb-6">
                  <div className="flex flex-col md:flex-row md:items-end gap-6">
                    <m.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className={cn(
                        "w-20 h-20 rounded-2xl flex items-center justify-center",
                        "bg-white shadow-xl"
                      )}
                    >
                      <IconComponent className={cn("w-10 h-10", colors.accent)} />
                    </m.div>

                    <div className="flex-1">
                      <span className={cn(
                        "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2",
                        "bg-white/80 backdrop-blur-sm",
                        colors.accent
                      )}>
                        {service.category}
                      </span>
                      <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold text-primary">
                        {service.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-gold fill-gold" />
                      <span className="font-semibold text-text-primary">4.9</span>
                      <span className="text-text-light text-sm">(127 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 overflow-y-auto max-h-[calc(100vh-400px)]">
                <p className="text-lg text-text-secondary leading-relaxed mb-8">
                  {service.fullDesc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 rounded-2xl bg-bg">
                    <Clock className="w-6 h-6 text-accent mb-2" />
                    <p className="text-sm text-text-light mb-1">Duration</p>
                    <p className="font-semibold text-primary">
                      {service.duration[0]}–{service.duration[service.duration.length - 1]} min
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-bg">
                    <DollarSign className="w-6 h-6 text-accent mb-2" />
                    <p className="text-sm text-text-light mb-1">Starting at</p>
                    <p className="font-semibold text-primary text-2xl">${service.startingPrice}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-bg">
                    <Star className="w-6 h-6 text-gold fill-gold mb-2" />
                    <p className="text-sm text-text-light mb-1">Rating</p>
                    <p className="font-semibold text-primary">4.9 / 5.0</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-primary mb-4">Available Durations</h3>
                  <div className="flex flex-wrap gap-3">
                    {service.duration.map((dur, i) => (
                      <div
                        key={dur}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {service.durationLabels[i]}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-primary mb-4">Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-bg"
                      >
                        <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-success" />
                        </div>
                        <span className="text-text-secondary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                  <Link href={`/booking?service=${serviceIdToSlug[service.id] || service.id}`} className="flex-1">
                    <m.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      className={cn(
                        "w-full py-4 rounded-full font-medium text-lg",
                        "bg-accent text-white",
                        "shadow-lg shadow-accent/25",
                        "flex items-center justify-center gap-2"
                      )}
                    >
                      Book This Service
                      <ArrowRight className="w-5 h-5" />
                    </m.button>
                  </Link>
                  <Link href={`/services/${serviceIdToSlug[service.id] || service.id}`} className="flex-1">
                    <m.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      className={cn(
                        "w-full py-4 rounded-full font-medium text-lg",
                        "border-2 border-primary text-primary",
                        "flex items-center justify-center gap-2"
                      )}
                    >
                      View Full Details
                    </m.button>
                  </Link>
                </div>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { useEffect } from "react";
import { X, DollarSign } from "lucide-react";

function ServiceRow({
  service,
  index,
  onClick,
}: {
  service: (typeof spaContent.services)[0];
  index: number;
  onClick: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = iconMap[service.icon] || Heart;
  const colors = categoryColors[service.category] || categoryColors.Massage;

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={shouldReduceMotion ? {} : fadeUp}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <m.div
        animate={shouldReduceMotion ? {} : {
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "relative rounded-3xl overflow-hidden cursor-pointer",
          "bg-gradient-to-br backdrop-blur-sm",
          colors.bg,
          "border-2 border-white/50",
          "shadow-xl hover:shadow-2xl transition-all duration-500"
        )}
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40" />

        <div className="relative flex flex-col lg:flex-row">
          <div className="relative lg:w-64 xl:w-72 flex-shrink-0">
            <div className="aspect-[16/10] lg:aspect-auto lg:h-full min-h-[180px] overflow-hidden bg-gradient-to-br from-white/50 to-white/20">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10 z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <m.div
                  animate={shouldReduceMotion ? {} : {
                    scale: isHovered ? 1.1 : 1,
                    rotate: isHovered ? 5 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                >
                  <IconComponent className={cn("w-10 h-10", colors.accent)} />
                </m.div>
              </div>

              <div className="absolute top-4 left-4 z-20">
                <span className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold",
                  "bg-white/80 backdrop-blur-sm shadow-sm",
                  colors.accent
                )}>
                  {service.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 lg:hidden">
                <h3 className="font-[var(--font-display)] text-lg font-bold text-primary">
                  {service.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 lg:p-8">
            <div className="flex flex-col h-full">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="hidden lg:block font-[var(--font-display)] text-2xl font-bold text-primary mb-1">
                    {service.name}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed lg:max-w-xl">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:text-right">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-sm font-medium text-text-primary">4.9</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-text-light">From</span>
                    <p className="text-2xl font-bold text-primary">${service.startingPrice}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-1 text-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Duration:</span>
                </div>
                {service.durationLabels.map((d) => (
                  <span
                    key={d}
                    className="px-3 py-1 rounded-full bg-white/60 text-text-secondary text-xs font-medium"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {service.benefits.slice(0, 3).map((benefit, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/60 text-text-secondary text-xs"
                  >
                    <Check className="w-3 h-3 text-success" />
                    {benefit}
                  </span>
                ))}
                {service.benefits.length > 3 && (
                  <span className="px-3 py-1 rounded-full bg-white/40 text-text-light text-xs">
                    +{service.benefits.length - 3} more
                  </span>
                )}
              </div>

              <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/50">
                <span className="text-sm text-accent font-medium group-hover:text-primary transition-colors flex items-center gap-1">
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent-warm origin-left"
        />
      </m.div>
    </m.div>
  );
}

function FloatingOrb({ delay = 0, size = 100, className = "" }: { delay?: number; size?: number; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <m.div
      animate={shouldReduceMotion ? {} : {
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ width: size, height: size }}
      className={cn("rounded-full blur-3xl", className)}
    />
  );
}

export default function Services() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<(typeof spaContent.services)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const handleOpenModal = (service: (typeof spaContent.services)[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section ref={containerRef} id="services" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-white/50 to-bg" />
      
      <m.div
        style={shouldReduceMotion ? {} : { y: smoothY }}
        className="absolute inset-0 pointer-events-none"
      >
        <FloatingOrb delay={0} size={300} className="absolute top-20 left-10 bg-primary/20" />
        <FloatingOrb delay={2} size={250} className="absolute top-40 right-20 bg-accent/15" />
        <FloatingOrb delay={4} size={200} className="absolute bottom-20 left-1/3 bg-accent-warm/15" />
      </m.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={shouldReduceMotion ? {} : staggerContainer}
        >
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <m.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4"
            >
              Premium Wellness
            </m.span>
            
            <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6">
              Our Services
            </h2>
            
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              Tailored experiences designed for your unique wellness journey
            </p>

            <m.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-accent via-primary to-accent-warm mx-auto mt-8 rounded-full"
            />
          </m.div>

          <div className="flex flex-col gap-6">
            {spaContent.services.map((service, index) => (
              <ServiceRow 
                key={service.id} 
                service={service} 
                index={index}
                onClick={() => handleOpenModal(service)}
              />
            ))}
          </div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link href="/services">
              <m.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-full",
                  "bg-primary text-white font-medium text-lg",
                  "shadow-xl shadow-primary/25",
                  "transition-shadow hover:shadow-2xl hover:shadow-primary/30"
                )}
              >
                View All Services
                <ArrowRight className="w-5 h-5" />
              </m.button>
            </Link>
          </m.div>
        </m.div>
      </div>

      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}