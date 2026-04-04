type Beat = { id: number; label: string; img: string; live: boolean };

const BEATS: Beat[] = [
  { id: 1, label: 'WASHINGTON', img: 'https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=120&q=80', live: true },
  { id: 2, label: 'MOSCOW', img: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=120&q=80', live: true },
  { id: 3, label: 'BEIJING', img: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=120&q=80', live: false },
  { id: 4, label: 'MARKETS', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&q=80', live: true },
  { id: 5, label: 'TECH', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&q=80', live: false },
  { id: 6, label: 'CLIMATE', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=120&q=80', live: true },
  { id: 7, label: 'SPACE', img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=120&q=80', live: false },
  { id: 8, label: 'CONFLICT', img: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=120&q=80', live: true },
  { id: 9, label: 'CRYPTO', img: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=120&q=80', live: false },
  { id: 10, label: 'HEALTH', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=120&q=80', live: false },
];

export default function LiveBeatsBar() {
  return (
    <div style={{ padding: '20px 0', borderBottom: '1px solid rgba(168,85,247,0.12)' }}>
      <p style={{
        fontFamily: "'DM Mono', monospace", fontSize: '9px',
        letterSpacing: '0.25em', color: '#A855F7',
        textTransform: 'uppercase' as const, marginBottom: '14px',
      }}>
        ◆ Live Beats
      </p>

      <div style={{
        display: 'flex', gap: '16px', overflowX: 'auto',
        scrollbarWidth: 'none', paddingBottom: '4px',
      }}>
        {BEATS.map(beat => (
          <div key={beat.id} style={{
            display: 'flex', flexDirection: 'column' as const,
            alignItems: 'center', gap: '8px', flexShrink: 0,
            cursor: 'pointer',
          }}>
            <div style={{ position: 'relative' }}>
              <div className="story-ring" style={{
                width: '68px', height: '68px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src={beat.img}
                  alt={beat.label}
                  style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    objectFit: 'cover',
                    filter: 'brightness(0.8) saturate(0.9)',
                  }}
                />
              </div>
              {beat.live && (
                <span className="pulse-dot" style={{
                  position: 'absolute', top: '2px', right: '2px',
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: '#DC2626',
                  border: '2px solid #050505',
                }} />
              )}
            </div>
            <span style={{
              fontFamily: "'DM Mono', monospace", fontSize: '8px',
              letterSpacing: '0.18em', color: '#A1A1AA',
              textAlign: 'center' as const, maxWidth: '68px',
            }}>
              {beat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
