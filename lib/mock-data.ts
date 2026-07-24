export interface OceanSector {
  id: string;
  name: string;
  oceanBasin: 'Pacific Ocean' | 'Atlantic Ocean' | 'Indian Ocean' | 'Southern Ocean' | 'Arctic Ocean';
  lat: number;
  lng: number;
  healthScore: number;
  pollutionRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
  biodiversityStatus: string;
  primaryThreat: string;
  waterQuality: string;
  aiConfidence: number;
  depthMeters: number;
  scanType: 'SAR Satellite Radar' | 'Sonar Bathymetry' | 'Benthic ROV Visual' | 'Hydrophone Acoustic' | 'IoT Buoy Array';
}

export interface AUVDrone {
  id: string;
  name: string;
  type: 'Glider' | 'Deep-Abyssal' | 'ROV-Tethered' | 'Optical-Scanner';
  status: 'Patrolling' | 'Scanning' | 'Intervening' | 'Recharging';
  battery: number;
  depthMeters: number;
  lat: number;
  lng: number;
  lastPing: string;
  speedKnots?: number;
  temperatureCelsius?: number;
  targetSector?: string;
  scanType: string;
}

export interface AIDetection {
  id: string;
  title: string;
  category: 'Microplastics' | 'Ghost Net' | 'Oil Spill' | 'Chemical Barrel' | 'Illegal Trawling' | 'Mining Plume';
  confidence: number;
  timestamp: string;
  coordinates: [number, number];
  depth: number;
  imageUrl: string;
  details: string;
  sectorName: string;
  oceanBasin: string;
  scanType: string;
  boundingBox: string;
}

export interface MarineSpecies {
  id: string;
  name: string;
  scientificName: string;
  status: 'Critically Endangered' | 'Endangered' | 'Vulnerable' | 'Least Concern';
  observedCount: number;
  depthRange: string;
  lastDetected: string;
  imageUrl: string;
  aiAccuracy: number;
  populationTrend: 'Increasing' | 'Stable' | 'Declining';
  primaryHabitat: string;
}

export interface SmartAlert {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  title: string;
  location: string;
  timestamp: string;
  status: 'Active' | 'Investigating' | 'Resolved';
  aiConfidence: number;
  sectorId: string;
  description: string;
  recommendedAction: string;
}

export interface PredictiveRiskSector {
  sectorId: string;
  sectorName: string;
  currentRisk: 'Critical' | 'High' | 'Moderate' | 'Low';
  currentRiskScore: number;
  currentSpreadKm2: number;
  sevenDayRisk: 'Critical' | 'High' | 'Moderate' | 'Low';
  sevenDayRiskScore: number;
  sevenDaySpreadKm2: number;
  thirtyDayRisk: 'Critical' | 'High' | 'Moderate' | 'Low';
  thirtyDayRiskScore: number;
  thirtyDaySpreadKm2: number;
  primaryDrivers: string[];
  recommendedMitigation: string;
  aiConfidence: number;
}

// CORAL REEF DATA
export const coralReefData = {
  healthyCoverage: 62,
  partiallyBleached: 22,
  severelyBleached: 11,
  tempAnomalyCelsius: 1.8,
  fiveYearTrend: [
    { year: '2022', healthyPercent: 78, bleachedPercent: 12 },
    { year: '2023', healthyPercent: 74, bleachedPercent: 15 },
    { year: '2024', healthyPercent: 70, bleachedPercent: 18 },
    { year: '2025', healthyPercent: 65, bleachedPercent: 21 },
    { year: '2026', healthyPercent: 62, bleachedPercent: 22 }
  ]
};

