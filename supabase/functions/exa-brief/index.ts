const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const EXA_API_URL = 'https://api.exa.ai';

function getApiKey(): string {
  const key = Deno.env.get('EXA_API_KEY');
  if (!key) throw new Error('EXA_API_KEY is not set');
  return key;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = getApiKey();

    const res = await fetch(`${EXA_API_URL}/contents`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: [url],
        highlights: {
          numSentences: 4,
          highlightsPerUrl: 6,
          query: 'What are the most significant facts, figures, and revelations?',
        },
        summary: {
          query: 'Write a 3-sentence intelligence briefing for a senior analyst.',
        },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Exa API returned ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const r = data.results?.[0];
    if (!r) throw new Error('No content returned for URL');

    return new Response(JSON.stringify({
      highlights: r.highlights ?? [],
      summary: r.summary ?? '',
      title: r.title ?? 'Intelligence Report',
      author: r.author ?? null,
      publishedDate: r.publishedDate ?? null,
      url: r.url,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[exa-brief] Error:', err);
    return new Response(
      JSON.stringify({ highlights: [], summary: '', error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
