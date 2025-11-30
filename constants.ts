import { Standard, IndustryEvent, NewsItem } from './types';

export const POPULAR_STANDARDS: Standard[] = [
  {
    code: "ASTM F2291",
    title: "Standard Practice for Design of Amusement Rides and Devices",
    organization: "ASTM International",
    description: "Establishes criteria for the design of amusement rides and devices, covering structural, mechanical, and electrical systems.",
    category: "Design"
  },
  {
    code: "ISO 13849-1",
    title: "Safety of machinery — Safety-related parts of control systems",
    organization: "ISO",
    description: "Provides safety requirements and guidance on the principles for the design and integration of safety-related parts of control systems (SRP/CS). Critical for ride control.",
    category: "Safety"
  },
  {
    code: "IEC 61508",
    title: "Functional safety of electrical/electronic/programmable electronic safety-related systems",
    organization: "IEC",
    description: "The 'umbrella' standard for functional safety. It sets out requirements for ensuring that systems are designed, implemented, operated, and maintained to provide the required safety integrity level (SIL).",
    category: "Safety"
  },
  {
    code: "IEC 62061",
    title: "Safety of machinery — Functional safety of safety-related control systems",
    organization: "IEC",
    description: "Specific to machinery safety, this standard integrates requirements for safety-related electrical, electronic, and programmable electronic control systems (SRECS).",
    category: "Safety"
  },
  {
    code: "EN 13814-1",
    title: "Safety of amusement rides and amusement devices - Part 1: Design and manufacture",
    organization: "CEN",
    description: "The European standard specifying the minimum requirements for the design, calculation, manufacture, and installation of mobile, temporary, or permanently installed machinery.",
    category: "Design"
  },
  {
    code: "ASTM F770",
    title: "Standard Practice for Ownership, Operation, Maintenance, and Inspection",
    organization: "ASTM International",
    description: "Outlines the responsibilities for operations, maintenance, and inspection procedures for amusement rides.",
    category: "Operations"
  },
  {
    code: "ISO 17842-1",
    title: "Safety of amusement rides and amusement devices — Part 1: Design and manufacture",
    organization: "ISO",
    description: "International standard harmonizing design and manufacturing requirements for amusement rides to facilitate global safety.",
    category: "Design"
  },
  {
    code: "ASTM F1193",
    title: "Standard Practice for Quality, Manufacture, and Construction",
    organization: "ASTM International",
    description: "Focuses on quality assurance programs and manufacturing requirements for amusement rides and devices.",
    category: "Manufacturing"
  },
  {
    code: "GB 8408-2018",
    title: "Large-scale amusement device safety code",
    organization: "SAC (China)",
    description: "The fundamental safety standard for amusement rides in China, specifying technical requirements for design, manufacture, installation, and inspection.",
    category: "Design"
  },
  {
    code: "ASTM F2137",
    title: "Standard Practice for Measuring the Dynamic Characteristics of Amusement Rides",
    organization: "ASTM International",
    description: "Defines the standard method for measuring and recording the acceleration/G-forces experienced by patrons on amusement rides.",
    category: "Safety"
  },
  {
    code: "ASTM F2374",
    title: "Standard Practice for Design, Manufacture, Operation, and Maintenance of Inflatable Amusement Devices",
    organization: "ASTM International",
    description: "Specific safety requirements for inflatable attractions like bounce houses and slides.",
    category: "Design"
  },
  {
    code: "AS 3533.1",
    title: "Amusement rides and devices - Part 1: Design and construction",
    organization: "Standards Australia",
    description: "The primary Australian standard governing the design and construction of amusement rides.",
    category: "Design"
  },
  {
    code: "CSA Z267-00",
    title: "Safety code for amusement rides and devices",
    organization: "CSA Group (Canada)",
    description: "Canadian safety code addressing the design, construction, operation, and maintenance of amusement rides.",
    category: "Safety"
  },
  {
    code: "ASTM F2974",
    title: "Standard Practice for Auditing Amusement Rides and Devices",
    organization: "ASTM International",
    description: "Establishes consistent terminology and practices for third-party auditing of amusement ride operations and maintenance programs.",
    category: "Inspection"
  },
  {
    code: "ASTM F2960",
    title: "Standard Practice for Permanent Amusement Railway Ride Tracks and Wheels",
    organization: "ASTM International",
    description: "Focuses specifically on the design, manufacture, and maintenance of railway-style amusement rides and park trains.",
    category: "Maintenance"
  },
  {
    code: "ISO 12100",
    title: "Safety of machinery — General principles for design — Risk assessment and risk reduction",
    organization: "ISO",
    description: "The foundational standard for performing risk assessments on machinery, widely used as the starting point for ride safety analysis.",
    category: "Safety"
  },
  {
    code: "ASTM F2461",
    title: "Standard Practice for Manufacture, Construction, Operation, and Maintenance of Aquatic Play Equipment",
    organization: "ASTM International",
    description: "Safety guidelines specifically for aquatic play structures and water park equipment.",
    category: "Aquatics"
  },
  {
    code: "EN 1069",
    title: "Water slides - Safety requirements and test methods",
    organization: "CEN",
    description: "European standard covering the specific safety requirements, testing, and instructions for water slides.",
    category: "Aquatics"
  }
];

