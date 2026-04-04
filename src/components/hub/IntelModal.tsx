import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchBrief, type BriefData } from '@/lib/exa-client';
import type { NoireArticle } from '@/lib/exa';
import TopicTag from './TopicTag';

type Props = {
  article: NoireArticle | null;
  onClose: () => void;
};

const MODAL_GLOW = `
  0 0 0 1px rgba(168,85,247,0.20),
  0 0 40px rgba(168,85,247,0.22),
  0 0 90px rgba(168,85,247,0.10),
  0 32px 80px rgba(0,0,0,0.8)
`;

export default function IntelModal({ article, onClose }: Props) {
  const [brief, setBrief] = useState<BriefData | null>(null);
  const [loading, setLoading] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);

  useEffect(() => {
    if (!article) { setBrief(null); return; }
    setLoading(true);
    setBrief(null);
    fetchBrief(article.url).then(data => {
      setBrief(data);
      setLoading(false);
    });
  }, [article?.url]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    if (article) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [article]);

  const highlights = brief?.highlights?.length
    ? brief.highlights
    : article?.highlights?.length
      ? article.highlights
      : article?.highlight ? [article.highlight] : [];

  const summary = brief?.summary || article?.summary || '';

  return (
    <AnimatePresence>
      {article && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.8 }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed', inset: 0, zIndex: 101,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              width: 'min(720px, 95vw)',
              maxHeight: '88vh',
              overflowY: 'auto',
              background: 'rgba(5,5,5,0.96)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(168,85,247,0.35)',
              borderRadius: '4px',
              boxShadow: MODAL_GLOW,
              position: 'relative',
              pointerEvents: 'auto',
            }}>
              {/* Scanning line */}
              {loading && (
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', borderRadius: '4px' }}>
                  <div className="intel-scan-line" style={{
                    position: 'absolute', width: '100%', height: '2px',
                    background: 'linear-gradient(90deg, transparent, #A855F7, transparent)',
                  }} />
                </div>
              )}

              <div style={{ padding: 'clamp(20px, 5vw, 36px)' }}>
                {/* Close button */}
                <button
                  onClick={onClose}
                  style={{
                    position: 'absolute', top: '14px', right: '14px',
                    width: '32px', height: '32px', borderRadius: '50%',
                    border: '1px solid rgba(168,85,247,0.3)',
                    background: 'rgba(168,85,247,0.10)',
                    color: '#A855F7', fontSize: '18px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(168,85,247,0.22)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(168,85,247,0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(168,85,247,0.10)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ×
                </button>

                {/* Header */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <TopicTag label={article.topic} color={article.topicColor} />
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: '9px',
                      letterSpacing: '0.15em', color: '#3D4451',
                    }}>
                      {article.source}
                      {article.publishedDate && ` · ${new Date(article.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`}
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: "'Playfair Display', serif", fontWeight: 900,
                    fontSize: '26px', lineHeight: 1.2, color: '#FFFFFF',
                    letterSpacing: '-0.01em', marginBottom: '10px',
                  }}>
                    {brief?.title || article.title}
                  </h2>

                  <p style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '9px',
                    letterSpacing: '0.2em', color: '#A855F7', marginBottom: '16px',
                  }}>
                    ◆ {(brief?.author || article.author) ?? 'AI INVESTIGATIVE UNIT'} · AI INTELLIGENCE UNIT
                  </p>

                  <div style={{ height: '1px', background: 'rgba(168,85,247,0.2)' }} />
                </div>

                {/* Executive Brief */}
                {loading ? (
                  <SkeletonSummary />
                ) : summary ? (
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{
                      fontFamily: "'DM Mono', monospace", fontSize: '8px',
                      letterSpacing: '0.3em', color: '#A855F7',
                      textTransform: 'uppercase', marginBottom: '10px',
                    }}>
                      Executive Brief
                    </p>
                    <div style={{
                      background: 'rgba(168,85,247,0.06)',
                      borderLeft: '3px solid #A855F7',
                      padding: '16px 20px',
                      borderRadius: '0 3px 3px 0',
                    }}>
                      <p style={{
                        fontFamily: "'Lora', serif", fontStyle: 'italic',
                        fontSize: '15px', lineHeight: 1.8, color: '#D8B4FE',
                      }}>
                        {summary}
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* Highlights */}
                <div style={{ marginBottom: '28px' }}>
                  <p style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '8px',
                    letterSpacing: '0.3em', color: '#A855F7',
                    textTransform: 'uppercase', marginBottom: '14px',
                  }}>
                    Intelligence Highlights
                  </p>

                  {loading ? (
                    <SkeletonHighlights />
                  ) : (
                    <div style={{ display: 'grid', gap: '20px' }}>
                      {highlights.length > 0
                        ? highlights.map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                          >
                            <span style={{
                              fontFamily: "'DM Mono', monospace", fontSize: '9px',
                              color: '#3D4451', flexShrink: 0, paddingTop: '2px',
                            }}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <div style={{ width: '1px', minHeight: '100%', background: '#A855F7', flexShrink: 0 }} />
                            <p style={{
                              fontFamily: "'Lora', serif", fontSize: '14px',
                              lineHeight: 1.75, color: '#F0EDE8',
                            }}>
                              {h}
                            </p>
                          </motion.div>
                        ))
                        : (
                          <p style={{
                            fontFamily: "'DM Mono', monospace", fontSize: '10px',
                            letterSpacing: '0.2em', color: '#3D4451', textAlign: 'center',
                            padding: '20px',
                          }}>
                            NO HIGHLIGHTS EXTRACTED — VIEW FULL REPORT
                          </p>
                        )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoverBtn(true)}
                    onMouseLeave={() => setHoverBtn(false)}
                    style={{
                      display: 'block', width: '100%', padding: '14px',
                      textAlign: 'center',
                      border: `1px solid rgba(168,85,247,${hoverBtn ? 0.7 : 0.35})`,
                      borderRadius: '2px',
                      background: hoverBtn ? 'rgba(168,85,247,0.12)' : 'transparent',
                      boxShadow: hoverBtn ? '0 0 20px rgba(168,85,247,0.25)' : 'none',
                      color: hoverBtn ? '#FFFFFF' : '#A855F7',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '10px', letterSpacing: '0.32em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      transition: 'all 0.22s ease',
                      marginBottom: '16px',
                    }}
                  >
                    Read Full Report →
                  </a>
                  <p style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '8px',
                    letterSpacing: '0.25em', color: '#3D4451',
                    textAlign: 'center', textTransform: 'uppercase',
                  }}>
                    Powered by Exa Intelligence Engine
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SkeletonSummary() {
  return (
    <div style={{ marginBottom: '24px' }}>
      {[100, 88, 72].map((w, i) => (
        <div key={i} className="shimmer" style={{
          height: '14px', width: `${w}%`, borderRadius: '2px', marginBottom: '8px',
        }} />
      ))}
    </div>
  );
}

function SkeletonHighlights() {
  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {[95, 85, 90, 78].map((w, i) => (
        <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div className="shimmer" style={{ width: '18px', height: '12px', borderRadius: '2px', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div className="shimmer" style={{ height: '12px', width: `${w}%`, borderRadius: '2px', marginBottom: '6px' }} />
            <div className="shimmer" style={{ height: '12px', width: `${w - 20}%`, borderRadius: '2px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