// 12 GLOBAL OCEAN SECTORS
export const oceanSectors: OceanSector[] = [
  {
    id: 'SEC-01',
    name: 'Mariana Trench Abyss',
    oceanBasin: 'Pacific Ocean',
    lat: 15.0,
    lng: 145.0,
    healthScore: 84,
    pollutionRisk: 'Low',
    biodiversityStatus: 'Thriving Chemosynthetic Ecosystem',
    primaryThreat: 'Minor Pelagic Plastic Drift',
    waterQuality: 'Optimal (pH 8.15)',
    aiConfidence: 96,
    depthMeters: 10920,
    scanType: 'Sonar Bathymetry'
  },
  {
    id: 'SEC-02',
    name: 'North Atlantic Sargasso Sea',
    oceanBasin: 'Atlantic Ocean',
    lat: 28.5,
    lng: -68.4,
    healthScore: 62,
    pollutionRisk: 'High',
    biodiversityStatus: 'Pelagic Sargassum Habitat',
    primaryThreat: 'High Microplastic Gyre Density',
    waterQuality: 'Elevated Turbidity (pH 8.02)',
    aiConfidence: 95,
    depthMeters: 4500,
    scanType: 'SAR Satellite Radar'
  },
  {
    id: 'SEC-03',
    name: 'Coral Sea Apex Seamount',
    oceanBasin: 'Pacific Ocean',
    lat: -18.2,
    lng: 154.5,
    healthScore: 54,
    pollutionRisk: 'High',
    biodiversityStatus: 'Coral Reef Bleaching Risk',
    primaryThreat: '450m Ghost Net & Thermal Anomaly (+1.8°C)',
    waterQuality: 'Thermal Stress (SST 29.2°C)',
    aiConfidence: 98,
    depthMeters: 1200,
    scanType: 'Benthic ROV Visual'
  },
  {
    id: 'SEC-04',
    name: 'Mid-Atlantic Deep Ridge Dumping Zone',
    oceanBasin: 'Atlantic Ocean',
    lat: 10.5,
    lng: -42.1,
    healthScore: 38,
    pollutionRisk: 'Critical',
    biodiversityStatus: 'Critical Risk Level',
    primaryThreat: 'Illegal Cargo Bilge Oil Slick & Heavy Metals',
    waterQuality: 'Hazardous (DO 3.1 mg/L)',
    aiConfidence: 98,
    depthMeters: 3800,
    scanType: 'SAR Satellite Radar'
  },
  {
    id: 'SEC-05',
    name: 'Indian Ocean Chagos Trench Sanctuary',
    oceanBasin: 'Indian Ocean',
    lat: -6.2,
    lng: 72.4,
    healthScore: 91,
    pollutionRisk: 'Low',
    biodiversityStatus: 'Blue Whale & Turtle Migration Corridor',
    primaryThreat: 'Commercial Vessel Acoustic Noise',
    waterQuality: 'Pristine (DO 7.2 mg/L)',
    aiConfidence: 97,
    depthMeters: 5400,
    scanType: 'Hydrophone Acoustic'
  },
  {
    id: 'SEC-06',
    name: 'Southern Ocean Antarctic Basin',
    oceanBasin: 'Southern Ocean',
    lat: -58.5,
    lng: -64.2,
    healthScore: 78,
    pollutionRisk: 'Moderate',
    biodiversityStatus: 'Krill & Cetacean Feeding Grounds',
    primaryThreat: 'Deep Sea Mining Turbidity Plumes',
    waterQuality: 'Cold Upwelling (pH 8.10)',
    aiConfidence: 93,
    depthMeters: 4200,
    scanType: 'IoT Buoy Array'
  },
  {
    id: 'SEC-07',
    name: 'Arctic Fram Strait Gateway',
    oceanBasin: 'Arctic Ocean',
    lat: 78.2,
    lng: 0.5,
    healthScore: 71,
    pollutionRisk: 'Moderate',
    biodiversityStatus: 'Polar Marine Ecosystem',
    primaryThreat: 'Melting Ice Runoff & Black Carbon Influx',
    waterQuality: 'Low Salinity (33.2 PSU)',
    aiConfidence: 94,
    depthMeters: 2600,
    scanType: 'SAR Satellite Radar'
  },
  {
    id: 'SEC-08',
    name: 'South Pacific Kermadec Trench',
    oceanBasin: 'Pacific Ocean',
    lat: -31.4,
    lng: -177.3,
    healthScore: 88,
    pollutionRisk: 'Low',
    biodiversityStatus: 'Abyssal Amphipod Sanctuary',
    primaryThreat: 'Low Microplastic Drift',
    waterQuality: 'Optimal (DO 7.0 mg/L)',
    aiConfidence: 96,
    depthMeters: 9800,
    scanType: 'Sonar Bathymetry'
  },
  {
    id: 'SEC-09',
    name: 'Mozambique Channel Current Segment',
    oceanBasin: 'Indian Ocean',
    lat: -16.8,
    lng: 41.2,
    healthScore: 66,
    pollutionRisk: 'Moderate',
    biodiversityStatus: 'Dugong & Coelacanth Habitat',
    primaryThreat: 'Commercial Shipping Tanker Traffic',
    waterQuality: 'Moderate Clarity (pH 8.05)',
    aiConfidence: 92,
    depthMeters: 3100,
    scanType: 'IoT Buoy Array'
  },
  {
    id: 'SEC-10',
    name: 'Gulf of Mexico Deepwater Basin',
    oceanBasin: 'Atlantic Ocean',
    lat: 25.1,
    lng: -90.2,
    healthScore: 49,
    pollutionRisk: 'High',
    biodiversityStatus: 'Deep Benthic Coral Risk',
    primaryThreat: 'Hydrocarbon Leak Anomaly & Chemical Runoff',
    waterQuality: 'Depleted Oxygen (DO 4.2 mg/L)',
    aiConfidence: 97,
    depthMeters: 3400,
    scanType: 'Benthic ROV Visual'
  }
];

