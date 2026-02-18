import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LazyMotion, domAnimation } from "motion/react";
import { BookingProvider } from "@/hooks/useBookingState";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spatia Sauna | Luxury Wellness & Spa",
  description:
    "A sanctuary of bespoke wellness experiences. Book your transformation today. Offering Swedish massage, facial treatments, and holistic wellness services.",
  keywords: "spa, wellness, massage, luxury spa, relaxation, treatment, sauna",
  openGraph: {
    title: "Spatia Sauna | Luxury Wellness & Spa",
    description: "Where stillness finds you.",
    type: "website",
    url: "https://spatiasauna.com",
    siteName: "Spatia Sauna",
    images: [
      {
        url: "https://spatiasauna.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Spatia Sauna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spatia Sauna | Luxury Wellness & Spa",
    description: "Where stillness finds you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[var(--color-bg)] text-[var(--color-text-primary)] font-[var(--font-body)] antialiased">
        <LazyMotion features={domAnimation}>
          <BookingProvider>
            <Navbar />
            {children}
            <Footer />
          </BookingProvider>
        </LazyMotion>
      </body>
    </html>
  );
}