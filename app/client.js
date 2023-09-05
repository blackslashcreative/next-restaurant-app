import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const link = new HttpLink({ uri: 'https://strapi-kc1z.onrender.com/graphql' });
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache
});

export default client;