// 8 VERIFIED HIGH-RES OCEAN UNDERWATER IMAGES
export const marineSpecies: MarineSpecies[] = [
  {
    id: 'SPEC-01',
    name: 'Blue Whale',
    scientificName: 'Balaenoptera musculus',
    status: 'Endangered',
    observedCount: 42,
    depthRange: '0 - 500 m',
    lastDetected: '2 minutes ago',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80',
    aiAccuracy: 98,
    populationTrend: 'Increasing',
    primaryHabitat: 'Sector 5 Chagos Trench & Pelagic Corridors'
  },
  {
    id: 'SPEC-02',
    name: 'Leatherback Sea Turtle',
    scientificName: 'Dermochelys coriacea',
    status: 'Critically Endangered',
    observedCount: 18,
    depthRange: '0 - 1,280 m',
    lastDetected: '14 minutes ago',
    imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80',
    aiAccuracy: 96,
    populationTrend: 'Declining',
    primaryHabitat: 'Sector 3 Coral Sea Apex Seamount'
  },
  {
    id: 'SPEC-03',
    name: 'Giant Oceanic Manta Ray',
    scientificName: 'Mobula birostris',
    status: 'Vulnerable',
    observedCount: 65,
    depthRange: '0 - 1,000 m',
    lastDetected: '32 minutes ago',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    aiAccuracy: 95,
    populationTrend: 'Stable',
    primaryHabitat: 'Sector 1 Mariana Margin Thermal Crests'
  },
  {
    id: 'SPEC-04',
    name: 'Sperm Whale',
    scientificName: 'Physeter macrocephalus',
    status: 'Vulnerable',
    observedCount: 29,
    depthRange: '400 - 3,000 m',
    lastDetected: '1 hour ago',
    imageUrl: 'https://images.unsplash.com/photo-1568430460464-02e1dc18458c?auto=format&fit=crop&w=800&q=80',
    aiAccuracy: 97,
    populationTrend: 'Stable',
    primaryHabitat: 'Sector 4 Mid-Atlantic Deep Ridge'
  },
  {
    id: 'SPEC-05',
    name: 'Deep Sea Dumbo Octopus',
    scientificName: 'Grimpoteuthis sp.',
    status: 'Least Concern',
    observedCount: 12,
    depthRange: '3,000 - 7,000 m',
    lastDetected: '2 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=800&q=80',
    aiAccuracy: 94,
    populationTrend: 'Stable',
    primaryHabitat: 'Sector 1 Abyssal Benthic Floor'
  },
  {
    id: 'SPEC-06',
    name: 'Whale Shark',
    scientificName: 'Rhincodon typus',
    status: 'Endangered',
    observedCount: 14,
    depthRange: '0 - 1,900 m',
    lastDetected: '3 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=800&q=80',
    aiAccuracy: 98,
    populationTrend: 'Declining',
    primaryHabitat: 'Sector 5 Indian Ocean Sanctuary'
  },
  {
    id: 'SPEC-07',
    name: 'Chambered Nautilus',
    scientificName: 'Nautilus pompilius',
    status: 'Vulnerable',
    observedCount: 88,
    depthRange: '100 - 700 m',
    lastDetected: '4 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80',
    aiAccuracy: 93,
    populationTrend: 'Declining',
    primaryHabitat: 'Sector 3 Coral Slope Reefs'
  },
  {
    id: 'SPEC-08',
    name: 'Deep Sea Dragonfish',
    scientificName: 'Stomiidae family',
    status: 'Least Concern',
    observedCount: 140,
    depthRange: '1,000 - 5,000 m',
    lastDetected: '5 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    aiAccuracy: 91,
    populationTrend: 'Stable',
    primaryHabitat: 'Sector 6 Antarctic Basin Vents'
  }
];

