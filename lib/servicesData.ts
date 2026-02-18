export type ServiceCategory = "massage" | "facial" | "body-treatment" | "wellness" | "package";

export interface ServicePackage {
  id: string;
  name: string;
  sessions: number;
  originalPrice: number;
  discountedPrice: number;
  validity: string;
  benefits: string[];
  popular?: boolean;
}

export interface DetailedBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  duration: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  longDescription: string;
  imageUrl: string;
  tagline: string;
  rating: number;
  reviews: number;
  startingPrice: number;
  durations: number[];
  durationLabels: string[];
  pricing: Record<number, number>;
  packages?: ServicePackage[];
  benefits: string[];
  detailedBenefits: DetailedBenefit[];
  process: ProcessStep[];
  therapistIds: string[];
  faqs: ServiceFAQ[];
  relatedServiceIds: string[];
  targetAudience: string[];
  whatToExpect: string;
  includedItems: string[];
}

export const servicesData: ServiceData[] = [
  {
    id: "swedish-massage",
    slug: "swedish-massage",
    name: "Swedish Massage",
    category: "massage",
    categoryLabel: "Massage",
    shortDescription: "Classic technique combining long strokes, kneading, and circular motions for deep relaxation.",
    fullDescription: "Our Swedish massage combines long gliding strokes, kneading, and circular motions to release muscle tension and improve circulation. Perfect for first-time spa-goers and those seeking gentle relaxation.",
    longDescription: "Swedish massage, originating from 19th-century Sweden, is one of the most popular massage styles worldwide. It combines five fundamental techniques—effleurage (long gliding strokes), petrissage (kneading), friction, tapotement (rhythmic tapping), and vibration—to create a comprehensive therapeutic experience.\n\nThis gentle yet effective technique promotes overall relaxation, improves blood circulation, and helps relieve muscle tension. The pressure can be adjusted from light to firm based on your preference, making it suitable for everyone from massage newcomers to seasoned spa enthusiasts.\n\nEach session is customized to your body's needs. Your therapist will focus on areas of tension while ensuring full-body relaxation. The experience includes aromatherapy and soothing music in our tranquil treatment rooms.",
    imageUrl: "/images/services/swedish-massage.jpg",
    tagline: "Deep restoration for modern living",
    rating: 4.9,
    reviews: 127,
    startingPrice: 85,
    durations: [60, 90, 120],
    durationLabels: ["60 min", "90 min", "120 min"],
    pricing: { 60: 85, 90: 120, 120: 150 },
    packages: [
      {
        id: "swedish-pkg-5",
        name: "5-Session Package",
        sessions: 5,
        originalPrice: 425,
        discountedPrice: 380,
        validity: "6 months",
        benefits: [
          "5 sessions of Swedish Massage",
          "Save 10% ($45)",
          "Priority scheduling",
          "10% discount on additional services",
          "Free wellness consultation"
        ],
      },
      {
        id: "swedish-pkg-10",
        name: "10-Session Package",
        sessions: 10,
        originalPrice: 850,
        discountedPrice: 720,
        validity: "12 months",
        benefits: [
          "10 sessions of Swedish Massage",
          "Save 15% ($130)",
          "Priority scheduling",
          "15% discount on additional services",
          "Free wellness consultation",
          "Complimentary aromatherapy upgrade"
        ],
        popular: true,
      }
    ],
    benefits: [
      "Reduces Muscle Tension",
      "Improves Blood Circulation",
      "Decreases Stress & Anxiety",
      "Enhances Sleep Quality",
      "Promotes Healing & Recovery",
      "Increases Flexibility"
    ],
    detailedBenefits: [
      {
        title: "Reduces Muscle Tension",
        description: "Long gliding strokes and kneading release built-up tension in muscles and connective tissue, providing immediate relief from tightness and discomfort.",
        icon: "Heart"
      },
      {
        title: "Improves Blood Circulation",
        description: "The rhythmic movements stimulate blood flow, delivering oxygen and nutrients throughout your body while removing metabolic waste.",
        icon: "Activity"
      },
      {
        title: "Decreases Stress & Anxiety",
        description: "Gentle pressure and soothing techniques activate your parasympathetic nervous system, reducing cortisol levels and promoting calm.",
        icon: "Wind"
      },
      {
        title: "Enhances Sleep Quality",
        description: "Many clients report improved sleep after Swedish massage. The relaxation response helps regulate sleep patterns and promote deeper rest.",
        icon: "Moon"
      }
    ],
    process: [
      {
        step: 1,
        title: "Arrival & Check-In",
        duration: "10 min",
        description: "Arrive 10 minutes early to settle into our tranquil lounge. Our receptionist guides you through a brief wellness form and offers complimentary herbal tea."
      },
      {
        step: 2,
        title: "Pre-Service Consultation",
        duration: "5 min",
        description: "Meet your therapist in our private consultation room. Share your wellness goals, any concerns, or pressure preferences. Confirm aromatherapy and music preferences."
      },
      {
        step: 3,
        title: "The Treatment",
        duration: "60–120 min",
        description: "You're escorted to our serene treatment room. Your therapist provides premium-grade draping for comfort. Customized Swedish massage using professional techniques and natural products."
      },
      {
        step: 4,
        title: "Integration & Rest",
        duration: "15 min",
        description: "After treatment, rest peacefully as your body integrates. Move to our relaxation lounge at your own pace with complimentary herbal tea and light refreshments."
      },
      {
        step: 5,
        title: "Aftercare Guidance",
        duration: "5 min",
        description: "Your therapist provides personalized aftercare recommendations including hydration tips, stretching exercises, and information on follow-up services."
      }
    ],
    therapistIds: ["sarah", "michael", "jessica"],
    faqs: [
      {
        question: "How long does a session last?",
        answer: "Sessions range from 60 to 120 minutes depending on your preference. This includes consultation, treatment, and integration time."
      },
      {
        question: "Is this service suitable for first-time clients?",
        answer: "Absolutely! Swedish massage is perfect for first-time spa-goers. Our therapists tailor each session to your comfort level and experience."
      },
      {
        question: "What should I wear?",
        answer: "We provide robes and towels. Most of our services involve professional draping for modesty and warmth. Wear whatever makes you comfortable."
      },
      {
        question: "Should I eat before my appointment?",
        answer: "We recommend a light meal 2–3 hours before. Avoid heavy meals immediately beforehand for optimal comfort during your massage."
      },
      {
        question: "How often should I come?",
        answer: "For general relaxation, monthly sessions are ideal. For therapeutic benefits or stress management, we recommend bi-weekly or weekly visits."
      },
      {
        question: "Can I request a specific therapist?",
        answer: "Yes! When booking, you can request a preferred therapist. We'll do our best to accommodate your preference based on availability."
      }
    ],
    relatedServiceIds: ["deep-tissue", "hot-stone", "aromatherapy"],
    targetAudience: [
      "Stressed professionals needing tension relief",
      "Athletes recovering from workouts",
      "Anyone seeking deep relaxation",
      "First-time spa visitors",
      "Those with mild muscle tension"
    ],
    whatToExpect: "You'll experience a full-body therapeutic massage in our serene treatment room. The session begins with gentle strokes to warm the muscles, followed by kneading and friction techniques. Your therapist will check in on pressure preferences throughout.",
    includedItems: [
      "Full-body Swedish massage",
      "Aromatherapy of your choice",
      "Hot towel treatment",
      "Wellness consultation",
      "Aftercare guidance"
    ]
  },
  {
    id: "deep-tissue",
    slug: "deep-tissue",
    name: "Deep Tissue Therapy",
    category: "massage",
    categoryLabel: "Massage",
    shortDescription: "Intensive bodywork targeting deep muscle layers for chronic tension and pain relief.",
    fullDescription: "Target deep layers of muscle and connective tissue with focused pressure. Ideal for athletes, those with chronic pain, or anyone needing intensive muscle work. Our therapists customize pressure to your comfort level.",
    longDescription: "Deep tissue therapy is a specialized massage technique that focuses on realigning deeper layers of muscles and connective tissue. Unlike Swedish massage, which uses lighter pressure for overall relaxation, deep tissue work employs sustained pressure and slow, deliberate strokes to target specific problem areas.\n\nThis technique is particularly effective for chronic aches and pains, including stiff necks, upper back pain, low back tightness, and muscle tension headaches. It's also excellent for breaking down scar tissue and reducing inflammation.\n\nDuring your session, your therapist will use their hands, knuckles, forearms, and elbows to apply deep, targeted pressure. Communication is key—we encourage you to provide feedback throughout to ensure the pressure remains therapeutic while staying within your comfort zone.\n\nMany clients experience some soreness for a day or two after treatment, similar to the feeling after a good workout. This is normal and typically subsides within 24-48 hours, leaving you with improved mobility and reduced pain.",
    imageUrl: "/images/services/deep-tissue.jpg",
    tagline: "Release. Restore. Renew.",
    rating: 4.8,
    reviews: 89,
    startingPrice: 110,
    durations: [60, 90],
    durationLabels: ["60 min", "90 min"],
    pricing: { 60: 110, 90: 155 },
    packages: [
      {
        id: "deeptissue-pkg-5",
        name: "5-Session Recovery Package",
        sessions: 5,
        originalPrice: 550,
        discountedPrice: 495,
        validity: "6 months",
        benefits: [
          "5 sessions of Deep Tissue Therapy",
          "Save 10% ($55)",
          "Priority scheduling",
          "Post-session stretch guidance",
          "10% discount on additional services"
        ]
      }
    ],
    benefits: [
      "Releases Chronic Muscle Tension",
      "Reduces Inflammation",
      "Improves Mobility & Range of Motion",
      "Accelerates Recovery",
      "Breaks Down Scar Tissue",
      "Relieves Persistent Pain"
    ],
    detailedBenefits: [
      {
        title: "Releases Chronic Muscle Tension",
        description: "Deep, sustained pressure penetrates beyond surface muscles to release chronic tension patterns that have built up over time.",
        icon: "Zap"
      },
      {
        title: "Reduces Inflammation",
        description: "Improved circulation and lymphatic drainage help reduce inflammation in muscles and joints, promoting healing.",
        icon: "Flame"
      },
      {
        title: "Improves Mobility",
        description: "By releasing tight fascia and muscles, deep tissue work restores your natural range of motion and flexibility.",
        icon: "Activity"
      },
      {
        title: "Accelerates Recovery",
        description: "Ideal for athletes or anyone recovering from injury, this technique speeds up the body's natural healing processes.",
        icon: "TrendingUp"
      }
    ],
    process: [
      {
        step: 1,
        title: "Health Assessment",
        duration: "10 min",
        description: "A more detailed consultation focusing on your pain points, injury history, and treatment goals. Your therapist will create a targeted treatment plan."
      },
      {
        step: 2,
        title: "Warm-Up Preparation",
        duration: "5 min",
        description: "Lighter techniques warm the muscles and prepare tissues for deeper work. Heat therapy may be applied to particularly tight areas."
      },
      {
        step: 3,
        title: "Deep Tissue Work",
        duration: "45–75 min",
        description: "Your therapist applies focused pressure to target areas, working through layers of muscle and connective tissue. Communication is maintained throughout."
      },
      {
        step: 4,
        title: "Stretching & Integration",
        duration: "10 min",
        description: "Assisted stretching helps integrate the work and improve flexibility. Your therapist guides you through beneficial stretches."
      },
      {
        step: 5,
        title: "Recovery & Recommendations",
        duration: "10 min",
        description: "Rest in our recovery lounge with hydration. Receive personalized recommendations for at-home care and follow-up sessions."
      }
    ],
    therapistIds: ["sarah", "david"],
    faqs: [
      {
        question: "Will deep tissue massage hurt?",
        answer: "You may experience some discomfort during the session, which we call 'good pain'—therapeutic discomfort that indicates the work is effective. Always communicate with your therapist to stay within your comfort zone."
      },
      {
        question: "How is deep tissue different from Swedish massage?",
        answer: "Deep tissue uses slower, more focused pressure to target specific problem areas, while Swedish massage uses lighter, flowing strokes for overall relaxation. Many clients combine both approaches."
      },
      {
        question: "Is there any downtime after treatment?",
        answer: "Some soreness is normal for 24-48 hours, similar to post-workout soreness. We recommend hydration and gentle movement. Most clients feel significant relief after this initial period."
      },
      {
        question: "How many sessions will I need?",
        answer: "For chronic issues, we typically recommend a series of 4-6 sessions spaced 1-2 weeks apart. Your therapist will create a personalized treatment plan during your first visit."
      },
      {
        question: "Is deep tissue right for me?",
        answer: "Deep tissue is ideal for chronic pain, sports recovery, postural issues, or anyone who prefers firmer pressure. If you're unsure, your therapist can blend techniques during your session."
      },
      {
        question: "Can I get deep tissue massage if I'm pregnant?",
        answer: "Prenatal clients should opt for our specialized prenatal massage. Deep tissue work is generally not recommended during pregnancy without physician approval."
      }
    ],
    relatedServiceIds: ["swedish-massage", "hot-stone"],
    targetAudience: [
      "Athletes and fitness enthusiasts",
      "Those with chronic pain conditions",
      "Office workers with postural tension",
      "Individuals recovering from injuries",
      "People who prefer firm pressure"
    ],
    whatToExpect: "A focused, therapeutic session targeting specific areas of tension. Your therapist will use deep pressure and slow strokes, checking in frequently about your comfort. Some areas may be intense but should never be unbearable.",
    includedItems: [
      "Targeted deep tissue massage",
      "Heat therapy for tight areas",
      "Assisted stretching",
      "Post-session recovery guidance",
      "Personalized treatment plan"
    ]
  },
  {
    id: "facial",
    slug: "rejuvenating-facial",
    name: "Rejuvenating Facial",
    category: "facial",
    categoryLabel: "Facials",
    shortDescription: "Luxurious skincare treatment combining advanced technology with holistic techniques for radiant skin.",
    fullDescription: "Experience our signature facial combining advanced skincare technology with holistic techniques. Each treatment begins with a skin analysis and includes deep cleansing, exfoliation, massage, and a customized mask.",
    longDescription: "Our Rejuvenating Facial is more than skincare—it's a transformative experience for your skin and spirit. Each 60 or 90-minute session begins with a comprehensive skin analysis using advanced diagnostic technology to understand your unique skin type, concerns, and needs.\n\nThe treatment follows a carefully curated protocol: double cleansing to remove impurities, gentle exfoliation to reveal fresh skin, steam therapy to open pores, professional extractions if needed, a rejuvenating facial massage, and a custom mask selected for your skin's specific requirements.\n\nWe use only premium, naturally-derived skincare products rich in antioxidants, peptides, and botanical extracts. Our holistic approach incorporates pressure point massage and aromatherapy to promote relaxation while nourishing your skin.\n\nImmediate results include improved skin texture, a healthy glow, and deep hydration. For lasting benefits, we recommend monthly facials as part of your skincare routine. Your esthetician will provide personalized product recommendations and home care tips.",
    imageUrl: "/images/services/facial.jpg",
    tagline: "Reveal Your Natural Radiance",
    rating: 4.9,
    reviews: 156,
    startingPrice: 95,
    durations: [60, 90],
    durationLabels: ["60 min", "90 min"],
    pricing: { 60: 95, 90: 135 },
    packages: [
      {
        id: "facial-pkg-3",
        name: "Radiance Series",
        sessions: 3,
        originalPrice: 285,
        discountedPrice: 255,
        validity: "4 months",
        benefits: [
          "3 Rejuvenating Facials",
          "Save 10% ($30)",
          "Complimentary skin analysis",
          "Personalized skincare routine",
          "15% off recommended products"
        ],
        popular: true
      },
      {
        id: "facial-pkg-6",
        name: "Glow Membership",
        sessions: 6,
        originalPrice: 570,
        discountedPrice: 480,
        validity: "8 months",
        benefits: [
          "6 Rejuvenating Facials",
          "Save 16% ($90)",
          "Priority scheduling",
          "Complimentary eye treatment upgrade",
          "20% off all skincare products",
          "Seasonal treatment variations"
        ]
      }
    ],
    benefits: [
      "Deeply Cleanses Pores",
      "Improves Skin Tone & Texture",
      "Reduces Fine Lines",
      "Restores Natural Radiance",
      "Hydrates & Nourishes",
      "Promotes Cellular Renewal"
    ],
    detailedBenefits: [
      {
        title: "Deeply Cleanses Pores",
        description: "Professional-grade cleansing and extraction removes impurities, blackheads, and congestion that regular cleansing can't address.",
        icon: "Sparkles"
      },
      {
        title: "Improves Skin Tone",
        description: "Exfoliation and targeted treatments even out skin tone, reduce hyperpigmentation, and restore a healthy, luminous complexion.",
        icon: "Sun"
      },
      {
        title: "Reduces Fine Lines",
        description: "Anti-aging ingredients and massage techniques stimulate collagen production, softening the appearance of fine lines and wrinkles.",
        icon: "Flower2"
      },
      {
        title: "Restores Natural Radiance",
        description: "The combination of professional products, massage, and mask therapy reveals your skin's natural glow and vitality.",
        icon: "Star"
      }
    ],
    process: [
      {
        step: 1,
        title: "Skin Analysis",
        duration: "5 min",
        description: "Advanced diagnostic technology analyzes your skin type, concerns, and needs. This guides product selection and treatment customization."
      },
      {
        step: 2,
        title: "Cleansing & Exfoliation",
        duration: "15 min",
        description: "Double cleansing removes makeup and impurities. Gentle exfoliation sloughs away dead skin cells, revealing fresh, receptive skin."
      },
      {
        step: 3,
        title: "Steam & Extractions",
        duration: "15 min",
        description: "Warm steam opens pores for gentle extractions. This step clears congestion and prepares skin for treatment products."
      },
      {
        step: 4,
        title: "Massage & Mask",
        duration: "20 min",
        description: "A rejuvenating facial massage stimulates circulation and relaxes muscles. A custom mask addresses your specific skin concerns."
      },
      {
        step: 5,
        title: "Serum & Protection",
        duration: "5 min",
        description: "Targeted serums and moisturizers lock in benefits. SPF protection completes your treatment if it's daytime."
      }
    ],
    therapistIds: ["jessica", "elena"],
    faqs: [
      {
        question: "How often should I get a facial?",
        answer: "For optimal results, we recommend monthly facials. This aligns with your skin's natural renewal cycle (about 28 days) and maintains consistent results."
      },
      {
        question: "Will extractions hurt?",
        answer: "Our estheticians use gentle, professional techniques to minimize discomfort. You may feel slight pressure, but most clients find it tolerable and well worth the results."
      },
      {
        question: "What skin types is this facial suitable for?",
        answer: "Our Rejuvenating Facial is customized for all skin types—dry, oily, combination, sensitive, or mature. Your esthetician will adapt products and techniques accordingly."
      },
      {
        question: "Can I wear makeup after my facial?",
        answer: "We recommend waiting at least 4-6 hours, ideally until the next day. Let your skin breathe and absorb the treatment products fully."
      },
      {
        question: "Is there any downtime?",
        answer: "There's no downtime required. You may experience slight redness from extractions, which typically subsides within a few hours. Most clients return to normal activities immediately."
      },
      {
        question: "What products do you use?",
        answer: "We use premium, naturally-derived skincare products free from harsh chemicals. All products are carefully selected for efficacy and skin compatibility. Ask about our product lines during your visit."
      }
    ],
    relatedServiceIds: ["swedish-massage", "aromatherapy"],
    targetAudience: [
      "Those seeking improved skin health",
      "Clients preparing for special events",
      "Anyone wanting a healthy glow",
      "People with congested or dull skin",
      "Those interested in anti-aging"
    ],
    whatToExpect: "A relaxing, spa-like experience that transforms your skin. You'll lie comfortably on a treatment bed while your esthetician performs each step. Soothing music and aromatherapy create a serene atmosphere throughout.",
    includedItems: [
      "Comprehensive skin analysis",
      "Deep cleansing & exfoliation",
      "Professional extractions",
      "Rejuvenating facial massage",
      "Custom mask treatment",
      "Serum & moisturizer application"
    ]
  },
  {
    id: "hot-stone",
    slug: "hot-stone-massage",
    name: "Hot Stone Massage",
    category: "massage",
    categoryLabel: "Massage",
    shortDescription: "Heated basalt stones combined with massage for deep relaxation and muscle release.",
    fullDescription: "Smooth, heated basalt stones are placed on key points of your body while our therapists use them to massage with long, flowing strokes. The heat penetrates deep into muscles for ultimate relaxation.",
    longDescription: "Hot stone massage is an ancient healing art that combines the therapeutic benefits of heat with the healing power of touch. We use smooth, heated basalt stones—volcanic rocks that retain heat exceptionally well—placed at strategic points along your body.\n\nThe warmth from the stones penetrates deep into muscles, melting away tension before the massage even begins. Your therapist then uses the stones as an extension of their hands, gliding them along muscles with long, flowing strokes that induce profound relaxation.\n\nThis treatment is ideal for those who love heat therapy, have muscle tension but prefer lighter pressure, or want to experience something beyond traditional massage. The combination of heat and massage creates a uniquely grounding experience that calms both body and mind.\n\nYour session includes a brief consultation to discuss any areas of concern, temperature preferences, and pressure sensitivity. The stones are sanitized and heated to a therapeutic temperature (typically 120-130°F), always checked for comfort before application.",
    imageUrl: "/images/services/hot-stone.jpg",
    tagline: "Melt Into Tranquility",
    rating: 4.9,
    reviews: 94,
    startingPrice: 125,
    durations: [75, 90],
    durationLabels: ["75 min", "90 min"],
    pricing: { 75: 125, 90: 150 },
    packages: [
      {
        id: "hotstone-pkg-3",
        name: "Winter Wellness Series",
        sessions: 3,
        originalPrice: 375,
        discountedPrice: 330,
        validity: "4 months",
        benefits: [
          "3 Hot Stone Massage sessions",
          "Save 12% ($45)",
          "Priority scheduling",
          "Complimentary aromatherapy upgrade",
          "Herbal tea service"
        ],
        popular: true
      }
    ],
    benefits: [
      "Melts Away Muscle Tension",
      "Improves Circulation",
      "Promotes Deep Relaxation",
      "Eases Muscle Stiffness",
      "Reduces Stress & Anxiety",
      "Enhances Sleep Quality"
    ],
    detailedBenefits: [
      {
        title: "Melts Away Tension",
        description: "The penetrating heat from basalt stones relaxes muscles at a deeper level than hands alone, allowing for more effective tension release.",
        icon: "Flame"
      },
      {
        title: "Improves Circulation",
        description: "Heat dilates blood vessels, improving blood flow throughout the body. This delivers oxygen and nutrients while removing waste products.",
        icon: "Activity"
      },
      {
        title: "Promotes Deep Relaxation",
        description: "The combination of warmth, weight, and rhythmic massage induces a meditative state that many find deeper than traditional massage.",
        icon: "Moon"
      },
      {
        title: "Eases Stiffness",
        description: "Perfect for those with joint stiffness or arthritis. The heat increases flexibility and reduces pain in affected areas.",
        icon: "Wind"
      }
    ],
    process: [
      {
        step: 1,
        title: "Temperature Check",
        duration: "5 min",
        description: "Your therapist discusses your heat sensitivity and preferred temperature. Stones are tested on your skin to ensure comfort."
      },
      {
        step: 2,
        title: "Stone Placement",
        duration: "10 min",
        description: "Heated stones are placed along your spine, in your palms, between toes, and on other energy centers. You relax as the heat penetrates."
      },
      {
        step: 3,
        title: "Hot Stone Massage",
        duration: "45–65 min",
        description: "Your therapist uses oiled stones to massage your body with long, flowing strokes. Cool stones may be used on specific areas for contrast."
      },
      {
        step: 4,
        title: "Final Relaxation",
        duration: "10 min",
        description: "Stones are removed as you enter a state of deep relaxation. Your therapist leaves you to rest and integrate the experience."
      },
      {
        step: 5,
        title: "Hydration & Aftercare",
        duration: "5 min",
        description: "Complimentary water and herbal tea support detoxification. Your therapist provides aftercare recommendations."
      }
    ],
    therapistIds: ["michael", "sarah"],
    faqs: [
      {
        question: "Is hot stone massage safe?",
        answer: "Yes, when performed by trained professionals. Our therapists are certified in hot stone therapy and always test stone temperatures before application. The experience is deeply relaxing and completely safe."
      },
      {
        question: "What if the stones are too hot?",
        answer: "Always communicate your comfort level. We can adjust stone temperature at any time. Your comfort and safety are our priority."
      },
      {
        question: "Can I get hot stone massage if I have sensitive skin?",
        answer: "Yes, but please inform your therapist. We can use lower temperatures and avoid direct stone contact on sensitive areas, focusing instead on placement and gentle techniques."
      },
      {
        question: "Who should avoid hot stone massage?",
        answer: "Hot stone massage may not be suitable for those with certain conditions including pregnancy, diabetes, high blood pressure, heart disease, or skin conditions. Please consult your physician and inform us during booking."
      },
      {
        question: "How is this different from regular massage?",
        answer: "Hot stone massage uses heated stones to apply heat and pressure. The warmth penetrates deeper than hands alone, allowing muscles to relax more completely with lighter pressure."
      },
      {
        question: "What should I do after my session?",
        answer: "Hydrate well, avoid heavy meals, and rest if possible. The heat can be detoxifying, so drinking water helps flush released toxins. Avoid intense activity for 24 hours."
      }
    ],
    relatedServiceIds: ["swedish-massage", "deep-tissue"],
    targetAudience: [
      "Those who enjoy heat therapy",
      "People with muscle tension who prefer lighter pressure",
      "Anyone seeking deep relaxation",
      "Clients with mild joint stiffness",
      "Those looking for a unique spa experience"
    ],
    whatToExpect: "A profoundly relaxing experience. You'll feel the warmth of heated stones placed on your body, followed by a massage using stones as extensions of the therapist's hands. Many clients enter a deeply meditative state.",
    includedItems: [
      "Heated basalt stone therapy",
      "Full-body hot stone massage",
      "Aromatherapy",
      "Energy center stone placement",
      "Herbal tea service",
      "Aftercare guidance"
    ]
  },
  {
    id: "aromatherapy",
    slug: "aromatherapy-journey",
    name: "Aromatherapy Journey",
    category: "wellness",
    categoryLabel: "Wellness",
    shortDescription: "Essential oils enhance your massage experience for targeted therapeutic benefits.",
    fullDescription: "A personalized blend of therapeutic essential oils is combined with a relaxing massage. Choose from our signature blends: Calm, Energize, Detox, or Balance. Each oil is selected for its unique healing properties.",
    longDescription: "Aromatherapy is the art and science of using plant essences for therapeutic benefit. Our Aromatherapy Journey combines this ancient practice with skilled massage to create a multi-sensory healing experience.\n\nYour session begins with a consultation to understand your needs—whether you seek relaxation, energy, detoxification, or emotional balance. Based on this, your therapist will recommend one of our signature essential oil blends, each carefully formulated by certified aromatherapists.\n\nOur signature blends:\n• Calm: Lavender, chamomile, and sandalwood for deep relaxation\n• Energize: Peppermint, eucalyptus, and citrus for mental clarity and vitality\n• Detox: Grapefruit, juniper, and rosemary for purification\n• Balance: Geranium, ylang-ylang, and frankincense for emotional equilibrium\n\nThe essential oils are applied through massage and inhalation, working on both physiological and psychological levels. You'll experience the oils' benefits long after your session ends, with many clients reporting improved mood, sleep, and overall wellbeing.",
    imageUrl: "/images/services/aromatherapy.jpg",
    tagline: "Healing Through Scent",
    rating: 4.8,
    reviews: 72,
    startingPrice: 100,
    durations: [60, 90],
    durationLabels: ["60 min", "90 min"],
    pricing: { 60: 100, 90: 140 },
    packages: [
      {
        id: "aroma-pkg-4",
        name: "Seasonal Wellness",
        sessions: 4,
        originalPrice: 400,
        discountedPrice: 360,
        validity: "6 months",
        benefits: [
          "4 Aromatherapy Journey sessions",
          "Custom seasonal blend changes",
          "Save 10% ($40)",
          "Take-home essential oil sample",
          "Wellness journal included"
        ]
      }
    ],
    benefits: [
      "Enhances Mood & Emotions",
      "Reduces Anxiety & Stress",
      "Improves Sleep Quality",
      "Balances Energy Levels",
      "Supports Immune Function",
      "Creates Lasting Calm"
    ],
    detailedBenefits: [
      {
        title: "Enhances Mood",
        description: "Essential oils interact with the limbic system, the brain's emotional center, to shift mood states and promote emotional wellbeing.",
        icon: "Sparkles"
      },
      {
        title: "Reduces Anxiety",
        description: "Calming oils like lavender and chamomile have been clinically shown to reduce anxiety levels and promote relaxation.",
        icon: "Heart"
      },
      {
        title: "Improves Sleep",
        description: "Many essential oils have sedative properties that improve sleep quality and duration when used regularly.",
        icon: "Moon"
      },
      {
        title: "Balances Energy",
        description: "Whether you need to energize or calm, the right essential oils can help restore your natural energy balance.",
        icon: "Activity"
      }
    ],
    process: [
      {
        step: 1,
        title: "Scent Consultation",
        duration: "10 min",
        description: "Sample our signature blends and discuss your goals. Your therapist helps you choose the perfect oil combination for your needs."
      },
      {
        step: 2,
        title: "Inhalation Ritual",
        duration: "5 min",
        description: "Begin with deep inhalation of your chosen essential oils. This activates the olfactory system and begins the therapeutic process."
      },
      {
        step: 3,
        title: "Aromatherapy Massage",
        duration: "45–75 min",
        description: "Your therapist combines the essential oils with carrier oils for a full-body massage. The oils are absorbed through skin and continued inhalation."
      },
      {
        step: 4,
        title: "Rest & Integration",
        duration: "10 min",
        description: "Rest in our relaxation lounge as the oils continue to work. Warm towels may be offered to enhance absorption."
      },
      {
        step: 5,
        title: "Take-Home Guidance",
        duration: "5 min",
        description: "Learn about essential oils you can use at home. Optional take-home samples are available for purchase."
      }
    ],
    therapistIds: ["jessica", "elena"],
    faqs: [
      {
        question: "Can I choose my own essential oils?",
        answer: "Absolutely! While we have signature blends, you can work with your therapist to create a custom blend tailored to your preferences and needs."
      },
      {
        question: "Are essential oils safe for everyone?",
        answer: "Most people can enjoy aromatherapy safely. However, some oils may not be suitable during pregnancy, for those with certain medical conditions, or for those with specific allergies. Please inform us of any concerns."
      },
      {
        question: "Will the scent be overwhelming?",
        answer: "We use therapeutic-grade oils in appropriate dilutions. The scent is present but subtle, designed to enhance rather than overwhelm. Let your therapist know if you're sensitive to smells."
      },
      {
        question: "Can I purchase the oils to use at home?",
        answer: "Yes! We offer retail sizes of all our signature blends and individual essential oils. Your therapist can recommend the best options for your needs."
      },
      {
        question: "How long do the benefits last?",
        answer: "The immediate effects typically last several hours to a day. Regular aromatherapy sessions build cumulative benefits for mood, sleep, and overall wellbeing."
      },
      {
        question: "Is this just a scented massage?",
        answer: "No—true aromatherapy uses therapeutic-grade essential oils at specific dilutions for medicinal benefit. It's more than fragrance; it's plant medicine working on multiple levels."
      }
    ],
    relatedServiceIds: ["swedish-massage", "facial"],
    targetAudience: [
      "Those seeking emotional balance",
      "People with stress or anxiety",
      "Anyone wanting to improve sleep",
      "Clients interested in natural wellness",
      "Those who love aromatic experiences"
    ],
    whatToExpect: "A multi-sensory experience beginning with scent selection and inhalation, followed by a full-body massage using your chosen essential oil blend. The treatment room will be lightly scented, and you'll carry the aroma with you after your session.",
    includedItems: [
      "Personalized essential oil blend",
      "Scent consultation",
      "Full-body aromatherapy massage",
      "Inhalation ritual",
      "Warm towel treatment",
      "Home care recommendations"
    ]
  },
  {
    id: "couples",
    slug: "couples-retreat",
    name: "Couples Retreat",
    category: "package",
    categoryLabel: "Packages",
    shortDescription: "A shared wellness experience for two in our private couples suite with champagne and chocolates.",
    fullDescription: "Share a blissful experience with your partner in our private couples suite. Enjoy side-by-side massages in a romantic setting with candlelight, soft music, and aromatherapy. Includes champagne and chocolates.",
    longDescription: "Our Couples Retreat is more than a massage—it's an opportunity to reconnect, relax, and create lasting memories together. In our dedicated couples suite, you and your partner will experience simultaneous side-by-side massages in an intimate, beautifully appointed setting.\n\nThe experience begins when you enter our private couples suite, softly lit with candles and filled with gentle aromatherapy. Soothing music plays as you both settle onto side-by-side massage tables. Two therapists work in synchronized harmony, ensuring you share this journey together.\n\nEach partner can choose their preferred massage style and pressure—Swedish, deep tissue, or a combination. Add hot stones or aromatherapy to customize your experience. The session is tailored to both your needs while maintaining a cohesive, romantic atmosphere.\n\nAfter your massage, enjoy complimentary champagne or sparkling cider and artisan chocolates in your private suite. There's no rush—take time to savor the moment together. Many couples tell us this shared relaxation is among their most memorable experiences.",
    imageUrl: "/images/services/couples.jpg",
    tagline: "Share the Journey Together",
    rating: 5.0,
    reviews: 68,
    startingPrice: 220,
    durations: [60, 90, 120],
    durationLabels: ["60 min", "90 min", "120 min"],
    pricing: { 60: 220, 90: 300, 120: 380 },
    packages: [
      {
        id: "couples-pkg-anniversary",
        name: "Anniversary Package",
        sessions: 1,
        originalPrice: 350,
        discountedPrice: 320,
        validity: "Single use",
        benefits: [
          "90-minute Couples Retreat",
          "Rose petal setup",
          "Premium champagne upgrade",
          "Gourmet chocolate assortment",
          "Commemorative photo",
          "20% off your next visit"
        ],
        popular: true
      }
    ],
    benefits: [
      "Strengthens Connection",
      "Shared Relaxation Experience",
      "Creates Lasting Memories",
      "Reduces Joint Stress",
      "Enhances Intimacy",
      "Perfect for Special Occasions"
    ],
    detailedBenefits: [
      {
        title: "Strengthens Connection",
        description: "Sharing a relaxing experience together deepens emotional bonds and creates space for meaningful connection.",
        icon: "Heart"
      },
      {
        title: "Shared Relaxation",
        description: "Both partners experience relaxation simultaneously, creating a shared state of calm that enhances connection.",
        icon: "Users"
      },
      {
        title: "Creates Memories",
        description: "This unique experience becomes a treasured memory, often commemorating anniversaries, birthdays, or special moments.",
        icon: "Gift"
      },
      {
        title: "Perfect for Celebrations",
        description: "Whether an anniversary, birthday, or just because, couples retreats make any occasion special.",
        icon: "Sparkles"
      }
    ],
    process: [
      {
        step: 1,
        title: "Suite Welcome",
        duration: "10 min",
        description: "Arrive to your private couples suite, beautifully prepared with candles and aromatherapy. Settle in with a glass of sparkling beverage."
      },
      {
        step: 2,
        title: "Consultation",
        duration: "5 min",
        description: "Both partners share their preferences with their respective therapists. Choose massage styles, pressure, and any add-ons."
      },
      {
        step: 3,
        title: "Side-by-Side Massage",
        duration: "60–120 min",
        description: "Two therapists work in harmony, each focused on one partner. The synchronized experience creates a sense of unity and shared journey."
      },
      {
        step: 4,
        title: "Post-Massage Relaxation",
        duration: "20 min",
        description: "After your massage, enjoy champagne or cider and artisan chocolates in your private suite. No rush—savor the moment together."
      },
      {
        step: 5,
        title: "Departure",
        duration: "5 min",
        description: "Depart feeling refreshed, connected, and with a small commemorative gift to remember your experience."
      }
    ],
    therapistIds: ["sarah", "michael", "jessica", "david"],
    faqs: [
      {
        question: "Can we choose different massage types?",
        answer: "Absolutely! Each partner can select their preferred massage style and pressure. One can enjoy Swedish while the other receives deep tissue—we accommodate both."
      },
      {
        question: "Is this only for romantic couples?",
        answer: "Not at all! Friends, family members, or any two people who want to share a wellness experience together are welcome. We've hosted mothers-daughters, best friends, and siblings."
      },
      {
        question: "What's included in the package?",
        answer: "The base package includes your chosen duration of side-by-side massage, aromatherapy, champagne or sparkling cider, and artisan chocolates. Add-ons like hot stones are available for an additional fee."
      },
      {
        question: "Can we add special touches for anniversaries?",
        answer: "Yes! We offer anniversary and special occasion enhancements including rose petals, premium champagne upgrades, custom playlists, and commemorative photos. Ask about our celebration packages."
      },
      {
        question: "What should we wear?",
        answer: "Wear comfortable clothing. We provide robes and slippers for your comfort. During the massage, professional draping ensures privacy for both partners."
      },
      {
        question: "Is gratuity included?",
        answer: "Gratuity is not included but greatly appreciated. You can add gratuity at checkout or arrange it in advance. Many couples tip 18-22% for exceptional service."
      }
    ],
    relatedServiceIds: ["swedish-massage", "hot-stone"],
    targetAudience: [
      "Couples celebrating anniversaries",
      "Partners seeking shared experiences",
      "Those planning romantic dates",
      "Friends or family members together",
      "Anyone wanting a unique spa experience"
    ],
    whatToExpect: "A romantic, intimate experience in our beautiful couples suite. You'll both disrobe to your comfort level, receive side-by-side massages from two therapists working in harmony, and enjoy champagne and chocolates together afterward.",
    includedItems: [
      "Private couples suite",
      "Side-by-side massage for two",
      "Choice of massage style each",
      "Aromatherapy",
      "Champagne or sparkling cider",
      "Artisan chocolates",
      "Commemorative gift"
    ]
  }
];

