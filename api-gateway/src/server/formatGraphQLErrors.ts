import { GraphQLError } from "graphql";

export const formatGraphQLErrors = (error: GraphQLError) => {
  // const errorDetails = error.originalError?.message;
  // @ts-ignore
  const errorDetails = error.originalError?.response?.body;

  try {
    if (errorDetails) return JSON.parse(errorDetails);
  } catch (error) {}

  if (error.message) return error.message;

  return null;
};
