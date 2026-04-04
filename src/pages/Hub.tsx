import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fetchArticles } from '@/lib/exa-client';
import { fetchNoireArticles, type NoireArticle } from '@/lib/exa';
import HubHeader from '@/components/hub/HubHeader';
import LiveBeatsBar from '@/components/hub/LiveBeatsBar';
import FeatureCard from '@/components/hub/FeatureCard';
import NewsGrid from '@/components/hub/NewsGrid';
import IntelModal from '@/components/hub/IntelModal';

export default function HubPage() {
  const [articles, setArticles] = useState<NoireArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<NoireArticle | null>(null);

  const load = useCallback(async (query = '', topic = 'All') => {
    setLoading(true);
    // Try live Exa first, fall back to static data
    let data = await fetchArticles(query, topic, 13);
    if (data.length === 0) {
      data = await fetchNoireArticles(topic, 13);
    }
    setArticles(data);
    setLoading(false);
  }, []);

  useEffect(() => { load('', 'All'); }, [load]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    load('', tab);
  };

  const handleSearch = (query: string) => {
    setActiveTab('All');
    load(query, 'All');
  };

  const handleCardClick = useCallback((article: NoireArticle) => {
    setSelectedArticle(article);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="hub-container"
    >
      <HubHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSearch={handleSearch}
      />

      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 40px) 80px',
      }}>
        <LiveBeatsBar />

        {loading && articles.length === 0 ? (
          <div className="shimmer" style={{
            width: '100%', height: 'clamp(300px, 48vw, 500px)',
            borderRadius: '4px', marginTop: '24px', marginBottom: '28px',
          }} />
        ) : articles[0] ? (
          <div style={{ marginTop: '24px' }}>
            <FeatureCard article={articles[0]} onClick={() => handleCardClick(articles[0])} />
          </div>
        ) : null}

        <NewsGrid
          articles={loading ? [] : articles.slice(1)}
          isLoading={loading}
          onCardClick={handleCardClick}
        />
      </div>

      <IntelModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </motion.div>
  );
}
