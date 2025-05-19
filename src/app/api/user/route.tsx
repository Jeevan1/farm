import { NextResponse } from 'next/server';

const url = `https://${process.env.NEXT_PUBLIC_URL}/graphql.json`;
const token = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN;

export async function GET() {
  const query = `
    {
      customer {
        firstName
        lastName
        email
        phone
        acceptsMarketing
      }
    }`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token!,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json({ errors: data.errors }, { status: 500 });
    }

    return NextResponse.json(data.data.customer);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, password, acceptsMarketing } =
    await req.json();

  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          firstName
          lastName
          email
          phone
          acceptsMarketing
        }
        customerUserErrors {
          field
          message
          code
        }
      }
    }
  `;

  const variables = {
    input: {
      firstName,
      lastName,
      email,
      phone,
      password,
      acceptsMarketing,
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token!,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();

    // Check for general GraphQL errors
    if (json.errors) {
      return NextResponse.json({ errors: json.errors }, { status: 500 });
    }

    const customerCreate = json?.data?.customerCreate;

    // Handle Shopify-specific customer creation errors
    if (customerCreate?.customerUserErrors?.length > 0) {
      return NextResponse.json(
        { error: customerCreate.customerUserErrors[0] },
        { status: 400 },
      );
    }

    // Success
    return NextResponse.json(customerCreate);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Something went wrong',
        detail: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