export const INDUSTRY_EVENTS: IndustryEvent[] = [
  {
    id: "naarso-2025",
    title: "NAARSO 38th Annual Safety Seminar",
    organization: "NAARSO",
    date: "Jan 26 - Jan 31, 2025",
    location: "Myrtle Beach, SC, USA",
    address: "Sheraton Myrtle Beach, 2101 N Oak St, Myrtle Beach, SC 29577",
    coordinates: [33.7088, -78.8797],
    description: "The primary safety seminar for ride inspectors and operations personnel, offering certification exams and hands-on training.",
    website: "https://naarso.com/safety-seminars/"
  },
  {
    id: "aims-2025",
    title: "AIMS International Safety Seminar",
    organization: "AIMS International",
    date: "Jan 12 - Jan 17, 2025",
    location: "Orlando, FL, USA",
    address: "DoubleTree by Hilton at SeaWorld, 10100 International Dr, Orlando, FL 32821",
    coordinates: [28.4116, -81.4645],
    description: "World-class safety education for the amusement industry, featuring hundreds of hours of classes for maintenance, operations, and aquatics.",
    website: "https://aimsintl.org/"
  },
  {
    id: "iaapa-europe",
    title: "IAAPA Expo Europe 2025",
    organization: "IAAPA",
    date: "Sep 22 - Sep 25, 2025",
    location: "Barcelona, Spain",
    address: "Fira Barcelona Gran Via, Av. Joan Carles I, 64, 08908 L'Hospitalet de Llobregat, Barcelona",
    coordinates: [41.3543, 2.1265],
    description: "The leisure industry's premier event in Europe, showcasing the latest innovations and standards discussions.",
    website: "https://www.iaapa.org/expos/iaapa-expo-europe"
  },
  {
    id: "astm-f24-oct",
    title: "ASTM F24 Committee Meeting",
    organization: "ASTM International",
    date: "Oct 15 - Oct 18, 2025",
    location: "San Diego, CA, USA",
    address: "Marriott Marquis San Diego Marina, 333 W Harbor Dr, San Diego, CA 92101",
    coordinates: [32.7090, -117.1633],
    description: "Official bi-annual meeting of Committee F24 on Amusement Rides and Devices where standards are drafted and revised.",
    website: "https://www.astm.org/committee-f24"
  },
  {
    id: "iaapa-expo-orlando",
    title: "IAAPA Expo 2025",
    organization: "IAAPA",
    date: "Nov 17 - Nov 21, 2025",
    location: "Orlando, FL, USA",
    address: "Orange County Convention Center, 9800 International Dr, Orlando, FL 32819",
    coordinates: [28.4246, -81.4678],
    description: "The global attraction industry's premier event. Includes EDUSessions on safety standards and harmonization.",
    website: "https://www.iaapa.org/expos/iaapa-expo"
  }
];

export const INDUSTRY_NEWS: NewsItem[] = [
  {
    id: "news-001",
    title: "Correction to ASTM F2291 Table 2",
    date: "2025-08-15",
    source: "ASTM F24 Committee",
    summary: "A minor editorial correction was issued for Table 2 regarding fatigue cycle counts. The value for steel structures has been clarified to align with AISC references.",
    type: "Adjustment"
  },
  {
    id: "news-002",
    title: "ISO 13849-1 Re-affirmed",
    date: "2025-08-01",
    source: "ISO/TC 199",
    summary: "The technical committee has voted to confirm the current version of ISO 13849-1 without changes for the next 5-year cycle, ensuring stability for control system designers.",
    type: "Harmonization"
  },
  {
    id: "news-003",
    title: "Revision to ASTM F770 Inspection Logs",
    date: "2025-07-20",
    source: "ASTM F24",
    summary: "Adjustments to section 5.2 require digital or physical logs to be retained for a minimum of 3 years, up from the previous suggestion of 2 years.",
    type: "Adjustment"
  },
  {
    id: "news-004",
    title: "Draft Amendment: GB 8408 Wind Loads",
    date: "2025-06-05",
    source: "SAC",
    summary: "Proposed minor changes to wind load calculation coefficients for rides exceeding 100m in height. Open for public comment until Sept 2025.",
    type: "Adjustment"
  },
  {
    id: "news-005",
    title: "New Work Item: Cyber Security for Rides",
    date: "2025-05-28",
    source: "CEN/TC 152",
    summary: "A new work group has been formed to draft guidelines on cybersecurity for ride control systems, referencing IEC 62443.",
    type: "New Standard"
  }
];