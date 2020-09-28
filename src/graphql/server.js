import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa';
import postResolver from './post-resolver';
import postSchema from './post-schema';

// Apollo server initialization
export default new ApolloServer({
  context: async ({ ctx, connection }) => {
    if (connection) {
      return connection.context;
    } else {
      return ctx;
    }
  },
  debug: true,
  schema: makeExecutableSchema({
    resolverValidationOptions: { requireResolversForResolveType: false },
    resolvers: [postResolver],
    typeDefs: [postSchema]
  }),
  subscriptions: {
    path: "/subscriptions",
    onConnect: async (connectionParams, webSocket, context) => {
      console.log(`Subscription client connected.`)
    },
    onDisconnect: async (webSocket, context) => {
      console.log(`Subscription client disconnected.`)
    }
  }
});
