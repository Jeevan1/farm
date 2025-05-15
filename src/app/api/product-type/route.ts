// For App Router: app/api/product-types/route.ts
import { NextRequest } from 'next/server';

const DOMAIN = process.env.NEXT_PUBLIC_ADMIN_URL;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

export async function GET(req: NextRequest) {
  const limit = 250; // Max per page
  let endpoint = `https://${DOMAIN}/products.json?fields=product_type&limit=${limit}`;
  const productTypes = new Set<string>();

  try {
    while (endpoint) {
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'X-Shopify-Access-Token': TOKEN!,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        return new Response(
          JSON.stringify({ error: 'Shopify error', status: res.status }),
          {
            status: res.status,
          },
        );
      }

      const data = await res.json();

      data.products.forEach((p: any) => {
        if (p.product_type) {
          productTypes.add(p.product_type);
        }
      });

      // Handle pagination via Link header
      const linkHeader = res.headers.get('link');
      const nextLink = linkHeader?.match(/<([^>]+)>;\s*rel="next"/);
      endpoint = nextLink ? nextLink[1] : null;
    }

    return new Response(JSON.stringify([...productTypes]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch product types', detail: error }),
      {
        status: 500,
      },
    );
  }
}
