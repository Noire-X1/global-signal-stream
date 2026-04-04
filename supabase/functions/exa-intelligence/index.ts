import { corsHeaders } from '@supabase/supabase-js/cors';

const EXA_API_URL = 'https://api.exa.ai';

function getApiKey(): string {
  const key = Deno.env.get('EXA_API_KEY');
  if (!key) throw new Error('EXA_API_KEY is not set');
  return key;
}

function extractDomain(url: string): string {
  try { return new URL(url).hostname.replace('www.', ''); }
  catch { return 'unknown'; }
}

function inferTopic(title: string): string {
  const t = title.toLowerCase();
  if (/election|senate|president|minister|government|war|nato|treaty|diplomat/.test(t)) return 'Politics';
  if (/nba|nfl|football|cricket|tennis|champion|league|sport|olympic/.test(t)) return 'Sports';
  if (/ai|robot|tech|silicon|apple|google|microsoft|chip|model|openai|nvidia/.test(t)) return 'Technology';
  if (/climate|carbon|arctic|flood|wildfire|ocean|emission|environment/.test(t)) return 'Environment';
  if (/bitcoin|crypto|ethereum|blockchain|token|defi|web3|solana/.test(t)) return 'Crypto';
  if (/market|stock|dollar|fed|gdp|economy|trade|bank|fund|inflation/.test(t)) return 'Business';
  return 'All';
}

const TOPIC_QUERIES: Record<string, string> = {
  All: 'breaking world news today',
  Politics: 'global politics government policy',
  Sports: 'major sports results championship',
  Technology: 'artificial intelligence tech breakthrough',
  Environment: 'climate change environment crisis',
  Crypto: 'cryptocurrency bitcoin blockchain markets',
  Business: 'global economy markets finance',
};

const TOPIC_COLORS: Record<string, string> = {
  All: '#A855F7', Politics: '#DC2626', Sports: '#2563EB',
  Technology: '#7C3AED', Environment: '#059669', Crypto: '#D97706', Business: '#0891B2',
};

const FALLBACK_IMAGES: Record<string, string> = {
  Politics: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80',
  Sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
  Technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  Environment: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
  Crypto: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80',
  Business: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
  All: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query, topic = 'All', count = 13 } = await req.json();
    const searchQuery = (query && query.trim().length > 0)
      ? query.trim()
      : (TOPIC_QUERIES[topic] ?? TOPIC_QUERIES['All']);

    const apiKey = getApiKey();

    const res = await fetch(`${EXA_API_URL}/search`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        numResults: count,
        type: 'auto',
        contents: {
          highlights: {
            numSentences: 3,
            highlightsPerUrl: 2,
            query: 'What is the key finding or most important fact?',
          },
          summary: {
            query: 'Summarize in 2 sentences for an intelligence briefing.',
          },
        },
        livecrawl: 'always',
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[exa-intelligence] Exa API error:', res.status, errText);
      throw new Error(`Exa API returned ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const results = data.results || [];

    const articles = results.map((r: any, i: number) => {
      const resolvedTopic = topic !== 'All' ? topic : inferTopic(r.title ?? '');
      return {
        id: r.id ?? `noire-${Date.now()}-${i}`,
        url: r.url,
        title: r.title ?? 'Untitled Intelligence Report',
        author: r.author ?? null,
        publishedDate: r.publishedDate ?? null,
        source: extractDomain(r.url),
        topic: resolvedTopic,
        topicColor: TOPIC_COLORS[resolvedTopic] ?? '#A855F7',
        imageUrl: r.image ?? FALLBACK_IMAGES[resolvedTopic] ?? FALLBACK_IMAGES['All'],
        highlight: r.highlights?.[0] ?? r.summary ?? '',
        highlights: r.highlights ?? [],
        summary: r.summary ?? '',
        score: r.score ?? 0,
      };
    });

    return new Response(JSON.stringify({ articles }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[exa-intelligence] Error:', err);
    return new Response(
      JSON.stringify({ articles: [], error: err.message ?? 'Intelligence fetch failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
