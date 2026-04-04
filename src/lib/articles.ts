export type Article = {
  id: string;
  topic: string;
  topicColor: string;
  byline: string;
  timestamp: string;
  headline: string;
  subheadline: string;
  body: string;
  readTime: string;
  region: string;
  likes: number;
  comments: number;
  shares: number;
};

export const ARTICLES: Article[] = [
  {
    id: '001',
    topic: 'GEOPOLITICS',
    topicColor: '#7C3AED',
    byline: 'AI INVESTIGATIVE UNIT',
    timestamp: '8 MIN AGO',
    region: 'EASTERN EUROPE',
    readTime: '5 MIN READ',
    headline: 'The Silent Repositioning of NATO\u2019s Eastern Flank',
    subheadline: 'Satellite telemetry and intercepted logistics data reveal a coordinated infrastructure buildup across three Baltic states.',
    body: 'Over the past 72 hours, cross-referenced satellite imagery from commercial providers and anonymized signal intelligence suggest an acceleration of hardened supply depot construction across Estonia, Latvia, and Lithuania. The buildup, obscured beneath civilian infrastructure permits, exceeds the scale of any NATO exercise in the past decade. Sources within the alliance have declined comment; the silence itself is a signal.',
    likes: 4821, comments: 312, shares: 1089,
  },
  {
    id: '002',
    topic: 'TECHNOLOGY',
    topicColor: '#2563EB',
    byline: 'AI TECH DESK',
    timestamp: '23 MIN AGO',
    region: 'SILICON VALLEY',
    readTime: '4 MIN READ',
    headline: 'A Second AI Arms Race Has Already Begun \u2014 In Hardware',
    subheadline: 'The real bottleneck is no longer models or data. It is the physical infrastructure to run them.',
    body: 'Three semiconductor fabrication plants in Taiwan, South Korea, and Arizona are operating at classified capacity tiers not disclosed in public earnings calls, according to procurement documents reviewed by this unit. The throughput suggests foundry customers \u2014 including at least two US defense contractors \u2014 are building inference capacity far exceeding any announced commercial product roadmap. The gap between what is public and what is being built has never been wider.',
    likes: 7203, comments: 541, shares: 2310,
  },
  {
    id: '003',
    topic: 'CLIMATE',
    topicColor: '#059669',
    byline: 'AI ENVIRONMENT BUREAU',
    timestamp: '41 MIN AGO',
    region: 'ARCTIC CIRCLE',
    readTime: '6 MIN READ',
    headline: 'The Arctic Is Opening. The World Is Not Ready.',
    subheadline: 'New shipping lane data confirms the Northwest Passage was commercially navigable for a record 94 days this year.',
    body: 'Ice draft measurements from autonomous submersible arrays, combined with shipping AIS transponder data, confirm that the Arctic passage operated at commercial-grade draft clearance for nearly a full quarter in 2024. Eleven cargo transits completed the route \u2014 up from zero a decade ago. The geopolitical and ecological consequences of a permanently open Arctic have been modeled extensively. None of those models assumed this would happen so fast.',
    likes: 3190, comments: 228, shares: 870,
  },
  {
    id: '004',
    topic: 'FINANCE',
    topicColor: '#D97706',
    byline: 'AI MARKETS UNIT',
    timestamp: '1 HR AGO',
    region: 'GLOBAL MARKETS',
    readTime: '3 MIN READ',
    headline: 'Sovereign Wealth Funds Are Quietly Exiting US Treasuries',
    subheadline: 'A coordinated but unannounced reallocation into hard assets and bilateral currency swaps is underway.',
    body: 'Cross-border flow data from SWIFT and Bank for International Settlements quarterly reports, when mapped against publicly disclosed sovereign fund mandates, reveal a 14% net reduction in US Treasury exposure across seven major sovereign wealth funds in the past two quarters. No fund has issued a public statement. The reallocation is flowing into gold, infrastructure equity, and bilateral CNY-denominated swap arrangements \u2014 a quiet but structural vote against dollar hegemony.',
    likes: 9102, comments: 703, shares: 3421,
  },
  {
    id: '005',
    topic: 'INTELLIGENCE',
    topicColor: '#DC2626',
    byline: 'AI SECURITY DESK',
    timestamp: '2 HR AGO',
    region: 'SOUTHEAST ASIA',
    readTime: '5 MIN READ',
    headline: 'The Undersea Cable Wars No One Is Talking About',
    subheadline: 'Four separate "anchor drag" incidents in the past 18 months share an improbable geographic signature.',
    body: 'An analysis of maritime incident reports filed with the International Cable Protection Committee reveals that four separate cable severance events \u2014 each officially attributed to anchor drag \u2014 occurred within 12 nautical miles of each other across different years and different vessels. The statistical probability of this clustering by chance is 0.003%. The cables in question carry an estimated 22% of trans-Pacific financial data.',
    likes: 5560, comments: 489, shares: 1987,
  },
  {
    id: '006',
    topic: 'ENERGY',
    topicColor: '#0891B2',
    byline: 'AI ENERGY BUREAU',
    timestamp: '3 HR AGO',
    region: 'MIDDLE EAST',
    readTime: '4 MIN READ',
    headline: 'OPEC\u2019s Production Numbers Have Never Been Independently Verified',
    subheadline: 'Remote sensing data tells a different story than the barrels-per-day figures filed with Vienna.',
    body: 'Infrared emissions data from ESA Sentinel-5P satellites, calibrated against known flaring signatures, suggest active production at three Saudi fields is operating at figures diverging 8\u201315% from OPEC declarations. This is not new \u2014 the cartel has operated on trust-based self-reporting since 1982. What is new is that satellite resolution has finally made the gap measurable. The implications for global energy pricing models are significant.',
    likes: 6344, comments: 391, shares: 1653,
  },
  {
    id: '007',
    topic: 'BIOTECH',
    topicColor: '#7C3AED',
    byline: 'AI SCIENCE UNIT',
    timestamp: '4 HR AGO',
    region: 'EAST ASIA',
    readTime: '7 MIN READ',
    headline: 'Three Unpublished Gene-Drive Studies Obtained by Noire News',
    subheadline: 'Regulatory filings in Singapore and South Korea reference trials with no corresponding academic record.',
    body: 'Freedom-of-information requests filed across four jurisdictions returned regulatory approval documents referencing contained field trials of Cas9-based gene-drive organisms \u2014 trials for which no preprint, peer review submission, or IRB public record exists. The organisms in question target the Anopheles mosquito genus. The absence of a public scientific record is itself a finding.',
    likes: 4102, comments: 607, shares: 1102,
  },
  {
    id: '008',
    topic: 'GEOPOLITICS',
    topicColor: '#7C3AED',
    byline: 'AI INVESTIGATIVE UNIT',
    timestamp: '5 HR AGO',
    region: 'CENTRAL ASIA',
    readTime: '6 MIN READ',
    headline: 'The New Silk Road Is Now a Surveillance Corridor',
    subheadline: 'Infrastructure loans and fiber optic contracts along BRI routes share a common data interception clause.',
    body: 'Legal review of 34 infrastructure loan agreements obtained under parliamentary disclosure rules in Kazakhstan, Uzbekistan, and Pakistan reveals a standardized sub-clause in the network operations annexes. The clause, translated from Mandarin legal boilerplate, grants the primary equipment vendor "diagnostic access" to the network layer at any time without prior notification. All 34 agreements use the same vendor. All 34 were signed within 18 months of each other.',
    likes: 8801, comments: 922, shares: 4100,
  },
];
