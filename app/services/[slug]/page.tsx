import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData, getServiceBySlug } from "@/lib/servicesData";
import ServiceDetailHero from "@/components/sections/ServiceDetailHero";
import ServiceOverview from "@/components/sections/ServiceOverview";
import ServiceBenefits from "@/components/sections/ServiceBenefits";
import ServicePricingPlans from "@/components/sections/ServicePricingPlans";
import ServiceProcess from "@/components/sections/ServiceProcess";
import ServiceTherapists from "@/components/sections/ServiceTherapists";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import RelatedServices from "@/components/sections/RelatedServices";
import ServiceBookingCTA from "@/components/sections/ServiceBookingCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Spatia Sauna",
    };
  }

  return {
    title: `${service.name} | Spatia Sauna`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.name} | Spatia Sauna`,
      description: service.shortDescription,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <ServiceDetailHero service={service} />
      <ServiceOverview service={service} />
      <ServiceBenefits service={service} />
      <ServicePricingPlans service={service} />
      <ServiceProcess service={service} />
      <ServiceTherapists service={service} />
      <ServiceFAQ service={service} />
      <RelatedServices currentService={service} />
      <ServiceBookingCTA
        title={`Ready to Experience ${service.name}?`}
        subtitle="Book your session today and begin your journey to wellness."
        primaryButtonHref={`/booking?service=${service.slug}`}
      />
    </main>
  );
}
