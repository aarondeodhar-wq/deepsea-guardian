import type { Metadata } from 'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-context';
import { AuthProvider } from '@/lib/auth-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { GuardianAI } from '@/components/guardian-ai';

export const metadata: Metadata = {
  title: 'DeepSea Guardian | Autonomous Deep Ocean Risk Prediction Platform',
  description: 'Official Deep Ocean Environmental Risk Prediction Platform using AUV drone swarms, SAR satellite radar, and hydrodynamic AI models.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-100 dark:bg-[#18202c] text-slate-900 dark:text-slate-100 font-sans antialiased flex flex-col">
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <GuardianAI />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
