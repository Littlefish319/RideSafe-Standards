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

// Current Date Assumption: December 2025
export const INDUSTRY_EVENTS: IndustryEvent[] = [
  {
    id: "aims-2026",
    title: "AIMS International Safety Seminar 2026",
    organization: "AIMS International",
    date: "Jan 11 - Jan 16, 2026",
    location: "Galveston, TX, USA",
    address: "Galveston Island Convention Center, 5600 Seawall Blvd, Galveston, TX 77551",
    coordinates: [29.2743, -94.8122],
    description: "The year's first major safety gathering. Certification courses for Levels I and II inspectors, plus maintenance and operations tracks.",
    website: "https://aimsintl.org/"
  },
  {
    id: "naarso-2026",
    title: "NAARSO 39th Annual Safety Forum",
    organization: "NAARSO",
    date: "Jan 25 - Jan 30, 2026",
    location: "Lexington, KY, USA",
    address: "Central Bank Center, 430 W Vine St, Lexington, KY 40507",
    coordinates: [38.0496, -84.5031],
    description: "Primary technical school for government and insurance inspectors. Heavy focus on ASTM F770 and F1193 compliance.",
    website: "https://naarso.com/"
  },
  {
    id: "astm-f24-feb-2026",
    title: "ASTM F24 Committee Meeting",
    organization: "ASTM International",
    date: "Feb 11 - Feb 14, 2026",
    location: "New Orleans, LA, USA",
    address: "Hyatt Regency New Orleans, 601 Loyola Ave, New Orleans, LA 70113",
    coordinates: [29.9507, -90.0768],
    description: "Crucial standards development meeting. Task groups will be voting on the new 'Cybersecurity for Control Systems' annex.",
    website: "https://www.astm.org/committee-f24"
  },
  {
    id: "deal-2026",
    title: "DEAL 2026 (Dubai Entertainment & Leisure)",
    organization: "IEC",
    date: "Mar 24 - Mar 26, 2026",
    location: "Dubai, UAE",
    address: "Dubai World Trade Centre, Sheikh Zayed Rd, Dubai, UAE",
    coordinates: [25.2222, 55.2897],
    description: "Connecting the MENA region. Focus on Saudi Vision 2030 projects and adoption of EN 13814 standards in the region.",
    website: "https://www.dealmiddleeastshow.com/"
  },
  {
    id: "tea-sate-2026",
    title: "TEA SATE Europe 2026",
    organization: "TEA",
    date: "May 05 - May 07, 2026",
    location: "Rust, Germany",
    address: "Europa-Park, Europa-Park-Straße 2, 77977 Rust, Germany",
    coordinates: [48.2618, 7.7215],
    description: "Experience design meets safety. Discussions on integrating safety envelopes into immersive dark ride environments.",
    website: "https://www.teaconnect.org/"
  },
  {
    id: "sea-expo-2026",
    title: "Saudi Entertainment & Amusement (SEA) Expo",
    organization: "DMG Events",
    date: "May 18 - May 20, 2026",
    location: "Riyadh, Saudi Arabia",
    address: "Riyadh Front Exhibition & Conference Center, Riyadh, Saudi Arabia",
    coordinates: [24.8576, 46.7265],
    description: "The fastest growing market. Safety sessions will focus on third-party auditing requirements for giga-projects.",
    website: "https://www.seasaudi.com/"
  },
  {
    id: "iaapa-asia-2026",
    title: "IAAPA Expo Asia 2026",
    organization: "IAAPA",
    date: "Jun 09 - Jun 12, 2026",
    location: "Singapore",
    address: "Marina Bay Sands Expo & Convention Centre, 10 Bayfront Ave, Singapore 018956",
    coordinates: [1.2847, 103.8590],
    description: "Focus on the Asian market recovery and harmonization between GB standards and ISO standards.",
    website: "https://www.iaapa.org/expos/iaapa-expo-asia"
  },
  {
    id: "balppa-summer-2026",
    title: "BALPPA Summer Conference",
    organization: "BALPPA",
    date: "Jun 15 - Jun 17, 2026",
    location: "Blackpool, UK",
    address: "Blackpool Pleasure Beach, 525 Ocean Blvd, Blackpool FY4 1EZ, UK",
    coordinates: [53.7915, -3.0566],
    description: "UK-specific guidance updates (HSG175) and operational safety forums for piers and parks.",
    website: "https://www.balppa.org/"
  },
  {
    id: "iaapa-europe-2026",
    title: "IAAPA Expo Europe 2026",
    organization: "IAAPA",
    date: "Sep 21 - Sep 24, 2026",
    location: "Berlin, Germany",
    address: "Messe Berlin, Messedamm 22, 14055 Berlin, Germany",
    coordinates: [52.5015, 13.2694],
    description: "The largest European show. Expect major updates from the CEN TC 152 committee regarding water slide safety.",
    website: "https://www.iaapa.org/expos/iaapa-expo-europe"
  },
  {
    id: "wwa-2026",
    title: "WWA Show 2026",
    organization: "WWA",
    date: "Oct 06 - Oct 09, 2026",
    location: "Las Vegas, NV, USA",
    address: "Caesars Forum, 3911 S Koval Ln, Las Vegas, NV 89109",
    coordinates: [36.1162, -115.1633],
    description: "World Waterpark Association. Focus on Aquatic Play Feature standards (ASTM F2461) and dispatcher training.",
    website: "https://www.waterparks.org/"
  },
  {
    id: "iaapa-orlando-2026",
    title: "IAAPA Expo 2026",
    organization: "IAAPA",
    date: "Nov 16 - Nov 20, 2026",
    location: "Orlando, FL, USA",
    address: "Orange County Convention Center, 9800 International Dr, Orlando, FL 32819",
    coordinates: [28.4246, -81.4678],
    description: "The big one. Global Safety Forum will headline the week, with awards for safety innovation.",
    website: "https://www.iaapa.org/expos/iaapa-expo"
  }
];

