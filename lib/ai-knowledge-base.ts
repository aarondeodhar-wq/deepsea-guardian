export interface KnowledgeItem {
  keywords: string[];
  topic: string;
  question: string;
  answer: string;
  category: 'Greeting' | 'Getting Started' | 'AUV Swarm' | 'GIS & Map' | 'Telemetry & AI' | 'Datasets' | 'Helplines';
}

export const AI_KNOWLEDGE_BASE: KnowledgeItem[] = [
  // --- GREETINGS & BASIC CONVERSATION ---
  {
    category: 'Greeting',
    topic: 'greeting',
    question: 'Hello / Hi / Hey',
    keywords: ['hello', 'hi', 'hey', 'greetings', 'hola', 'good morning', 'good evening', 'good afternoon', 'howdy', 'yo', 'sup'],
    answer: 'Greetings! 👋 Welcome to DeepSea Guardian. I am your autonomous subsea AI assistant, trained over 150+ oceanographic telemetry datasets. How can I assist you with subsea drone deployment, GIS maps, ocean health metrics, or dataset downloads today?'
  },
  {
    category: 'Greeting',
    topic: 'identity',
    question: 'Who are you / What is your name?',
    keywords: ['who are you', 'who r u', 'what is your name', 'what is ur name', 'what are you', 'your name', 'who created you', 'who made you'],
    answer: 'I am Guardian AI — the official artificial intelligence assistant for DeepSea Guardian. I process real-time hydrophone acoustic spectrograms, SAR satellite radar imagery, YOLOv8 computer vision bounding boxes, and PostGIS ocean sector telemetry.'
  },
  {
    category: 'Greeting',
    topic: 'status',
    question: 'How are you?',
    keywords: ['how are you', 'how r u', 'how do you do', 'how is it going', 'are you online', 'are you working'],
    answer: 'I am operating at 100% telemetry efficiency! 🌊 All 14 AUV patrol drones, 10 ocean sectors, and 156 hydrophone acoustic nodes are actively broadcasting subsea risk data.'
  },
  {
    category: 'Greeting',
    topic: 'thanks',
    question: 'Thank you / Thanks',
    keywords: ['thank you', 'thanks', 'thx', 'thank u', 'thanks a lot', 'appreciate it', 'awesome', 'great', 'good job'],
    answer: 'You are very welcome! 🌊 Protecting our oceans and marine ecosystems is our highest priority. Let me know if you need anything else!'
  },
  {
    category: 'Greeting',
    topic: 'bye',
    question: 'Goodbye / Bye',
    keywords: ['bye', 'goodbye', 'see you', 'cya', 'exit', 'quit', 'close'],
    answer: 'Goodbye! May smooth waters and clear subsea telemetry follow your mission. Return anytime to monitor deep ocean health.'
  },
  {
    category: 'Greeting',
    topic: 'help',
    question: 'What can you do / Help instructions',
    keywords: ['help', 'what can you do', 'what can u do', 'what u can do', 'instructions', 'how to use', 'guide', 'features', 'commands', 'capabilities', 'what do you do'],
    answer: 'Here is what I can do for you:\n1. 🚀 **Deploy AUV Drones**: Click "Deploy AUV Swarm Drone" to run subsea scans.\n2. 🗺️ **GIS Ocean Map**: Inspect ESRI Satellite bathymetry & sector coordinates.\n3. 👁️ **AI Vision Lab**: View YOLOv8 bounding boxes for microplastics & ghost nets.\n4. 📊 **Download Datasets**: Export raw CSV, GeoJSON, or NOAA NetCDF files.\n5. 🚨 **Emergency Helplines**: Connect with the 24/7 Coast Guard Pollution Line.'
  },

  // --- PROJECT OVERVIEW & GETTING STARTED ---
  {
    category: 'Getting Started',
    topic: 'project overview',
    question: 'What is DeepSea Guardian?',
    keywords: ['what is deepsea guardian', 'what is this website', 'project overview', 'about project', 'what does this website do', 'purpose', 'tell me about this project'],
    answer: 'DeepSea Guardian is an institutional deep-ocean environmental risk prediction & biodiversity platform. It combines autonomous AUV drone swarms, synthetic aperture radar (SAR) satellites, sonar bathymetry, and hydrophone buoys into a real-time risk intelligence dashboard.'
  },
  {
    category: 'Getting Started',
    topic: 'navigation',
    question: 'How do I access all features and pages?',
    keywords: ['how to access', 'menu', 'control center', 'all pages', 'navigation', 'where is map'],
    answer: 'You can navigate anywhere using the top navigation bar, or click **"Control Center"** (or press the grid menu) to open the Apple iOS Control Center launching all 12 platform modules instantly.'
  },
  {
    category: 'Getting Started',
    topic: 'theme',
    question: 'How do I switch Day / Night mode?',
    keywords: ['day mode', 'night mode', 'dark mode', 'theme', 'switch mode', 'toggle theme', 'font visible'],
    answer: 'Click the Sun ☀️ / Moon 🌙 icon in the top right navigation bar to toggle between Platinum Ice Day Mode and Slate Charcoal Night Mode instantly.'
  },
  {
    category: 'Getting Started',
    topic: 'auth',
    question: 'How do I sign up or log in?',
    keywords: ['login', 'sign up', 'register', 'account', 'auth', 'sign in', 'account role'],
    answer: 'Click **"Log In"** or **"Sign Up"** in the top right header. A floating in-page authentication modal will open, allowing you to select your institutional role (Researcher, NGO, or Coast Guard Administrator).'
  },

  // --- AUV SWARM DRONES ---
  {
    category: 'AUV Swarm',
    topic: 'auv deployment',
    question: 'How do I deploy an AUV drone?',
    keywords: ['deploy drone', 'auv deployment', 'start scan', 'run scan', 'how to deploy', 'drone fleet', 'drone scan'],
    answer: 'To deploy an AUV drone:\n1. Click the blue **"Deploy AUV Swarm Drone"** button on Mission Control (/dashboard) or Overview (/).\n2. Select your drone unit (e.g. DeepGuardian-Alpha).\n3. Choose your target ocean sector (e.g. Sector 4 Mid-Atlantic).\n4. Click **"Execute Drone Deployment Scan"** to start live 4,500m subsea telemetry calibration.'
  },
  {
    category: 'AUV Swarm',
    topic: 'auv hardware',
    question: 'What are the specs of AUV DeepGuardian-Alpha?',
    keywords: ['auv specs', 'drone specs', 'deepguardian alpha', 'battery', 'depth rating', 'hardware'],
    answer: 'AUV DeepGuardian-Alpha specs:\n• Max Depth Rating: 4,500 meters\n• Battery Life: 72 Hours (Lithium-Sulfur Solid State)\n• Sensors: Dual-frequency Sonar, Optical Neural Bounding Cameras, Fluorometer\n• Telemetry Relay: Subsea Acoustic Modem to Satellite Buoy Array.'
  },

  // --- GIS MAP & SECTORS ---
  {
    category: 'GIS & Map',
    topic: 'gis map',
    question: 'How does the GIS Ocean Map work?',
    keywords: ['gis map', 'ocean map', 'google map', 'satellite map', 'basemap', 'layers', 'grid'],
    answer: 'The Ocean GIS Map (/map) offers Google Maps Pro satellite styling with ESRI Satellite imagery, CARTO Dark Ocean, and Voyager Bathymetry. You can toggle Lat/Lng grid lines, filter scan sensor types, search sector names, and click markers to inspect real-time sector health.'
  },
  {
    category: 'GIS & Map',
    topic: 'critical sector',
    question: 'Why is Sector 4 Mid-Atlantic Ridge at critical risk?',
    keywords: ['sector 4', 'mid-atlantic ridge', 'critical risk', 'why critical', 'dumping zone'],
    answer: 'Sector 4 (Mid-Atlantic Deep Ridge) has an Ocean Health Score of 38/100 (Critical Risk) due to a 45,000 particles/m³ polyethylene microplastic cluster and illegal toxic chemical barrel leaching detected at 3,420m depth.'
  },

  // --- TELEMETRY & AI VISION ---
  {
    category: 'Telemetry & AI',
    topic: 'yolo vision',
    question: 'What is YOLOv8 Optical Neural Detection?',
    keywords: ['yolov8', 'ai vision', 'bounding box', 'reticle', 'neural frame', 'computer vision', 'confidence'],
    answer: 'In the AI Vision Lab (/ai-detection), our YOLOv8 deep neural network analyzes subsea camera feeds in real time. It draws tactical crosshair bounding reticles around microplastic debris, ghost fishing nets, and marine species with up to 98.4% confidence.'
  },
  {
    category: 'Telemetry & AI',
    topic: 'extinction predictor',
    question: 'How does the AI Extinction Predictor work?',
    keywords: ['extinction predictor', 'decimation rate', 'endangered species', 'iucn red list', 'extinction rate', 'leatherback'],
    answer: 'The AI Extinction Predictor calculates species decimation trajectories over 150+ bio-acoustic spectrograms. For instance, Leatherback Sea Turtles currently face an 88% extinction risk with a +22.5%/decade decimation trajectory caused by plastic ingestion and ghost net entanglement.'
  },

  // --- DATASETS & REPORTS ---
  {
    category: 'Datasets',
    topic: 'dataset download',
    question: 'How do I download raw datasets in CSV or NetCDF?',
    keywords: ['download dataset', 'csv', 'json', 'geojson', 'netcdf', 'export data', 'how to download'],
    answer: 'Go to the Datasets Download Center (/datasets). Choose your export format (CSV, JSON, GeoJSON, or NOAA NetCDF) and click "Download". Note: Downloading raw datasets requires you to log in with a free institutional account.'
  },

  // --- EMERGENCY HELPLINES ---
  {
    category: 'Helplines',
    topic: 'coast guard helpline',
    question: 'What is the 24/7 Coast Guard Emergency Pollution Line?',
    keywords: ['helpline', 'coast guard', 'emergency line', 'phone number', 'contact hotline', 'report crisis'],
    answer: 'For immediate subsea crisis interventions, contact the 24/7 Coast Guard Emergency Pollution Line at **+1 (800) 424-8802** or visit our Contact & Helplines page (/contact).'
  }
];

export function searchKnowledgeBase(rawQuery: string): KnowledgeItem | null {
  // Normalize punctuation and common slang contractions
  let q = rawQuery.toLowerCase()
    .replace(/[?!.,;:]/g, '')
    .replace(/\bu\b/g, 'you')
    .replace(/\br\b/g, 'are')
    .replace(/\bur\b/g, 'your')
    .replace(/\bthx\b/g, 'thanks')
    .replace(/\bpls\b/g, 'please')
    .trim();
  
  let bestMatch: KnowledgeItem | null = null;
  let maxScore = 0;

  for (const item of AI_KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of item.keywords) {
      const normKw = keyword.toLowerCase().replace(/[?!.,;:]/g, '');
      if (q === normKw) {
        score += 15;
      } else if (q.includes(normKw)) {
        score += 6;
      } else if (normKw.includes(q) && q.length > 3) {
        score += 3;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  return maxScore > 0 ? bestMatch : null;
}
