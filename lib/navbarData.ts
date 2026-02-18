export interface NavSubmenuLink {
  id: string;
  label: string;
  href: string;
  description?: string;
}

export interface NavSubmenuSection {
  id: string;
  title: string;
  links: NavSubmenuLink[];
  featured?: {
    label: string;
    href: string;
  } | null;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  submenu: NavSubmenuSection[] | null;
}

export interface NavSecondaryItem {
  id: string;
  label: string;
  href: string;
}

export interface NavbarData {
  primary: NavItem[];
  secondary: NavSecondaryItem[];
}

export const navbarData: NavbarData = {
  primary: [
    {
      id: "home",
      label: "Home",
      href: "/",
      submenu: null,
    },
    {
      id: "services",
      label: "Services",
      href: "/services",
      submenu: [
        {
          id: "massage",
          title: "Massage Therapy",
          links: [
            { id: "swedish", label: "Swedish Massage", href: "/services/swedish-massage", description: "Classic relaxation technique" },
            { id: "deep-tissue", label: "Deep Tissue Therapy", href: "/services/deep-tissue", description: "Target chronic tension" },
            { id: "hot-stone", label: "Hot Stone Massage", href: "/services/hot-stone-massage", description: "Heated basalt stones" },
          ],
          featured: {
            label: "View All Massage Services",
            href: "/services?category=massage",
          },
        },
        {
          id: "facials",
          title: "Facial Treatments",
          links: [
            { id: "rejuvenating", label: "Rejuvenating Facial", href: "/services/rejuvenating-facial", description: "Radiant, youthful skin" },
          ],
          featured: null,
        },
        {
          id: "wellness",
          title: "Wellness",
          links: [
            { id: "aromatherapy", label: "Aromatherapy Journey", href: "/services/aromatherapy-journey", description: "Healing through scent" },
            { id: "couples", label: "Couples Retreat", href: "/services/couples-retreat", description: "Shared wellness experience" },
          ],
          featured: null,
        },
      ],
    },
    {
      id: "story",
      label: "Our Story",
      href: "/story",
      submenu: null,
    },
    {
      id: "contact",
      label: "Contact",
      href: "/#contact",
      submenu: null,
    },
  ],
  secondary: [],
};

export const searchSuggestions = [
  { id: "swedish", title: "Swedish Massage", category: "Massage", href: "/services/swedish-massage" },
  { id: "deep-tissue", title: "Deep Tissue Therapy", category: "Massage", href: "/services/deep-tissue" },
  { id: "hot-stone", title: "Hot Stone Massage", category: "Massage", href: "/services/hot-stone-massage" },
  { id: "facial", title: "Rejuvenating Facial", category: "Facial", href: "/services/rejuvenating-facial" },
  { id: "aromatherapy", title: "Aromatherapy Journey", category: "Wellness", href: "/services/aromatherapy-journey" },
  { id: "couples", title: "Couples Retreat", category: "Packages", href: "/services/couples-retreat" },
  { id: "booking", title: "Book Appointment", category: "Quick Link", href: "/booking" },
  { id: "story", title: "Our Story", category: "About", href: "/story" },
];

export function searchNavbar(query: string) {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return searchSuggestions.filter(
    (item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery)
  );
}