// Current Date Assumption: December 2025
export const INDUSTRY_NEWS: NewsItem[] = [
  {
    id: "news-future-01",
    title: "Upcoming Vote: F2291 Restraint Updates",
    date: "2026-01-15",
    source: "ASTM F24.24",
    summary: "Committee F24 is scheduled to vote on new language regarding Class 5 restraints for high-thrill rides, aiming to standardize redundancy requirements.",
    type: "Committee"
  },
  {
    id: "news-future-02",
    title: "New European Drone Show Regulations",
    date: "2026-01-05",
    source: "EASA / CEN",
    summary: "EASA has released a preliminary draft for operating drone swarms over theme park crowds, which CEN TC 152 will review for adoption into EN standards.",
    type: "New Standard"
  },
  {
    id: "news-future-03",
    title: "Cybersecurity Annex Published (IEC 62443)",
    date: "2025-12-10",
    source: "IEC / ISO",
    summary: "The long-awaited annex applying IEC 62443 cybersecurity protocols specifically to amusement ride control systems has been officially published.",
    type: "Harmonization"
  },
  {
    id: "news-future-04",
    title: "Review of 2025 Incident Data",
    date: "2025-12-01",
    source: "Saferparks / CPSC",
    summary: "Analysis of 2025 ride incident data shows a 15% decrease in mechanical failures, but a slight uptick in patron-behavior related stoppages.",
    type: "Adjustment"
  },
  {
    id: "news-future-05",
    title: "ASTM F770 Digital Logs Mandate",
    date: "2025-11-20",
    source: "ASTM F24",
    summary: "The grace period for transitioning to digital maintenance logs (or verified redundant physical logs) under the revised F770 ends in Jan 2026.",
    type: "Adjustment"
  },
  {
    id: "news-future-06",
    title: "Universal Design Task Force Findings",
    date: "2025-11-05",
    source: "IAAPA Safety Committee",
    summary: "The task force has released a comprehensive guide on designing queue lines and ride vehicles for neurodivergent guests and those with mobility aids.",
    type: "Committee"
  },
  {
    id: "news-future-07",
    title: "ISO 17842-3 Amendment 2",
    date: "2025-10-15",
    source: "ISO TC 254",
    summary: "Amendment 2 regarding the calculation of fatigue life for composite materials in ride vehicles has passed the Final Draft International Standard (FDIS) stage.",
    type: "Harmonization"
  },
  {
    id: "news-future-08",
    title: "Zip Line Braking Standard Enforced",
    date: "2025-09-01",
    source: "ASTM F24",
    summary: "As of Sept 1st, all new commercial zip lines must adhere to the updated F2959 requiring 'fail-safe' terminal braking systems separate from patron braking.",
    type: "New Standard"
  }
];