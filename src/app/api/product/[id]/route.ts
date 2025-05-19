import { NextRequest } from 'next/server';

const url = `https://${process.env.NEXT_PUBLIC_URL}/graphql.json`;
const token = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const query = `
    {
      product(id: "gid://shopify/Product/${id}") {
        id
        title
        description
        descriptionHtml
        category {
          name
        }
          totalInventory 
        vendor
        description
        featuredImage {
          originalSrc 
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          edges {
            node {
              originalSrc
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token!,
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();

  if (json.errors) {
    return new Response(JSON.stringify({ error: json.errors }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(json.data.product), { status: 200 });
}
