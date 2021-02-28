import accessEnv from "#root/helpers/accessEnv";
import { ApolloServer } from "apollo-server-express";
import config from "config";
import express from "express";
import { formatGraphQLErrors } from "./formatGraphQLErrors";

const PORT = config.get("PORT") as number;

export const startServer = () => {
  const app = express();

  const apolloServer = new ApolloServer({
    context: a=> a,
    formatError: formatGraphQLErrors,
    resolvers,
    typeDefs: scheme
  })

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`api gateway listing on ${PORT}`);
  });
};
