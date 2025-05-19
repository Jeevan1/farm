import { NextRequest } from 'next/server';

const query = `
  query getProducts(
    $first: Int!, 
    $sortKey: ProductSortKeys, 
    $reverse: Boolean, 
    $query: String
  ) {
    products(
      first: $first, 
      sortKey: $sortKey, 
      reverse: $reverse, 
      query: $query
    ) {
      edges {
        node {
          id
          title
          featuredImage {
            originalSrc
          }
          vendor
          description
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
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const url = `https://${process.env.NEXT_PUBLIC_URL}/graphql.json`;
const token = process.env.NEXT_PUBLIC_STOREFRONT_TOKEN;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const variables: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    if (value === 'true') {
      variables[key] = true;
    } else if (value === 'false') {
      variables[key] = false;
    } else if (!isNaN(Number(value))) {
      variables[key] = Number(value);
    } else {
      variables[key] = value;
    }
  });

  const minPrice = variables.minPrice ?? 0;
  const maxPrice = variables.maxPrice ?? 100000;

  const queryString = variables.query || '';
  const finalQuery = queryString.trim();

  const queryVariables = {
    first: variables.first ?? 10,
    sortKey: variables.sortKey ?? 'RELEVANCE',
    reverse: variables.reverse ?? false,
    query: finalQuery,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token!,
      },
      body: JSON.stringify({ query, variables: queryVariables }),
    });

    const json = await res.json();

    if (json.errors) {
      return new Response(JSON.stringify({ error: json.errors }), {
        status: 500,
      });
    }

    const allProducts = json.data.products.edges;
    const pageInfo = json.data.products.pageInfo;

    // Manually filter by price
    const filteredProducts = allProducts.filter(({ node }: any) => {
      const price = parseFloat(node.priceRange.minVariantPrice.amount);
      return price >= minPrice && price <= maxPrice;
    });

    return new Response(
      JSON.stringify({
        products: filteredProducts,
        hasNextPage: pageInfo.hasNextPage,
        endCursor: pageInfo.endCursor,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch from Shopify',
        detail: String(error),
      }),
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${url}/products.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token || '',
      },
      body: JSON.stringify({ product: body }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Failed to post to Shopify',
        details: error.message,
      }),
      {
        status: 500,
      },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${url}/products/${body.id}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token || '',
      },
      body: JSON.stringify({ product: body }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Failed to put to Shopify',
        details: error.message,
      }),
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${url}/products/${body.id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token || '',
      },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Failed to delete to Shopify',
        details: error.message,
      }),
      {
        status: 500,
      },
    );
  }
}
