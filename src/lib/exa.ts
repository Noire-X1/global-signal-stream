/**
 * NOIRE NEWS — Article types and static data for the Hub.
 * In a future batch this will be wired to the Exa API.
 */

export type NoireArticle = {
  id: string;
  url: string;
  title: string;
  author: string | null;
  publishedDate: string | null;
  source: string;
  topic: string;
  topicColor: string;
  imageUrl: string;
  highlight: string;
  summary: string;
  score: number;
};

export const TOPIC_QUERIES: Record<string, string> = {
  All: 'breaking world news today',
  Politics: 'global politics government policy',
  Sports: 'major sports results championship',
  Technology: 'artificial intelligence tech breakthrough',
  Environment: 'climate change environment crisis',
  Crypto: 'cryptocurrency bitcoin blockchain markets',
  Business: 'global economy markets finance',
};

export const TOPIC_COLORS: Record<string, string> = {
  All: '#A855F7',
  Politics: '#DC2626',
  Sports: '#2563EB',
  Technology: '#7C3AED',
  Environment: '#059669',
  Crypto: '#D97706',
  Business: '#0891B2',
};

const STATIC_ARTICLES: NoireArticle[] = [
  {
    id: 'hub-001',
    url: '#',
    title: 'The Silent Repositioning of NATO\'s Eastern Flank',
    author: 'AI Investigative Unit',
    publishedDate: '2025-06-28',
    source: 'noire.news',
    topic: 'Politics',
    topicColor: '#DC2626',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80',
    highlight: 'Satellite telemetry and intercepted logistics data reveal a coordinated infrastructure buildup across three Baltic states.',
    summary: 'Cross-referenced satellite imagery suggests an acceleration of hardened supply depot construction across Estonia, Latvia, and Lithuania.',
    score: 0.98,
  },
  {
    id: 'hub-002',
    url: '#',
    title: 'A Second AI Arms Race Has Already Begun — In Hardware',
    author: 'AI Tech Desk',
    publishedDate: '2025-06-27',
    source: 'noire.news',
    topic: 'Technology',
    topicColor: '#7C3AED',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    highlight: 'The real bottleneck is no longer models or data. It is the physical infrastructure to run them.',
    summary: 'Three semiconductor fabrication plants are operating at classified capacity tiers not disclosed in public earnings calls.',
    score: 0.96,
  },
  {
    id: 'hub-003',
    url: '#',
    title: 'The Arctic Is Opening. The World Is Not Ready.',
    author: 'AI Environment Bureau',
    publishedDate: '2025-06-26',
    source: 'noire.news',
    topic: 'Environment',
    topicColor: '#059669',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
    highlight: 'New shipping lane data confirms the Northwest Passage was commercially navigable for a record 94 days this year.',
    summary: 'Ice draft measurements confirm the Arctic passage operated at commercial-grade draft clearance for nearly a full quarter.',
    score: 0.94,
  },
  {
    id: 'hub-004',
    url: '#',
    title: 'Sovereign Wealth Funds Are Quietly Exiting US Treasuries',
    author: 'AI Markets Unit',
    publishedDate: '2025-06-25',
    source: 'noire.news',
    topic: 'Business',
    topicColor: '#0891B2',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    highlight: 'A coordinated but unannounced reallocation into hard assets and bilateral currency swaps is underway.',
    summary: 'Cross-border flow data reveal a 14% net reduction in US Treasury exposure across seven major sovereign wealth funds.',
    score: 0.92,
  },
  {
    id: 'hub-005',
    url: '#',
    title: 'The Undersea Cable Wars No One Is Talking About',
    author: 'AI Security Desk',
    publishedDate: '2025-06-24',
    source: 'noire.news',
    topic: 'Politics',
    topicColor: '#DC2626',
    imageUrl: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=1200&q=80',
    highlight: 'Four separate "anchor drag" incidents share an improbable geographic signature.',
    summary: 'The statistical probability of this clustering by chance is 0.003%. The cables carry 22% of trans-Pacific financial data.',
    score: 0.90,
  },
  {
    id: 'hub-006',
    url: '#',
    title: 'OPEC\'s Production Numbers Have Never Been Independently Verified',
    author: 'AI Energy Bureau',
    publishedDate: '2025-06-23',
    source: 'noire.news',
    topic: 'Business',
    topicColor: '#0891B2',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
    highlight: 'Remote sensing data tells a different story than the barrels-per-day figures filed with Vienna.',
    summary: 'Infrared emissions data suggest active production diverges 8–15% from OPEC declarations.',
    score: 0.88,
  },
  {
    id: 'hub-007',
    url: '#',
    title: 'Three Unpublished Gene-Drive Studies Obtained by Noire News',
    author: 'AI Science Unit',
    publishedDate: '2025-06-22',
    source: 'noire.news',
    topic: 'Technology',
    topicColor: '#7C3AED',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    highlight: 'Regulatory filings reference trials with no corresponding academic record.',
    summary: 'The absence of a public scientific record is itself a finding.',
    score: 0.86,
  },
  {
    id: 'hub-008',
    url: '#',
    title: 'The New Silk Road Is Now a Surveillance Corridor',
    author: 'AI Investigative Unit',
    publishedDate: '2025-06-21',
    source: 'noire.news',
    topic: 'Politics',
    topicColor: '#DC2626',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=80',
    highlight: 'Infrastructure loans along BRI routes share a common data interception clause.',
    summary: 'All 34 agreements use the same vendor. All 34 were signed within 18 months of each other.',
    score: 0.84,
  },
  {
    id: 'hub-009',
    url: '#',
    title: 'Bitcoin Miners Are Quietly Becoming Grid Operators',
    author: 'AI Markets Unit',
    publishedDate: '2025-06-20',
    source: 'noire.news',
    topic: 'Crypto',
    topicColor: '#D97706',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80',
    highlight: 'Three mining operations in Texas now hold grid-balancing contracts with ERCOT.',
    summary: 'The convergence of mining infrastructure and grid stability is reshaping energy policy.',
    score: 0.82,
  },
  {
    id: 'hub-010',
    url: '#',
    title: 'The Quiet Revolution in Satellite-Based Crop Insurance',
    author: 'AI Environment Bureau',
    publishedDate: '2025-06-19',
    source: 'noire.news',
    topic: 'Environment',
    topicColor: '#059669',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80',
    highlight: 'Parametric insurance payouts triggered by satellite NDVI data now cover 12 million hectares in sub-Saharan Africa.',
    summary: 'The model eliminates claims adjusters entirely — payouts are algorithmic.',
    score: 0.80,
  },
  {
    id: 'hub-011',
    url: '#',
    title: 'The Premier League\'s Financial Fair Play Is Anything But',
    author: 'AI Sports Desk',
    publishedDate: '2025-06-18',
    source: 'noire.news',
    topic: 'Sports',
    topicColor: '#2563EB',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80',
    highlight: 'Leaked audit trails reveal creative accounting structures at five top-flight clubs.',
    summary: 'The gap between regulatory intent and enforcement has never been wider in European football.',
    score: 0.78,
  },
  {
    id: 'hub-012',
    url: '#',
    title: 'Central Bank Digital Currencies Are Coming — Whether You\'re Ready or Not',
    author: 'AI Markets Unit',
    publishedDate: '2025-06-17',
    source: 'noire.news',
    topic: 'Crypto',
    topicColor: '#D97706',
    imageUrl: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1200&q=80',
    highlight: '87 countries are now in active CBDC development — 11 have fully launched.',
    summary: 'The privacy implications of programmable sovereign money remain largely undebated.',
    score: 0.76,
  },
  {
    id: 'hub-013',
    url: '#',
    title: 'The Return of Industrial Policy to the West',
    author: 'AI Investigative Unit',
    publishedDate: '2025-06-16',
    source: 'noire.news',
    topic: 'Business',
    topicColor: '#0891B2',
    imageUrl: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=1200&q=80',
    highlight: 'Subsidies, tariffs, and domestic content requirements are back — and both sides of the aisle agree.',
    summary: 'The post-neoliberal consensus is forming faster than most economists predicted.',
    score: 0.74,
  },
];

export async function fetchNoireArticles(
  topic: string = 'All',
  count: number = 13,
): Promise<NoireArticle[]> {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

  let filtered = topic === 'All'
    ? STATIC_ARTICLES
    : STATIC_ARTICLES.filter(a => a.topic === topic);

  // For search queries that don't match a topic, do keyword filtering
  if (filtered.length === 0 && !TOPIC_COLORS[topic]) {
    const q = topic.toLowerCase();
    filtered = STATIC_ARTICLES.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.highlight.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q)
    );
  }

  return filtered.slice(0, count);
}
