import type { APIRoute } from 'astro';
import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

const PER_PAGE = 12; // 1回に読み込む件数

export const GET: APIRoute = async ({ url }) => {
  const page = Number(url.searchParams.get('page') || '1');
  const offset = (page - 1) * PER_PAGE;

  try {
    const data = await client.get({
      endpoint: 'spots',
      queries: {
        limit: PER_PAGE,
        offset: offset,
      },
    });

    return new Response(
      JSON.stringify(data.contents),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch spots' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};