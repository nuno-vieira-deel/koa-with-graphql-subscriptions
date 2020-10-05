import { ApolloServer } from 'apollo-server-koa';
import postResolver from './post-resolver';
import postSchema from './post-schema';

// Apollo server initialization
export default new ApolloServer({
  context: ({ ctx, connection }) => connection ? connection.context : ctx,
  debug: true,
  resolvers: [postResolver],
  subscriptions: {
    path: '/subscriptions',
    onConnect: () => console.log(`Subscription client connected.`),
    onDisconnect: () => console.log(`Subscription client disconnected.`)
  },
  typeDefs: [postSchema]
});