export const categories = [
  { value: "all", label: "All Services", icon: "Sparkles" },
  { value: "massage", label: "Massage", icon: "Heart" },
  { value: "facial", label: "Facials", icon: "Sparkles" },
  { value: "body-treatment", label: "Body Treatments", icon: "Droplets" },
  { value: "wellness", label: "Wellness", icon: "Wind" },
  { value: "package", label: "Packages", icon: "Gift" },
];

export const durationOptions = [
  { value: "all", label: "All Durations" },
  { value: "60", label: "60 min" },
  { value: "75", label: "75 min" },
  { value: "90", label: "90 min" },
  { value: "120", label: "120 min" },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((service) => service.slug === slug);
}

export function getServiceById(id: string): ServiceData | undefined {
  return servicesData.find((service) => service.id === id);
}

export function getRelatedServices(serviceId: string): ServiceData[] {
  const service = getServiceById(serviceId);
  if (!service) return [];
  return service.relatedServiceIds
    .map((id) => getServiceById(id))
    .filter((s): s is ServiceData => s !== undefined);
}

export function getServicesByCategory(category: ServiceCategory): ServiceData[] {
  return servicesData.filter((service) => service.category === category);
}

export function getTherapistIds(serviceId: string): string[] {
  const service = getServiceById(serviceId);
  return service?.therapistIds || [];
}
