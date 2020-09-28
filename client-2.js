#!/usr/bin/env node

const { SubscriptionClient } = require('subscriptions-transport-ws')
const gql = require('graphql-tag')
const ws = require('ws')
const exit = process.exit;

(async () => {
  const GRAPHQL_ENDPOINT = 'ws://localhost:3000/subscriptions';
  const client = new SubscriptionClient(GRAPHQL_ENDPOINT, { reconnect: true }, ws)

  client.request({
    query: gql`
      subscription {
        newPost {
          id
        }
      }`,
    variables: {}
  }).subscribe({
    next (data) {
      console.log(JSON.stringify(data, null, 2))
    },
    error (error) {
      console.log(require('util').inspect(error, { depth: null }));
    }
  })

  await new Promise(resolve => setTimeout(resolve, 100000000));

  exit(0);
})();