// 12 AI DETECTIONS & SCANS
export const aiDetections: AIDetection[] = [
  {
    id: 'DET-901',
    title: 'High-Density Polyethylene Microplastic Cluster',
    category: 'Microplastics',
    confidence: 96.8,
    timestamp: 'Today, 14:32 UTC',
    coordinates: [28.52, -68.45],
    depth: 3420,
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80',
    details: '45,000 particles/m³ polyethylene breakdown cluster drifting in Sargasso Sea Gyre.',
    sectorName: 'Sector 2 - North Atlantic Sargasso Sea',
    oceanBasin: 'Atlantic Ocean',
    scanType: 'Optical AUV Camera',
    boundingBox: '[X: 142, Y: 88, W: 320, H: 240]'
  },
  {
    id: 'DET-902',
    title: 'Abandoned Commercial Ghost Net (450m)',
    category: 'Ghost Net',
    confidence: 98.4,
    timestamp: 'Today, 12:15 UTC',
    coordinates: [-18.21, 154.52],
    depth: 850,
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80',
    details: 'Heavy nylon monofilament gillnet drifting in pelagic migratory path of endangered turtles.',
    sectorName: 'Sector 3 - Coral Sea Apex Seamount',
    oceanBasin: 'Pacific Ocean',
    scanType: 'Benthic ROV Visual',
    boundingBox: '[X: 54, Y: 110, W: 450, H: 180]'
  },
  {
    id: 'DET-903',
    title: 'Illegal Bilge Oil Discharge (4.2 km²)',
    category: 'Oil Spill',
    confidence: 97.2,
    timestamp: 'Today, 08:44 UTC',
    coordinates: [10.55, -42.12],
    depth: 0,
    imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
    details: 'Synthetic Aperture Radar (SAR) echo confirmed fuel hydrocarbon slick from unregistered vessel.',
    sectorName: 'Sector 4 - Mid-Atlantic Deep Ridge',
    oceanBasin: 'Atlantic Ocean',
    scanType: 'SAR Satellite Radar',
    boundingBox: '[X: 12, Y: 40, W: 610, H: 520]'
  },
  {
    id: 'DET-904',
    title: 'Sunken Corrosion Chemical Barrels (x14)',
    category: 'Chemical Barrel',
    confidence: 94.1,
    timestamp: 'Yesterday, 22:10 UTC',
    coordinates: [15.02, 145.18],
    depth: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    details: 'Submersed industrial chemical containers leaking heavy metals into benthic boundary layer.',
    sectorName: 'Sector 1 - Mariana Trench Abyss',
    oceanBasin: 'Pacific Ocean',
    scanType: 'Sonar Bathymetry',
    boundingBox: '[X: 210, Y: 180, W: 190, H: 160]'
  },
  {
    id: 'DET-905',
    title: 'Deep Sea Mining Sediment Turbidity Plume',
    category: 'Mining Plume',
    confidence: 93.8,
    timestamp: 'Today, 06:18 UTC',
    coordinates: [-58.42, -64.14],
    depth: 3900,
    imageUrl: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=800&q=80',
    details: 'Extensive mineral plume choking benthic vent communities in Antarctic Basin.',
    sectorName: 'Sector 6 - Southern Ocean Antarctic Basin',
    oceanBasin: 'Southern Ocean',
    scanType: 'IoT Buoy Array',
    boundingBox: '[X: 80, Y: 150, W: 500, H: 380]'
  },
  {
    id: 'DET-906',
    title: 'Illegal Bottom Trawling Seabed Scars',
    category: 'Illegal Trawling',
    confidence: 95.7,
    timestamp: 'Yesterday, 18:40 UTC',
    coordinates: [-6.18, 72.38],
    depth: 920,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80',
    details: 'Deep sea trawl door gouges destroying cold-water coral gardens across 3.8 km of seabed.',
    sectorName: 'Sector 5 - Indian Ocean Chagos Trench',
    oceanBasin: 'Indian Ocean',
    scanType: 'Hydrophone Acoustic',
    boundingBox: '[X: 190, Y: 60, W: 420, H: 290]'
  }
];

