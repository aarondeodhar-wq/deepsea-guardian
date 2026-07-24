import type { Metadata } from 'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-context';
import { AuthProvider } from '@/lib/auth-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { GuardianAI } from '@/components/guardian-ai';
import { BackgroundCanvas } from '@/components/background-canvas';

export const metadata: Metadata = {
  metadataBase: new URL('https://deepseaguardian-six.vercel.app'),
  title: {
    default: 'DeepSea Guardian | AI Ocean Risk Prediction & Subsea Telemetry Platform',
    template: '%s | DeepSea Guardian'
  },
  description: 'Official deep ocean environmental risk prediction platform utilizing autonomous AUV drone swarms, SAR satellite radar, YOLOv8 subsea neural computer vision, and hydrodynamic bathymetry telemetry.',
  keywords: [
    'DeepSea Guardian', 'Ocean Environmental Risk Prediction', 'Subsea Telemetry',
    'AUV Drone Swarm', 'SAR Satellite Radar', 'Marine Biodiversity',
    'Microplastic Detection', 'Ghost Net Removal', 'Deep Sea Mining Monitor',
    'Ocean GIS Map', 'Marine Conservation AI', 'Underwater Computer Vision'
  ],
  authors: [{ name: 'DeepSea Guardian Research Consortium', url: 'https://deepseaguardian-six.vercel.app' }],
  creator: 'DeepSea Guardian Consortium',
  publisher: 'DeepSea Guardian Global Marine Intelligence',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: 'DeepSea Guardian | Subsea Environmental Risk Prediction Platform',
    description: 'Real-time deep ocean AI risk monitoring, AUV telemetry, subsea neural reticles, and 24/7 global marine crisis response.',
    url: 'https://deepseaguardian-six.vercel.app',
    siteName: 'DeepSea Guardian',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'DeepSea Guardian Subsea GIS & Telemetry Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeepSea Guardian | AI Subsea Environmental Risk Platform',
    description: 'Autonomous AUV drone swarms and real-time deep ocean risk telemetry.',
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&h=630&q=80'],
    creator: '@DeepSeaGuardian',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              'name': 'DeepSea Guardian',
              'operatingSystem': 'Web',
              'applicationCategory': 'EnvironmentalScienceApplication',
              'url': 'https://deepseaguardian-six.vercel.app',
              'description': 'Deep ocean environmental risk prediction platform using autonomous AUV drone swarms, SAR satellite radar, and subsea neural computer vision.',
              'publisher': {
                '@type': 'Organization',
                'name': 'DeepSea Guardian Ocean Research Consortium',
                'url': 'https://deepseaguardian-six.vercel.app',
              },
            }),
          }}
        />
      </head>
      {/* overflow-x-clip prevents horizontal scroll without breaking position:sticky on children */}
      <body className="min-h-screen text-slate-900 dark:text-slate-100 font-sans antialiased flex flex-col relative overflow-x-clip">
        <AuthProvider>
          <ThemeProvider>
            {/* Theme-aware color orb canvas — what glass panels blur against */}
            <BackgroundCanvas />

            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-16 lg:pb-8">
              {children}
            </main>
            <Footer />
            <GuardianAI />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
