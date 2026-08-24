import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

if (!endpoint) {
  console.warn('[wpGraphQL] VITE_GRAPHQL_ENDPOINT is not set — WordPress content will never load, falling back to static data.');
}

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: endpoint || '' }),
  cache: new InMemoryCache(),
});
