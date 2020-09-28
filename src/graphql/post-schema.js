import { gql } from 'apollo-server-koa';

export default gql`
  type Post {
    content: String
    id: ID!
    username: String
  }

  input CreatePostInput {
    content: String!
    username: String!
  }

  type Query {
    health: Boolean
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }

  type Subscription {
    newPost: Post
  }
`;