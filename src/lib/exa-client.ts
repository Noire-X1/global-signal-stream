/**
 * Browser-safe Exa client — all calls go through Supabase Edge Functions.
 * Zero references to API keys in this file.
 */

import { supabase } from '@/integrations/supabase/client';
import type { NoireArticle } from './exa';

export type BriefData = {
  highlights: string[];
  summary: string;
  title: string;
  author: string | null;
  publishedDate: string | null;
  url: string;
  error?: string;
};

export async function fetchArticles(
  query: string = '',
  topic: string = 'All',
  count: number = 13,
): Promise<NoireArticle[]> {
  try {
    const { data, error } = await supabase.functions.invoke('exa-intelligence', {
      body: { query, topic, count },
    });

    if (error) {
      console.error('[fetchArticles] Edge function error:', error);
      return [];
    }

    return data?.articles ?? [];
  } catch (err) {
    console.error('[fetchArticles] Network error:', err);
    return [];
  }
}

export async function fetchBrief(url: string): Promise<BriefData> {
  try {
    const { data, error } = await supabase.functions.invoke('exa-brief', {
      body: { url },
    });

    if (error) {
      console.error('[fetchBrief] Edge function error:', error);
      return { highlights: [], summary: '', title: '', author: null, publishedDate: null, url, error: error.message };
    }

    return data;
  } catch (err: any) {
    return {
      highlights: [], summary: '',
      title: '', author: null,
      publishedDate: null, url,
      error: err.message,
    };
  }
}