// AUV FLEET SPREAD GLOBALLY IN OCEAN BASINS
export const droneFleet: AUVDrone[] = [
  {
    id: 'AUV-01',
    name: 'DeepGuardian-Alpha',
    type: 'Deep-Abyssal',
    status: 'Patrolling',
    battery: 88,
    depthMeters: 3420,
    lat: 10.55,
    lng: -42.12,
    lastPing: '30s ago',
    speedKnots: 4.2,
    temperatureCelsius: 14.1,
    targetSector: 'SEC-04',
    scanType: 'Sonar Bathymetry'
  },
  {
    id: 'AUV-02',
    name: 'Seamount-Sentinel',
    type: 'Optical-Scanner',
    status: 'Scanning',
    battery: 74,
    depthMeters: 850,
    lat: -18.21,
    lng: 154.52,
    lastPing: '1m ago',
    speedKnots: 3.8,
    temperatureCelsius: 16.5,
    targetSector: 'SEC-03',
    scanType: 'Benthic ROV Visual'
  },
  {
    id: 'AUV-03',
    name: 'Abyss-Explorer-ROV',
    type: 'ROV-Tethered',
    status: 'Intervening',
    battery: 95,
    depthMeters: 1200,
    lat: 28.52,
    lng: -68.45,
    lastPing: '10s ago',
    speedKnots: 1.5,
    temperatureCelsius: 12.4,
    targetSector: 'SEC-02',
    scanType: 'Optical Camera'
  },
  {
    id: 'AUV-04',
    name: 'Pelagic-Glider-09',
    type: 'Glider',
    status: 'Patrolling',
    battery: 62,
    depthMeters: 450,
    lat: -6.2,
    lng: 72.4,
    lastPing: '4m ago',
    speedKnots: 2.4,
    temperatureCelsius: 18.2,
    targetSector: 'SEC-05',
    scanType: 'Hydrophone Acoustic'
  }
];

// Smart Alerts
export const smartAlerts: SmartAlert[] = [
  {
    id: 'ALT-1001',
    severity: 'Critical',
    title: 'Unregistered Bilge Oil Spill Discharged in Atlantic Sector 4',
    location: '10.55°N, 42.12°W • Mid-Atlantic Ridge',
    timestamp: '12 mins ago',
    status: 'Active',
    aiConfidence: 98,
    sectorId: 'SEC-04',
    description: '4.2 km² hydrocarbon oil slick detected by SAR satellite. Rapid surface spread toward Atlantic pelagic sanctuary.',
    recommendedAction: 'Dispatch AUV DeepGuardian-Alpha for water sampling & alert Coast Guard Maritime Enforcement.'
  },
  {
    id: 'ALT-1002',
    severity: 'High',
    title: '450m Ghost Fishing Net Entangled in Coral Sea Corridor',
    location: '18.21°S, 154.52°E • Coral Sea Apex',
    timestamp: '45 mins ago',
    status: 'Active',
    aiConfidence: 98,
    sectorId: 'SEC-03',
    description: 'Drift net entangled at 850m depth posing immediate drowning risk to migrating Leatherback Turtles.',
    recommendedAction: 'Deploy ROV Abyss-Explorer for robotic cutter net removal.'
  },
  {
    id: 'ALT-1003',
    severity: 'Medium',
    title: 'Thermal Bleaching Anomaly Warning (+1.8°C)',
    location: '18.20°S, 154.50°E • Coral Sea Reef Crest',
    timestamp: '2 hours ago',
    status: 'Investigating',
    aiConfidence: 95,
    sectorId: 'SEC-03',
    description: 'Sea surface temperature exceeded 29.2°C threshold for 72 consecutive hours.',
    recommendedAction: 'Deploy autonomous surface shading screens and micro-bubble aeration units.'
  }
];

