'use client';

import { useTheme } from '@/lib/theme-context';

export function BackgroundCanvas() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">

      {dark ? (
        /* ══════════════════════════════════════════
           NIGHT MODE — Deep ocean dark canvas
           Rich colorful blurred orbs on navy base
        ══════════════════════════════════════════ */
        <>
          {/* Navy base */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(160deg, #030812 0%, #04101e 35%, #060c1a 65%, #030812 100%)' }} />

          {/* Teal — top-left */}
          <div className="absolute rounded-full"
            style={{ width: 700, height: 700, top: '-5%', left: '-12%', filter: 'blur(130px)', opacity: 0.35,
              background: 'radial-gradient(circle, #2dd4bf 0%, #0891b2 60%, transparent 80%)' }} />

          {/* Violet — top-right */}
          <div className="absolute rounded-full"
            style={{ width: 600, height: 600, top: '0%', right: '-8%', filter: 'blur(130px)', opacity: 0.28,
              background: 'radial-gradient(circle, #a78bfa 0%, #7c3aed 60%, transparent 80%)' }} />

          {/* Emerald — mid-left */}
          <div className="absolute rounded-full"
            style={{ width: 650, height: 650, top: '38%', left: '-10%', filter: 'blur(150px)', opacity: 0.22,
              background: 'radial-gradient(circle, #34d399 0%, #059669 60%, transparent 80%)' }} />

          {/* Amber — mid-right */}
          <div className="absolute rounded-full"
            style={{ width: 500, height: 500, top: '42%', right: '-6%', filter: 'blur(140px)', opacity: 0.22,
              background: 'radial-gradient(circle, #fbbf24 0%, #d97706 60%, transparent 80%)' }} />

          {/* Rose — bottom-center */}
          <div className="absolute rounded-full"
            style={{ width: 600, height: 600, bottom: '0%', left: '25%', filter: 'blur(140px)', opacity: 0.22,
              background: 'radial-gradient(circle, #fb7185 0%, #e11d48 60%, transparent 80%)' }} />

          {/* Cyan — bottom-right */}
          <div className="absolute rounded-full"
            style={{ width: 700, height: 700, bottom: '10%', right: '-12%', filter: 'blur(160px)', opacity: 0.18,
              background: 'radial-gradient(circle, #22d3ee 0%, #0284c7 60%, transparent 80%)' }} />

          {/* Subtle grain */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
              backgroundSize: '128px 128px' }} />
        </>
      ) : (
        /* ══════════════════════════════════════════
           DAY MODE — Airy ocean light canvas
           Pastel soft orbs on white-pearl base
        ══════════════════════════════════════════ */
        <>
          {/* Pearl-white base */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(160deg, #f0f8ff 0%, #f8fbff 30%, #eff7f6 60%, #f5f0ff 100%)' }} />

          {/* Teal — top-left (soft) */}
          <div className="absolute rounded-full"
            style={{ width: 700, height: 700, top: '-10%', left: '-14%', filter: 'blur(140px)', opacity: 0.45,
              background: 'radial-gradient(circle, #99f6e4 0%, #5eead4 50%, transparent 75%)' }} />

          {/* Violet — top-right (soft) */}
          <div className="absolute rounded-full"
            style={{ width: 600, height: 600, top: '-5%', right: '-10%', filter: 'blur(140px)', opacity: 0.38,
              background: 'radial-gradient(circle, #ddd6fe 0%, #c4b5fd 55%, transparent 75%)' }} />

          {/* Sky blue — center-top */}
          <div className="absolute rounded-full"
            style={{ width: 500, height: 500, top: '15%', left: '30%', filter: 'blur(130px)', opacity: 0.35,
              background: 'radial-gradient(circle, #bae6fd 0%, #7dd3fc 55%, transparent 75%)' }} />

          {/* Emerald — mid-left (soft) */}
          <div className="absolute rounded-full"
            style={{ width: 600, height: 600, top: '42%', left: '-12%', filter: 'blur(150px)', opacity: 0.32,
              background: 'radial-gradient(circle, #a7f3d0 0%, #6ee7b7 55%, transparent 75%)' }} />

          {/* Amber — mid-right (soft) */}
          <div className="absolute rounded-full"
            style={{ width: 500, height: 500, top: '45%', right: '-8%', filter: 'blur(140px)', opacity: 0.30,
              background: 'radial-gradient(circle, #fde68a 0%, #fcd34d 55%, transparent 75%)' }} />

          {/* Rose — bottom-center (soft) */}
          <div className="absolute rounded-full"
            style={{ width: 600, height: 600, bottom: '-5%', left: '20%', filter: 'blur(150px)', opacity: 0.28,
              background: 'radial-gradient(circle, #fecdd3 0%, #fda4af 55%, transparent 75%)' }} />

          {/* Indigo — bottom-right (soft) */}
          <div className="absolute rounded-full"
            style={{ width: 550, height: 550, bottom: '5%', right: '-10%', filter: 'blur(150px)', opacity: 0.28,
              background: 'radial-gradient(circle, #c7d2fe 0%, #a5b4fc 55%, transparent 75%)' }} />

          {/* Subtle grid pattern for premium feel */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
        </>
      )}
    </div>
  );
}
