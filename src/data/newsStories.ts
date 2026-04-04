export interface NewsStory {
  id: string;
  region: string;
  headline: string;
  summary: string;
  source: string;
  timestamp: string;
  category: string;
}

interface RegionDef {
  name: string;
  latRange: [number, number];
  lonRange: [number, number];
}

const REGIONS: RegionDef[] = [
  { name: "North America", latRange: [25, 70], lonRange: [-140, -60] },
  { name: "South America", latRange: [-55, 10], lonRange: [-80, -35] },
  { name: "Europe", latRange: [35, 70], lonRange: [-10, 40] },
  { name: "Africa", latRange: [-35, 35], lonRange: [-20, 50] },
  { name: "Middle East", latRange: [15, 40], lonRange: [35, 60] },
  { name: "Central Asia", latRange: [30, 55], lonRange: [50, 90] },
  { name: "East Asia", latRange: [20, 55], lonRange: [100, 145] },
  { name: "South Asia", latRange: [5, 35], lonRange: [65, 100] },
  { name: "Southeast Asia", latRange: [-10, 20], lonRange: [95, 140] },
  { name: "Oceania", latRange: [-45, -10], lonRange: [110, 180] },
];

const STORIES: Record<string, NewsStory[]> = {
  "North America": [
    { id: "na1", region: "North America", headline: "Quantum Computing Milestone Reached at MIT Laboratory", summary: "Researchers have achieved a 1,000-qubit processor capable of error correction at scale, marking a breakthrough that could accelerate drug discovery and cryptographic research within the decade.", source: "The Signal · Cambridge", timestamp: "12 min ago", category: "TECHNOLOGY" },
    { id: "na2", region: "North America", headline: "Wildfires Reshape Western Migration Patterns", summary: "A new demographic study reveals that persistent wildfire seasons are driving a measurable population shift from Pacific coastal states toward the Great Lakes region.", source: "The Signal · Denver", timestamp: "34 min ago", category: "CLIMATE" },
    { id: "na3", region: "North America", headline: "Federal Reserve Signals Extended Pause on Rate Policy", summary: "Minutes from the latest FOMC meeting suggest policymakers are weighing conflicting inflation data against softening labor market indicators.", source: "The Signal · Washington", timestamp: "1 hr ago", category: "ECONOMICS" },
  ],
  "South America": [
    { id: "sa1", region: "South America", headline: "Amazon Reforestation Initiative Exceeds First-Year Targets", summary: "A coalition of Brazilian states reports planting 40 million trees — 160% of the initial goal — using drone-seeding technology adapted from mining reclamation.", source: "The Signal · Manaus", timestamp: "22 min ago", category: "ENVIRONMENT" },
    { id: "sa2", region: "South America", headline: "Lithium Extraction Treaty Signed by Three Andean Nations", summary: "Bolivia, Chile, and Argentina have agreed on shared extraction standards and revenue-sharing frameworks for the 'lithium triangle' reserves.", source: "The Signal · Santiago", timestamp: "1 hr ago", category: "GEOPOLITICS" },
  ],
  "Europe": [
    { id: "eu1", region: "Europe", headline: "EU Parliament Passes Comprehensive AI Liability Framework", summary: "The new directive holds deployers of high-risk AI systems strictly liable for harm, establishing a precedent that is expected to influence global regulatory standards.", source: "The Signal · Brussels", timestamp: "8 min ago", category: "POLICY" },
    { id: "eu2", region: "Europe", headline: "Baltic Undersea Cable Disruption Under Investigation", summary: "Nordic intelligence agencies are examining damage to a fiber-optic cable connecting Estonia and Finland, with early assessments pointing to deliberate interference.", source: "The Signal · Helsinki", timestamp: "45 min ago", category: "SECURITY" },
  ],
  "Africa": [
    { id: "af1", region: "Africa", headline: "Kenya's Geothermal Expansion Powers East African Grid", summary: "New turbines in the Rift Valley have brought Kenya's geothermal capacity to 1.2 GW, enabling electricity exports to Uganda and Tanzania for the first time.", source: "The Signal · Nairobi", timestamp: "18 min ago", category: "ENERGY" },
    { id: "af2", region: "Africa", headline: "Sahel Conflict Zone Sees First Ceasefire in 14 Months", summary: "Mediated by the African Union, armed factions in northern Mali have agreed to a 90-day ceasefire to allow humanitarian corridor access.", source: "The Signal · Bamako", timestamp: "2 hr ago", category: "CONFLICT" },
  ],
  "Middle East": [
    { id: "me1", region: "Middle East", headline: "Desalination Breakthrough Reduces Energy Cost by 40%", summary: "A UAE-backed research consortium has demonstrated a solar-thermal membrane process that dramatically cuts the energy footprint of seawater desalination.", source: "The Signal · Abu Dhabi", timestamp: "27 min ago", category: "TECHNOLOGY" },
  ],
  "Central Asia": [
    { id: "ca1", region: "Central Asia", headline: "Kazakhstan Launches Central Asian Digital Currency Pilot", summary: "Five nations are participating in a cross-border digital payment system designed to reduce dependency on dollar-denominated trade settlement.", source: "The Signal · Astana", timestamp: "55 min ago", category: "FINANCE" },
  ],
  "East Asia": [
    { id: "ea1", region: "East Asia", headline: "Japan's Demographic AI System Predicts Municipal Collapse Timelines", summary: "A government-commissioned model identifies 340 municipalities at risk of functional dissolution by 2040 without intervention, prompting emergency consolidation talks.", source: "The Signal · Tokyo", timestamp: "15 min ago", category: "SOCIETY" },
    { id: "ea2", region: "East Asia", headline: "Taiwan Semiconductor Exports Hit Record Amid Reshoring Pressure", summary: "Despite US-led efforts to diversify chip manufacturing, TSMC's latest quarterly figures show record revenue driven by AI accelerator demand.", source: "The Signal · Taipei", timestamp: "40 min ago", category: "ECONOMICS" },
  ],
  "South Asia": [
    { id: "sa3", region: "South Asia", headline: "India's UPI Network Processes One Billion Daily Transactions", summary: "The digital payment infrastructure milestone underscores India's position as the world's largest real-time payments market, drawing integration interest from 12 countries.", source: "The Signal · Mumbai", timestamp: "30 min ago", category: "FINANCE" },
  ],
  "Southeast Asia": [
    { id: "sea1", region: "Southeast Asia", headline: "Indonesia Mangrove Carbon Credits Enter Global Market", summary: "A verified carbon offset program backed by restored mangrove forests on Borneo has issued its first tradeable credits on the Singapore exchange.", source: "The Signal · Jakarta", timestamp: "1 hr ago", category: "CLIMATE" },
  ],
  "Oceania": [
    { id: "oc1", region: "Oceania", headline: "Great Barrier Reef Coral Recovery Detected by Satellite Array", summary: "A new orbital monitoring system reveals unexpected coral regrowth across 12% of previously bleached reef sections, attributed to two consecutive mild summers.", source: "The Signal · Cairns", timestamp: "50 min ago", category: "ENVIRONMENT" },
  ],
};

