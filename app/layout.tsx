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
  title: 'DeepSea Guardian | Subsea Environmental Risk Prediction Platform',
  description: 'Deep ocean environmental risk prediction platform using AUV drone swarms, SAR satellite radar, and hydrodynamic prediction models.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      {/* overflow-x-clip prevents horizontal scroll without breaking position:sticky on children */}
      <body className="min-h-screen text-slate-900 dark:text-slate-100 font-sans antialiased flex flex-col relative overflow-x-clip">
        <AuthProvider>
          <ThemeProvider>
            {/* Theme-aware color orb canvas — what glass panels blur against */}
            <BackgroundCanvas />

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
