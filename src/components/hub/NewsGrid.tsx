import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { NoireArticle } from '@/lib/exa';
import NewsCard from './NewsCard';

type Props = {
  articles: NoireArticle[];
  isLoading: boolean;
  onCardClick?: (article: NoireArticle) => void;
};

function SkeletonCard() {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.58)',
      border: '1px solid rgba(168,85,247,0.12)',
      borderRadius: '4px', overflow: 'hidden',
    }}>
      <div className="shimmer" style={{ aspectRatio: '16/9' }} />
      <div style={{ padding: '16px 14px' }}>
        {[80, 100, 65].map((w, i) => (
          <div key={i} className="shimmer" style={{
            height: i === 0 ? '10px' : '14px',
            width: `${w}%`, borderRadius: '2px',
            marginBottom: '8px',
          }} />
        ))}
      </div>
    </div>
  );
}

function AnimatedCard({ article, index, onClick }: { article: NoireArticle; index: number; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: 'spring', stiffness: 70, damping: 18,
        delay: index * 0.07,
      }}
    >
      <NewsCard article={article} onClick={onClick} />
    </motion.div>
  );
}

export default function NewsGrid({ articles, isLoading, onCardClick }: Props) {
  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        marginBottom: '20px',
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace", fontSize: '9px',
          letterSpacing: '0.25em', color: '#A855F7',
          textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const,
        }}>
          ◆ Latest Intelligence
        </span>
        <div style={{
          flex: 1, height: '1px',
          background: 'rgba(168,85,247,0.2)',
        }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : articles.length === 0
            ? (
              <div style={{
                gridColumn: '1 / -1', textAlign: 'center',
                padding: '60px 0',
                fontFamily: "'DM Mono', monospace", fontSize: '12px',
                letterSpacing: '0.25em', color: '#A855F7',
              }}>
                ◆ No Signals Detected
              </div>
            )
            : articles.map((a, i) => (
              <AnimatedCard key={a.id} article={a} index={i} onClick={() => onCardClick?.(a)} />
            ))
        }
      </div>
    </div>
  );
}
