import { NextResponse } from 'next/server';

const url = `https://${process.env.NEXT_PUBLIC_URL}/graphql.json`;
const token = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN;

// POST: Login (create new access token)
export async function POST(request: Request) {
  const body = await request.json();
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
          
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email: body.email,
      password: body.password,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();
  if (data?.data?.customerAccessTokenCreate?.customerAccessToken === null) {
    const errors = data.data.customerAccessTokenCreate.customerUserErrors;
    return NextResponse.json(
      { error: errors[0]?.message || 'Unknown error' },
      { status: 401 },
    );
  }
  return NextResponse.json({
    token: data.data.customerAccessTokenCreate.customerAccessToken.accessToken,
    expiresAt:
      data.data.customerAccessTokenCreate.customerAccessToken.expiresAt,
  });
}
// DELETE: Logout (delete access token)
export async function DELETE(request: Request) {
  const body = await request.json();
  const query = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    customerAccessToken: body.token,
  };

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
