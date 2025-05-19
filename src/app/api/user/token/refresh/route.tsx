import { NextResponse } from 'next/server';

const url = `https://${process.env.NEXT_PUBLIC_URL}/graphql.json`;
const token = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN;

export async function POST(request: Request) {
  const body = await request.json();
  const accessToken = body.token;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Missing token in request body' },
      { status: 400 },
    );
  }

  const query = `
    mutation customerAccessTokenRenew($customerAccessToken: String!) {
      customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { customerAccessToken: accessToken };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
