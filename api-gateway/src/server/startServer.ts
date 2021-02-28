import { resolvers } from "#root/graphql/resolvers";
import { schema } from "#root/graphql/schema";
import accessEnv from "#root/helpers/accessEnv";
import { ApolloServer } from "apollo-server-express";
import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { formatGraphQLErrors } from "./formatGraphQLErrors";

const PORT = config.get("PORT") as number;

export const startServer = () => {
  const app = express();
  app.use(cookieParser());

  // different settings
  app.use(cors());

  const apolloServer = new ApolloServer({
    context: (a) => a,
    formatError: formatGraphQLErrors,
    resolvers: resolvers,
    typeDefs: schema,
  });

  apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`api gateway listing on ${PORT}`);
  });
};
