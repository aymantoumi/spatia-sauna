export const spaContent = {
  name: "Spatia Sauna",
  tagline: "Where Stillness Finds You",
  hero: {
    line1: "Where",
    line2: "Stillness",
    line3: "Finds You",
    subtitle: "A sanctuary of bespoke wellness experiences crafted for your transformation.",
  },
  about: {
    quote: "We believe rest is radical. Healing is intentional. You deserve both.",
    since: "Crafted since 2015",
    heading: "Our Story",
    paragraphs: [
      "Spatia Sauna was born from a simple belief: that true wellness requires more than momentary escape—it demands transformation. Founded in 2015 by wellness pioneers who understood the profound connection between mind, body, and spirit.",
      "Our approach combines ancient healing traditions with modern wellness practices. Each treatment is thoughtfully designed to restore balance, rejuvenate the body, and nurture the soul. We believe every client's journey is unique.",
      "From the serene ambiance of our treatment rooms to the expertise of our practitioners, every detail at Spatia Sauna is curated to deliver an experience that lingers long after you leave. Your transformation begins the moment you step through our doors.",
    ],
    stats: [
      { value: 12, label: "Years", suffix: "+" },
      { value: 5000, label: "Happy Clients", suffix: "+" },
      { value: 35, label: "Treatments", suffix: "" },
      { value: 98, label: "Satisfaction", suffix: "%" },
    ],
  },
  services: [
    {
      id: "swedish",
      name: "Swedish Massage",
      icon: "Heart",
      category: "Massage",
      shortDesc: "Classic technique for relaxation and tension relief",
      fullDesc:
        "Our Swedish massage combines long gliding strokes, kneading, and circular motions to release muscle tension and improve circulation. Perfect for first-time spa-goers and those seeking gentle relaxation.",
      duration: [60, 90, 120],
      durationLabels: ["60 min", "90 min", "120 min"],
      startingPrice: 85,
      pricing: { 60: 85, 90: 120, 120: 150 },
      benefits: [
        "Reduces muscle tension",
        "Improves blood flow",
        "Decreases stress and anxiety",
        "Enhances relaxation",
      ],
      therapists: ["sarah", "michael", "jessica"],
    },
    {
      id: "deep-tissue",
      name: "Deep Tissue Therapy",
      icon: "Zap",
      category: "Massage",
      shortDesc: "Intensive bodywork for chronic tension and pain",
      fullDesc:
        "Target deep layers of muscle and connective tissue with focused pressure. Ideal for athletes, those with chronic pain, or anyone needing intensive muscle work. Our therapists customize pressure to your comfort level.",
      duration: [60, 90],
      durationLabels: ["60 min", "90 min"],
      startingPrice: 110,
      pricing: { 60: 110, 90: 155 },
      benefits: [
        "Releases chronic muscle tension",
        "Reduces inflammation",
        "Improves mobility",
        "Accelerates recovery",
      ],
      therapists: ["sarah", "david"],
    },
    {
      id: "facial",
      name: "Rejuvenating Facial",
      icon: "Sparkles",
      category: "Facials",
      shortDesc: "Luxurious skincare treatment for radiant skin",
      fullDesc:
        "Experience our signature facial combining advanced skincare technology with holistic techniques. Each treatment begins with a skin analysis and includes deep cleansing, exfoliation, massage, and a customized mask.",
      duration: [60, 90],
      durationLabels: ["60 min", "90 min"],
      startingPrice: 95,
      pricing: { 60: 95, 90: 135 },
      benefits: [
        "Deeply cleanses pores",
        "Improves skin tone",
        "Reduces fine lines",
        "Restores natural radiance",
      ],
      therapists: ["jessica", "elena"],
    },
    {
      id: "hot-stone",
      name: "Hot Stone Massage",
      icon: "Flame",
      category: "Massage",
      shortDesc: "Heated basalt stones for deep relaxation",
      fullDesc:
        "Smooth, heated basalt stones are placed on key points of your body while our therapists use them to massage with long, flowing strokes. The heat penetrates deep into muscles for ultimate relaxation.",
      duration: [75, 90],
      durationLabels: ["75 min", "90 min"],
      startingPrice: 125,
      pricing: { 75: 125, 90: 150 },
      benefits: [
        "Melts away tension",
        "Improves circulation",
        "Promotes deep relaxation",
        "Eases muscle stiffness",
      ],
      therapists: ["michael", "sarah"],
    },
    {
      id: "aromatherapy",
      name: "Aromatherapy Journey",
      icon: "Droplets",
      category: "Wellness",
      shortDesc: "Essential oils enhance your massage experience",
      fullDesc:
        "A personalized blend of therapeutic essential oils is combined with a relaxing massage. Choose from our signature blends: Calm, Energize, Detox, or Balance. Each oil is selected for its unique healing properties.",
      duration: [60, 90],
      durationLabels: ["60 min", "90 min"],
      startingPrice: 100,
      pricing: { 60: 100, 90: 140 },
      benefits: [
        "Enhances mood",
        "Reduces anxiety",
        "Improves sleep quality",
        "Balances energy",
      ],
      therapists: ["jessica", "elena"],
    },
    {
      id: "couples",
      name: "Couples Retreat",
      icon: "HeartHandshake",
      category: "Packages",
      shortDesc: "Shared wellness experience for two",
      fullDesc:
        "Share a blissful experience with your partner in our private couples suite. Enjoy side-by-side massages in a romantic setting with candlelight, soft music, and aromatherapy. Includes champagne and chocolates.",
      duration: [60, 90, 120],
      durationLabels: ["60 min", "90 min", "120 min"],
      startingPrice: 220,
      pricing: { 60: 220, 90: 300, 120: 380 },
      benefits: [
        "Strengthens connection",
        "Shared relaxation",
        "Intimate experience",
        "Creates lasting memories",
      ],
      therapists: ["sarah", "michael", "jessica", "david"],
    },
  ],
  process: [
    {
      step: 1,
      title: "Schedule Your Session",
      description:
        "Browse our service menu, select your treatment, and choose a time that fits your schedule. Our online booking system is easy and secure, available 24/7.",
    },
    {
      step: 2,
      title: "Arrive & Prepare",
      description:
        "Arrive 10 minutes early to settle in. Fill out a brief wellness form to help us understand your needs. Our therapists will greet you warmly and answer any questions.",
    },
    {
      step: 3,
      title: "Your Treatment",
      description:
        "Relax and receive your personalized service in our tranquil treatment rooms. Our trained therapists tailor every session to your comfort level and specific goals.",
    },
    {
      step: 4,
      title: "Reintegrate & Reflect",
      description:
        "Take time in our relaxation lounge with herbal tea. Receive aftercare recommendations to extend your wellness benefits and maintain your sense of calm.",
    },
  ],
  testimonials: [
    {
      quote:
        "The most relaxing experience I've ever had. I booked another session before I even left the spa!",
      client: "Sarah M.",
      title: "Wellness Enthusiast",
      rating: 5,
    },
    {
      quote:
        "Spatia Sauna has completely transformed my approach to self-care. The therapists are incredibly skilled and attentive.",
      client: "James L.",
      title: "Business Executive",
      rating: 5,
    },
    {
      quote:
        "My migraines have reduced by 70% since starting regular deep tissue sessions here. Life-changing!",
      client: "Elena R.",
      title: "Teacher",
      rating: 5,
    },
    {
      quote:
        "The couples retreat was the perfect anniversary gift. We felt so connected and relaxed afterward.",
      client: "Michael & Lisa T.",
      title: "Married 10 Years",
      rating: 5,
    },
    {
      quote:
        "As an athlete, I need serious muscle work. The deep tissue therapy here is the best I've experienced.",
      client: "David K.",
      title: "Marathon Runner",
      rating: 5,
    },
    {
      quote:
        "From the moment I walked in, I felt my stress melt away. The ambiance is absolutely perfect.",
      client: "Amanda P.",
      title: "Marketing Director",
      rating: 5,
    },
  ],
  contact: {
    address: "Au Maroc et ailleurs, Maroc",
    phone: "06 73 74 00 18",
    email: "hello@spatiasauna.com",
    hours: {
      weekday: "9 AM–7 PM",
      weekend: "10 AM–6 PM",
    },
    social: {
      instagram: "https://instagram.com/spatiasauna",
      facebook: "https://facebook.com/spatiasauna",
      linkedin: "https://linkedin.com/company/spatiasauna",
    },
  },
  team: [
    {
      id: "sarah",
      name: "Sarah Johnson",
      role: "Lead Massage Therapist",
      credentials: "LMT, Certified Swedish & Deep Tissue",
      experience: "10+ years",
      specialties: ["Deep Tissue", "Sports Massage", "Prenatal Care"],
      bio: "Sarah discovered massage therapy after her own healing journey. She's passionate about relieving tension and helping clients reconnect with their bodies.",
      rating: 4.9,
    },
    {
      id: "michael",
      name: "Michael Chen",
      role: "Senior Massage Therapist",
      credentials: "LMT, Certified Hot Stone & Aromatherapy",
      experience: "8 years",
      specialties: ["Hot Stone", "Swedish Massage", "Stress Relief"],
      bio: "Michael brings a calm, intuitive approach to every session. His expertise in hot stone therapy has made him a client favorite.",
      rating: 4.8,
    },
    {
      id: "jessica",
      name: "Jessica Williams",
      role: "Esthetician & Wellness Specialist",
      credentials: "Licensed Esthetician, Certified Aromatherapist",
      experience: "7 years",
      specialties: ["Facials", "Aromatherapy", "Skin Analysis"],
      bio: "Jessica believes that radiant skin starts from within. Her holistic approach combines skincare science with wellness wisdom.",
      rating: 4.9,
    },
    {
      id: "david",
      name: "David Martinez",
      role: "Sports Massage Specialist",
      credentials: "LMT, Certified Sports Massage Therapist",
      experience: "12 years",
      specialties: ["Sports Massage", "Deep Tissue", "Injury Recovery"],
      bio: "David works with athletes of all levels. His deep understanding of anatomy helps clients recover faster and perform better.",
      rating: 4.7,
    },
    {
      id: "elena",
      name: "Elena Vasquez",
      role: "Wellness Director & Esthetician",
      credentials: "Licensed Esthetician, Holistic Wellness Coach",
      experience: "15 years",
      specialties: ["Holistic Facials", "Wellness Coaching", "Meditation"],
      bio: "Elena founded Spatia Sauna with a vision to create transformative wellness experiences. She oversees our treatment protocols and therapist training.",
      rating: 5.0,
    },
  ],
  scents: ["Lavender", "Eucalyptus", "Citrus", "Unscented"],
  pressureLevels: ["Light", "Medium", "Firm"],
  categories: ["All", "Massage", "Facials", "Body Treatments", "Wellness", "Packages"],
  story: {
    hero: {
      headline: "The Story Behind Spatia Sauna",
      tagline: "Founded on a simple belief: Rest is radical. Healing is intentional. You deserve both.",
    },
    origins: {
      heading: "How It All Began",
      paragraphs: [
        "In 2015, Elena Vasquez returned from a transformative journey through Asia, where she had spent years studying traditional healing practices in remote villages and ancient temples. What she witnessed changed her forever—people who understood wellness not as a luxury, but as a sacred daily practice.",
        "She saw communities where healing was intergenerational, where the young learned from elders the art of stillness and restoration. She experienced firsthand the profound impact of touch, intention, and presence. These weren't just treatments—they were ceremonies of renewal.",
        "Returning home, Elena was struck by the contrast. The modern world had turned wellness into a commodity—quick fixes, rushed appointments, cookie-cutter protocols. Something essential had been lost. She knew then that her purpose was to create something different.",
        "Spatia Sauna was born in a small converted cottage with just two treatment rooms and a handful of devoted practitioners. Word spread quickly. Clients who had given up on ever feeling truly relaxed discovered something they didn't know they were missing.",
        "Today, Spatia Sauna has grown, but our founding principle remains unchanged: every person who walks through our doors deserves an experience that honors their whole being—body, mind, and spirit.",
      ],
      pullQuote: "We realized that true wellness isn't a luxury—it's a necessity.",
    },
    mission: {
      heading: "Our Mission",
      statement: "To create a sanctuary where every visitor discovers their innate capacity for healing, transformation, and profound wellness.",
      visionHeading: "Our Vision",
      visionStatement: "A world where wellness is accessible to all, where healing is honored as sacred, and where stillness is recognized as the foundation of transformation.",
    },
    values: [
      {
        name: "Intentionality",
        description: "Every service, every touch, every moment is purposeful. We don't rush wellness. We honor the sacred space between you and healing.",
        icon: "Lightbulb",
      },
      {
        name: "Holistic Wellness",
        description: "We treat the whole person—body, mind, and spirit. Our approach recognizes that true wellness comes from balance and integration.",
        icon: "Heart",
      },
      {
        name: "Inclusivity",
        description: "Wellness is for everyone, regardless of background, body type, or budget. We create spaces where all feel welcome and valued.",
        icon: "Users",
      },
      {
        name: "Transparency",
        description: "We're honest about what we offer, how we work, and what you can expect. No hidden fees, no pressure—just authentic care.",
        icon: "Eye",
      },
      {
        name: "Continuous Learning",
        description: "Our team stays at the forefront of wellness knowledge, constantly updating our techniques and protocols with the latest research.",
        icon: "BookOpen",
      },
      {
        name: "Sustainability",
        description: "We care for our clients, our team, and our planet. From eco-friendly products to fair wages, we make choices that matter.",
        icon: "Leaf",
      },
    ],
    philosophy: {
      heading: "Our Philosophy on Wellness",
      subtitle: "The principles that shape every interaction",
      introduction: "Wellness isn't a destination—it's a practice, a daily commitment to honoring your body, mind, and spirit. We've spent years refining our philosophy to embody this truth.",
      sections: [
        {
          title: "The Body-Mind Connection",
          content: "Physical tension holds emotional trauma. When we release one, we often release the other. Our therapists are trained to recognize and honor this connection, creating space for both physical and emotional release.",
        },
        {
          title: "Slow Wellness",
          content: "In a world obsessed with speed, we choose depth. A 90-minute treatment isn't just longer—it's transformative. We don't rush wellness because healing doesn't follow a clock.",
        },
        {
          title: "Nature as Teacher",
          content: "Natural ingredients, seasonal rhythms, and holistic practices guide our approach. We believe that what comes from the earth returns us to ourselves.",
        },
        {
          title: "Personalization Over Protocols",
          content: "Each client is unique. While we have frameworks, we never apply one-size-fits-all approaches. Your treatment is tailored to your body, your needs, your goals.",
        },
        {
          title: "Sustainability & Ethics",
          content: "We're committed to eco-friendly practices, ethical sourcing, and fair wages for our practitioners. Wellness shouldn't come at the cost of others or our planet.",
        },
      ],
      closing: "This philosophy isn't just theory—it's lived in every interaction, every service, every moment at Spatia Sauna. When you visit, you'll feel the difference.",
    },
    detailedProcess: [
      {
        step: 1,
        title: "Discovery Consultation",
        duration: "10 min",
        description: "We understand your wellness goals, any physical concerns, and lifestyle. Our team listens intently, asking thoughtful questions to tailor your experience.",
        keyPoints: [
          "Discuss your wellness history",
          "Identify areas of tension or concern",
          "Recommend personalized treatments",
        ],
      },
      {
        step: 2,
        title: "Pre-Visit Preparation",
        duration: "Before arrival",
        description: "We send you our wellness guide with directions, parking information, and what to bring. Arrive 10 minutes early to settle into the serene environment.",
        keyPoints: [
          "Wellness guide sent via email",
          "Complete intake form online",
          "Arrive 10 minutes early",
        ],
      },
      {
        step: 3,
        title: "Arrival & Greeting",
        duration: "10 min",
        description: "You're welcomed with herbal tea and invited to our relaxation lounge. Our therapist greets you warmly and confirms your preferences.",
        keyPoints: [
          "Complimentary herbal tea",
          "Relaxation lounge access",
          "Meet your therapist",
        ],
      },
      {
        step: 4,
        title: "The Treatment",
        duration: "60–120 min",
        description: "You're guided to our treatment room—a sanctuary of calm. Our therapist provides personalized care, checking in on pressure and comfort throughout.",
        keyPoints: [
          "Premium natural products",
          "Customizable pressure and focus",
          "Temperature and music preferences",
        ],
      },
      {
        step: 5,
        title: "Integration",
        duration: "15 min",
        description: "After treatment, rest in our relaxation lounge with complimentary refreshments. Your therapist provides aftercare guidance to extend wellness benefits.",
        keyPoints: [
          "Herbal tea and refreshments",
          "Aftercare recommendations",
          "Product suggestions",
        ],
      },
      {
        step: 6,
        title: "Follow-Up Care",
        duration: "Ongoing",
        description: "We send a follow-up email with wellness tips and exclusive offers. Your wellness profile is saved for future visits, refining personalization over time.",
        keyPoints: [
          "Wellness tips via email",
          "Exclusive client offers",
          "Personalized treatment history",
        ],
      },
    ],
    extendedTestimonials: [
      {
        quote: "I came to Spatia Sauna skeptical. After my first massage, I felt like a different person. The tension I didn't even know I was holding just melted away. Now I'm a regular, and it's become my sanctuary.",
        client: "Sarah M.",
        title: "Event Planner",
        rating: 5,
        treatment: "Swedish Massage",
        transformation: {
          before: "Chronic neck pain, poor sleep",
          after: "Pain-free, sleeping 8+ hours",
        },
      },
      {
        quote: "As someone with a high-stress job, finding Spatia Sauna has been life-changing. The deep tissue therapy helped release years of tension I didn't even realize I was carrying.",
        client: "James L.",
        title: "Business Executive",
        rating: 5,
        treatment: "Deep Tissue Therapy",
        transformation: {
          before: "Daily stress headaches, tight shoulders",
          after: "Headache-free, full range of motion",
        },
      },
      {
        quote: "The couples retreat was exactly what my partner and I needed. The attention to detail, the ambiance, the skill of the therapists—it was all perfect. We're already planning our next visit.",
        client: "Michael & Lisa T.",
        title: "Married 10 Years",
        rating: 5,
        treatment: "Couples Retreat",
        transformation: {
          before: "Stressed, disconnected",
          after: "Relaxed, reconnected, rejuvenated",
        },
      },
      {
        quote: "After my sports injury, I thought I'd never feel normal again. David's sports massage work has been instrumental in my recovery. I'm back to running marathons.",
        client: "David K.",
        title: "Marathon Runner",
        rating: 5,
        treatment: "Sports Massage",
        transformation: {
          before: "Post-injury, limited mobility",
          after: "Full recovery, back to training",
        },
      },
    ],
  },
  booking: {
    hero: {
      headline: "Book Your Transformation",
      subtitle: "Choose from our curated wellness experiences and select a time that fits your journey.",
    },
  },
};