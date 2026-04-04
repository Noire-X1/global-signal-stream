import type { NoireArticle } from '@/lib/exa';
import TopicTag from './TopicTag';

type Props = { article: NoireArticle };

export default function NewsCard({ article }: Props) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card"
      style={{
        display: 'block', textDecoration: 'none',
        background: 'rgba(0,0,0,0.58)',
        backdropFilter: 'blur(16px) saturate(150%)',
        WebkitBackdropFilter: 'blur(16px) saturate(150%)',
        border: '1px solid rgba(168,85,247,0.15)',
        borderRadius: '4px', overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative', aspectRatio: '16/9', overflow: 'hidden',
      }}>
        <img
          src={article.imageUrl}
          alt={article.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.72) saturate(0.75)',
            transition: 'filter 0.3s ease, transform 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.filter = 'brightness(0.85) saturate(0.9)';
            (e.target as HTMLElement).style.transform = 'scale(1.04)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.filter = 'brightness(0.72) saturate(0.75)';
            (e.target as HTMLElement).style.transform = 'scale(1)';
          }}
          onError={e => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80';
          }}
        />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '16px 14px 14px' }}>
        <div style={{ marginBottom: '10px' }}>
          <TopicTag label={article.topic} color={article.topicColor} />
        </div>

        <h3 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 700,
          fontSize: '16px', lineHeight: 1.3, color: '#FFFFFF',
          marginBottom: '8px',
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
        }}>
          {article.title}
        </h3>

        <p style={{
          fontFamily: "'DM Mono', monospace", fontSize: '9px',
          letterSpacing: '0.15em', color: '#3D4451', marginBottom: '8px',
        }}>
          {article.source}
          {article.publishedDate && ` · ${new Date(article.publishedDate)
            .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
        </p>

        {article.highlight && (
          <p style={{
            fontFamily: "'Lora', serif", fontSize: '13px',
            lineHeight: 1.55, color: '#A1A1AA',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
          }}>
            {article.highlight}
          </p>
        )}
      </div>
    </a>
  );
}
