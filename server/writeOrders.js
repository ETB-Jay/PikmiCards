const writeOrders = async (client, orderID, value) => {
  // Step 1: Fetch the current metafield ID for 'picked' in the 'custom' namespace
  const getMetafieldQuery = `
    {
      order(id: "${orderID}") {
        metafield(namespace: "custom", key: "picked") {
          value
        }
      }
    }`;

  const metafieldResponse = await client.request(getMetafieldQuery);
  const currentMetafield = JSON.parse(metafieldResponse.data?.metafield || '[]');
  console.log(currentMetafield)

  const mutation = `
    mutation OrderUpdate($input: OrderInput!) {
      orderUpdate(input: $input) {
        order {
          id
          metafields(first: 1, namespace: "custom") {
            edges {
              node {
                id
                namespace
                key
                value
                type
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

  const variables = {
    "input": {
      "id": orderID,
      "metafields": [{
        "key": "picked",
        "namespace": "custom",
        "type": "json",
        "value": JSON.stringify([...currentMetafield, value])
      }]
    }
  };

  console.log(variables)

  try {
    const response = await client.request(mutation, { variables });
    if (response.orderUpdate?.userErrors && response.orderUpdate?.userErrors.length > 0) {
      throw new Error(JSON.stringify(response.orderUpdate.userErrors));
    }
    return response;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw err;
  }
};

export { writeOrders }; 