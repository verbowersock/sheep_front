import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
//import { GRAPHQL_API_URL } from "../config";

const createLink = (opts = {}) => {
  return createHttpLink({ uri: "http://localhost:4000/graphql", ...opts });
};

// eslint-disable-next-line no-return-assign
export const setAuthToken = (token) => {
  const options = {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };

  apolloClient.setLink(createLink(options));
};

// Cache implementation
const cache = new InMemoryCache({});

// Create the apollo client
export const apolloClient = new ApolloClient({
  cache,
  link: createLink(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    nextFetchPolicy: "use-cache",
  },
});

console.log(apolloClient);
