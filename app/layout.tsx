import type { Metadata } from 'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-context';
import { AuthProvider } from '@/lib/auth-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { GuardianAI } from '@/components/guardian-ai';

export const metadata: Metadata = {
  title: 'DeepSea Guardian | Subsea Environmental Risk Prediction Platform',
  description: 'Deep ocean environmental risk prediction platform using AUV drone swarms, SAR satellite radar, and hydrodynamic prediction models.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className="min-h-screen text-slate-900 dark:text-slate-100 font-sans antialiased flex flex-col overflow-x-hidden relative">

        {/* ── FIXED GLASSMORPHISM BACKGROUND CANVAS ── */}
        {/* This is what all glass panels blur against */}
        <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
          {/* Base deep ocean */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #030812 0%, #04101e 35%, #060c1a 65%, #030812 100%)' }} />

          {/* Floating color orbs — give glass panels something beautiful to blur */}
          {/* Teal orb — top left */}
          <div className="absolute rounded-full blur-[120px] opacity-30"
            style={{ width: 600, height: 600, top: '5%', left: '-10%',
              background: 'radial-gradient(circle, #2dd4bf 0%, #0891b2 50%, transparent 70%)' }} />

          {/* Violet orb — top right */}
          <div className="absolute rounded-full blur-[120px] opacity-25"
            style={{ width: 500, height: 500, top: '10%', right: '-5%',
              background: 'radial-gradient(circle, #a78bfa 0%, #7c3aed 50%, transparent 70%)' }} />

          {/* Emerald orb — middle left */}
          <div className="absolute rounded-full blur-[140px] opacity-20"
            style={{ width: 550, height: 550, top: '40%', left: '-8%',
              background: 'radial-gradient(circle, #34d399 0%, #059669 50%, transparent 70%)' }} />

          {/* Amber orb — middle right */}
          <div className="absolute rounded-full blur-[140px] opacity-20"
            style={{ width: 450, height: 450, top: '45%', right: '-5%',
              background: 'radial-gradient(circle, #fbbf24 0%, #d97706 50%, transparent 70%)' }} />

          {/* Rose orb — bottom center */}
          <div className="absolute rounded-full blur-[130px] opacity-20"
            style={{ width: 500, height: 500, bottom: '5%', left: '30%',
              background: 'radial-gradient(circle, #fb7185 0%, #e11d48 50%, transparent 70%)' }} />

          {/* Cyan orb — bottom right */}
          <div className="absolute rounded-full blur-[150px] opacity-15"
            style={{ width: 600, height: 600, bottom: '20%', right: '-10%',
              background: 'radial-gradient(circle, #22d3ee 0%, #0284c7 50%, transparent 70%)' }} />

          {/* Subtle noise/grain overlay for depth */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
        </div>

        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-28 lg:pb-8">
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
