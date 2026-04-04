import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Article } from '@/lib/articles';
import TopicTag from './TopicTag';
import EngagementBar from './EngagementBar';

type Props = { article: Article; index: number };

export default function ArticleCard({ article, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55, once: false });

  useEffect(() => {
    document.body.style.setProperty('--active-card', inView ? '1' : '0');
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ amount: 0.3 }}
      transition={{
        type: 'spring',
        stiffness: 75,
        damping: 18,
        mass: 0.8,
        delay: index * 0.04,
      }}
      className={`card-glass ${inView ? 'card-glass-active' : ''}`}
      style={{
        position: 'relative',
        padding: '36px 32px',
        marginBottom: '28px',
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      {/* Purple corner accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '60px', height: '60px',
        background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <TopicTag label={article.topic} color={article.topicColor} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', color: '#A1A1AA' }}>
            {article.region}
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.15em', color: '#3D4451' }}>
            {article.timestamp}
          </span>
        </div>
      </div>

      {/* Byline */}
      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.25em',
        color: '#A855F7', marginBottom: '14px', textTransform: 'uppercase',
      }}>
        ◆ {article.byline}
      </div>

      {/* Headline */}
      <h2 style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 900,
        fontSize: '26px', lineHeight: 1.15, color: '#FFFFFF',
        marginBottom: '10px',
      }}>
        {article.headline}
      </h2>

      {/* Subheadline */}
      <p style={{
        fontFamily: "'Lora', serif", fontStyle: 'italic',
        fontSize: '14px', lineHeight: 1.6, color: '#A1A1AA',
        marginBottom: '18px',
      }}>
        {article.subheadline}
      </p>

      {/* Body */}
      <p style={{
        fontFamily: "'Lora', serif", fontSize: '13.5px',
        lineHeight: 1.75, color: '#8A8A8A',
        marginBottom: '20px',
      }}>
        {article.body}
      </p>

      {/* Read more */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: "'DM Mono', monospace", fontSize: '10px',
        letterSpacing: '0.18em', color: '#A855F7',
        textTransform: 'uppercase',
      }}>
        <span>{article.readTime} — Continue Reading</span>
        <span style={{ fontSize: '14px' }}>→</span>
      </div>

      {/* Engagement */}
      <EngagementBar likes={article.likes} comments={article.comments} shares={article.shares} />
    </motion.div>
  );
}
