import Koa from 'koa';
import body from 'koa-body';
import graphqlApolloServer from '../graphql/server';
import logger from 'koa-logger';

const app = new Koa();

app.use(logger());
app.use(body());

const httpServer = app.listen('3000', () => console.log(`Server is listening on port 3000`));

graphqlApolloServer.applyMiddleware({ app, path: '/graphql' });
graphqlApolloServer.installSubscriptionHandlers(httpServer);