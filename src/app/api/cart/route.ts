import { NextRequest, NextResponse } from 'next/server';

const SHOPIFY_URL = `https://${process.env.NEXT_PUBLIC_URL}/graphql.json`;
const HEADERS = {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token':
    process.env.NEXT_PUBLIC_STOREFRONT_TOKEN!,
};

export async function POST(req: NextRequest) {
  try {
    const { action, cartId, variantId, quantity, lineId } = await req.json();

    let query = '';

    switch (action) {
      case 'create':
        query = `
          mutation {
            cartCreate {
              cart {
                id
                checkoutUrl
              }
              userErrors {
                field
                message
              }
            }
          }
        `;
        break;

      case 'add':
        query = `
          mutation {
            cartLinesAdd(cartId: "${cartId}", lines: [
              {
                merchandiseId: "${variantId}",
                quantity: ${quantity}
              }
            ]) {
              cart {
                id
                checkoutUrl
                lines(first: 10) {
                  edges {
                    node {
                      id
                      quantity
                    }
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `;
        break;

      case 'fetch':
        query = `
          query {
            cart(id: "${cartId}") {
              id
              cost {
                      subtotalAmount {
                        amount
                      }
                    }
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product {
                          title
                        }
                        image {
                          originalSrc
                        }
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }

                    ... on CartLine {
                      id
                      quantity
                      cost {
                       subtotalAmount {
                         amount
                       }
                      }
                    }
                  }
                }
              }
            }
          }
        `;
        break;

      case 'edit':
        query = `
          mutation {
            cartLinesUpdate(cartId: "${cartId}", lines: [
              {
                id: "${lineId}",
                quantity: ${quantity}
              }
            ]) {
              cart {
                id
                lines(first: 10) {
                  edges {
                    node {
                      id
                      quantity
                    }
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `;
        break;

      case 'remove':
        query = `
          mutation {
            cartLinesRemove(cartId: "${cartId}", lineIds: ["${lineId}"]) {
              cart {
                id
                lines(first: 10) {
                  edges {
                    node {
                      id
                      quantity
                    }
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `;
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const res = await fetch(SHOPIFY_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ query }),
    });

    const data = await res.json();

    if (data.errors) {
      return NextResponse.json({ error: data.errors }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 },
    );
  }
}
