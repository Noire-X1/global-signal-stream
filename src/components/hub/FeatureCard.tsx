import type { NoireArticle } from '@/lib/exa';
import TopicTag from './TopicTag';

type Props = { article: NoireArticle; onClick?: () => void };

export default function FeatureCard({ article, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="news-card"
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        height: 'clamp(300px, 48vw, 500px)',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid rgba(168,85,247,0.30)',
        marginBottom: '28px',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      <img
        src={article.imageUrl}
        alt={article.title}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.55) saturate(0.8)',
        }}
        onError={e => {
          (e.target as HTMLImageElement).src =
            'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80';
        }}
      />

      <div className="img-overlay" style={{ position: 'absolute', inset: 0 }} />

      {/* Badge */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 2 }}>
        <TopicTag label="Main Story" color="#A855F7" />
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '28px', zIndex: 2,
      }}>
        <p style={{
          fontFamily: "'DM Mono', monospace", fontSize: '9px',
          letterSpacing: '0.2em', color: '#A855F7', marginBottom: '10px',
        }}>
          {article.source} · {article.publishedDate
            ? new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : 'Breaking'}
        </p>

        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: 'clamp(22px, 4vw, 38px)', lineHeight: 1.15,
          color: '#FFFFFF', marginBottom: '10px',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
        }}>
          {article.title}
        </h2>

        <p style={{
          fontFamily: "'Lora', serif", fontStyle: 'italic',
          fontSize: '14px', lineHeight: 1.6,
          color: 'rgba(255,255,255,0.75)',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
        }}>
          {article.highlight || article.summary}
        </p>
      </div>
    </a>
  );
}