/** Convert 3D sphere position to lat/lon */
export const positionToLatLon = (x: number, y: number, z: number): { lat: number; lon: number } => {
  const r = Math.sqrt(x * x + y * y + z * z);
  const lat = Math.asin(y / r) * (180 / Math.PI);
  const lon = Math.atan2(x, z) * (180 / Math.PI);
  return { lat, lon };
};

/** Find the region for a 3D position */
export const getRegionFromPosition = (x: number, y: number, z: number): string => {
  const { lat, lon } = positionToLatLon(x, y, z);
  for (const region of REGIONS) {
    if (
      lat >= region.latRange[0] && lat <= region.latRange[1] &&
      lon >= region.lonRange[0] && lon <= region.lonRange[1]
    ) {
      return region.name;
    }
  }
  // Default to nearest based on simple heuristics
  if (lat > 0 && lon < 0) return "North America";
  if (lat < 0 && lon < 0) return "South America";
  if (lat > 30 && lon > 0 && lon < 50) return "Europe";
  if (lat > 0 && lon > 60) return "East Asia";
  return "Africa";
};

/** Get a random story for a region */
export const getStoryForRegion = (region: string): NewsStory => {
  const stories = STORIES[region] || STORIES["North America"];
  return stories[Math.floor(Math.random() * stories.length)];
};
