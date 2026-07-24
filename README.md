# 🌊 DeepSea Guardian — Autonomous Deep Ocean Environmental Risk Prediction Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet GIS](https://img.shields.io/badge/Leaflet_GIS-1.9-green?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)
[![YOLOv8 AI](https://img.shields.io/badge/YOLOv8_AI-Neural_Vision-red?style=for-the-badge)](https://ultralytics.com/)

An institutional deep-ocean risk prediction and marine biodiversity conservation platform. Integrating autonomous **AUV drone swarms**, **C-band Synthetic Aperture Radar (SAR) satellites**, **sonar bathymetry**, and **hydrophone buoys** into a real-time risk intelligence dashboard.

---

## ✨ Key Features

- **🗺️ Interactive Ocean GIS Map**: Google Maps Pro satellite imagery with ESRI Satellite, CARTO Dark Ocean, and Voyager Bathymetry layers, latitude/longitude grid overlays, and click-to-inspect sector cards.
- **🤖 AUV Swarm Drone Deployment**: Autonomous subsea drone scanner launcher with 4,500m depth calibration, battery telemetry, and live PostGIS log streams.
- **👁️ AI Vision Lab & Tactical Reticle Targeter**: Real-time YOLOv8 deep neural network computer vision identifying microplastics, ghost nets, bilge oil slicks, and chemical barrels with up to 98.4% confidence.
- **📈 AI Species Extinction Predictor**: Species decimation trajectory models across 150+ hydrophone acoustic spectrograms for IUCN Red List endangered marine life (Blue Whales, Leatherback Turtles, Sperm Whales).
- **📱 Apple iOS Glassmorphism UI**: Dynamic Island subsea telemetry status bar, squircle glass cards (`backdrop-blur-3xl`), Apple spring physics (`ios-spring`), and dual Platinum Ice Day Mode / Slate Charcoal Night Mode.
- **📊 Open Datasets Download Center**: Standardized file generation for CSV, JSON, GeoJSON (PostGIS), and NOAA NetCDF formats with institutional authentication gates.
- **🚨 24/7 Emergency Helplines**: Direct integration with the Coast Guard Emergency Pollution Helpline (+1 800-424-8802) and printable formal audit certificates.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS Glassmorphism
- **Mapping & GIS**: [Leaflet.js](https://leafletjs.com/) & ESRI ArcGIS Satellite Tiles
- **Charts & Telemetry**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and [Git](https://git-scm.com/) installed on your machine.

### Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/deepsea-guardian.git
   cd deepsea-guardian
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Project Structure

```text
├── app/
│   ├── ai-detection/      # YOLOv8 AI Vision & Tactical Reticle Targeter
│   ├── alerts/            # Smart Telemetry Alert Center
│   ├── biodiversity/      # Endangered Species Bio-Acoustics
│   ├── dashboard/         # Mission Control & AUV Fleet Patrol
│   ├── datasets/          # CSV, GeoJSON & NetCDF Download Hub
│   ├── map/               # Interactive Ocean GIS Map
│   ├── predictive-map/    # 30-Day Hydrodynamic Plume Model
│   ├── reports/           # Institutional PDF/CSV Audit Generator
│   ├── login/ & signup/   # Institutional Access Portal
│   ├── layout.tsx         # Root Layout with Apple Dynamic Island & Providers
│   └── globals.css        # Apple Glassmorphism Design Tokens
├── components/            # Reusable UI & Modal Components
│   ├── gis-map.tsx        # Leaflet GIS Engine
│   ├── guardian-ai.tsx    # Guardian AI Assistant Chatbot
│   ├── navbar.tsx         # Apple iOS Header & Control Center
│   ├── drone-deployment-modal.tsx
│   └── floating-auth-modal.tsx
└── lib/                   # Datasets, Types & AI Knowledge Base
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
