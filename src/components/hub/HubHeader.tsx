import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CategoryTabs from './CategoryTabs';

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearch: (query: string) => void;
};

export default function HubHeader({ activeTab, onTabChange, onSearch }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        borderBottom: `1px solid rgba(168,85,247,${scrolled ? 0.30 : 0.15})`,
        padding: '14px clamp(16px, 4vw, 40px)',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Row 1: Logo + Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <p style={{
            fontFamily: "'DM Mono', monospace", fontWeight: 400,
            fontSize: '8px', letterSpacing: '0.3em',
            color: '#A1A1AA', marginBottom: '2px',
          }}>
            Global Intelligence
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 900,
              fontSize: '22px', color: '#FFFFFF', lineHeight: 1,
            }}>
              NOIRE
            </span>
            <span
              className="neon-text-glow"
              style={{
                fontFamily: "'DM Mono', monospace", fontWeight: 500,
                fontSize: '11px', letterSpacing: '0.35em', color: '#A855F7',
              }}
            >
              NEWS
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            justifyContent: 'flex-end',
          }}>
            <span className="pulse-dot" style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#A855F7', display: 'inline-block',
            }} />
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '9px',
              letterSpacing: '0.2em', color: '#A855F7',
            }}>
              Live
            </span>
          </div>
          <p style={{
            fontFamily: "'DM Mono', monospace", fontSize: '9px',
            letterSpacing: '0.12em', color: '#3D4451', marginTop: '2px',
          }}>
            {new Date().toUTCString().slice(0, 22)}
          </p>
        </div>
      </div>

      {/* Row 2: Search */}
      <SearchBar onSearch={onSearch} />

      {/* Row 3: Tabs */}
      <CategoryTabs active={activeTab} onChange={onTabChange} />
    </header>
  );
}
