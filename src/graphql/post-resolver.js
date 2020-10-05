import { PubSub } from 'apollo-server-koa';
import { v4 } from 'uuid';

const topic = 'NEW_POST';
const pubsub = new PubSub();

export default {
  Mutation: {
    createPost: async (root, { input }, context) => {
      const post = { ...input, id: v4() };
      pubsub.publish(topic, { newPost: post });

      return post;
    }
  },
  Query: {
    health: () => console.log('Working...')
  },
  Subscription: {
    newPost: {
      resolve: ({ newPost }) => newPost,
      subscribe: () => pubsub.asyncIterator(topic)
    }
  }
};