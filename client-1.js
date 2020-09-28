#!/usr/bin/env node

const ws = require('ws');
const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');
const { WebSocketLink } = require('@apollo/client/link/ws');
const exit = process.exit;

(async () => {
  const link = new WebSocketLink({
    uri: `ws://localhost:3000/subscriptions`,
    options: { reconnect: true },
    webSocketImpl: ws
  });

  const client = new ApolloClient({ cache: new InMemoryCache(), link });

  client.subscribe({
    query: gql`
      subscription {
        newPost {
          id
        }
      }
    `
  }).subscribe({
    next: x => console.log(JSON.stringify(x, null, 2)),
    error: err => console.log(require('util').inspect(err, { depth: null })),
    complete: () => console.log('Done')
  });

  await new Promise(resolve => setTimeout(resolve, 100000000));

  exit(0);
})();