// Predictive Risk Dataset
export const predictiveRiskData: PredictiveRiskSector[] = [
  {
    sectorId: 'SEC-04',
    sectorName: 'Sector 4 - Mid-Atlantic Deep Ridge',
    currentRisk: 'Critical',
    currentRiskScore: 88,
    currentSpreadKm2: 14.5,
    sevenDayRisk: 'Critical',
    sevenDayRiskScore: 92,
    sevenDaySpreadKm2: 42.0,
    thirtyDayRisk: 'Critical',
    thirtyDayRiskScore: 97,
    thirtyDaySpreadKm2: 142.0,
    primaryDrivers: [
      'Seasonal Atlantic Gyre Current Vectors (0.82 m/s SW)',
      'Uncontrolled Illegal Cargo Vessel Discharge',
      'Low Dissolved Oxygen Trends (3.1 mg/L)'
    ],
    recommendedMitigation: 'Deploy autonomous containment boom & dispatch AUV fleet for robotic trash retrieval before plume intersects Marine Sanctuary.',
    aiConfidence: 96
  },
  {
    sectorId: 'SEC-03',
    sectorName: 'Sector 3 - Coral Sea Apex Seamount',
    currentRisk: 'High',
    currentRiskScore: 74,
    currentSpreadKm2: 8.2,
    sevenDayRisk: 'High',
    sevenDayRiskScore: 81,
    sevenDaySpreadKm2: 24.5,
    thirtyDayRisk: 'Critical',
    thirtyDayRiskScore: 89,
    thirtyDaySpreadKm2: 68.0,
    primaryDrivers: [
      'SST Thermal Stress (+1.8°C Anomaly)',
      'Ghost Net Entanglement Drift',
      'Reduced Coral Reef Fluorescence'
    ],
    recommendedMitigation: 'Cut ghost net with ROV and deploy thermal shading micro-aerators over coral crest.',
    aiConfidence: 94
  }
];

// System Overview Composite Metrics
export const systemOverview = {
  oceanHealthScore: 78,
  biodiversityHealth: 92,
  threatsDetectedToday: 14,
  activeMonitoredKm2: 420000,
  speciesObservedToday: 1420,
  activeDronesCount: 14,
  waterQualityMetrics: {
    ph: { value: 8.1, status: 'Optimal' },
    temperatureCelsius: { value: 14.2, status: '+0.4°C Anomaly' },
    salinityPsu: { value: 35.1, status: 'Normal' },
    dissolvedOxygenMgL: { value: 6.8, status: 'Healthy' },
    turbidityNtu: { value: 1.2, status: 'Clear' }
  }
};

export const exportDatasetAsFile = (datasetType: string, format: 'CSV' | 'JSON' | 'GeoJSON') => {
  let content = '';
  let filename = `DeepSea_Guardian_${datasetType}_${Date.now()}`;
  let mimeType = 'text/csv';

  if (format === 'CSV') {
    content = `ID,Title,Category,Confidence,Depth,Coordinates,OceanBasin,ScanType\n` +
      aiDetections.map(d => `"${d.id}","${d.title}","${d.category}",${d.confidence},${d.depth},"${d.coordinates.join(',')}", "${d.oceanBasin}", "${d.scanType}"`).join('\n');
    filename += '.csv';
    mimeType = 'text/csv';
  } else if (format === 'JSON') {
    content = JSON.stringify(aiDetections, null, 2);
    filename += '.json';
    mimeType = 'application/json';
  } else {
    const geojson = {
      type: 'FeatureCollection',
      features: aiDetections.map(d => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [d.coordinates[1], d.coordinates[0]] },
        properties: { id: d.id, title: d.title, category: d.category, confidence: d.confidence, depth: d.depth, basin: d.oceanBasin }
      }))
    };
    content = JSON.stringify(geojson, null, 2);
    filename += '.geojson';
    mimeType = 'application/geo+json';
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
