import { useEffect, useState } from 'react';
import { ARTICLES } from '@/lib/articles';
import ArticleCard from './ArticleCard';

export default function FeedContainer() {
  const [isDimmed, setIsDimmed] = useState(false);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      const val = document.body.style.getPropertyValue('--active-card').trim();
      setIsDimmed(val === '1');
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Globe dim overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 5,
          background: '#000000',
          opacity: isDimmed ? 0.5 : 0,
          transition: 'opacity 650ms ease',
          pointerEvents: 'none',
        }}
      />

      {/* Scroll feed */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          pointerEvents: 'none',
          paddingTop: '18vh',
          paddingBottom: '40vh',
        }}
      >
        <div style={{ maxWidth: '740px', margin: '0 auto', padding: '0 16px' }}>
          {/* Masthead */}
          <div style={{ textAlign: 'center', marginBottom: '56px', pointerEvents: 'auto' }}>
            <div>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: '10px',
                letterSpacing: '0.25em', color: '#3D4451',
                marginBottom: '6px', textTransform: 'uppercase',
              }}>
                Global Intelligence · Live
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 900,
                fontSize: '38px', letterSpacing: '0.08em', color: '#FFFFFF',
              }}>
                NOIRE{' '}
                <span className="glow-text-purple" style={{ color: '#A855F7' }}>NEWS</span>
              </div>
            </div>
            <div style={{
              marginTop: '14px', fontFamily: "'DM Mono', monospace",
              fontSize: '9px', letterSpacing: '0.2em', color: '#3D4451',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
              <span>{new Date().toUTCString().slice(0, 16).toUpperCase()}</span>
              <span style={{ color: '#A855F7' }}>●</span>
              <span>AUTONOMOUS FEED</span>
            </div>
          </div>

          {/* Cards */}
          {ARTICLES.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} />
          ))}

          {/* Bottom fade */}
          <div className="feed-bottom-fade" style={{ height: '120px', marginTop: '-120px', position: 'relative', zIndex: 1 }} />
        </div>
      </div>
    </>
  );
}
