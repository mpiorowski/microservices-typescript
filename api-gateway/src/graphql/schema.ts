import { gql } from "apollo-server";

export const schema = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
    createdAt: Date!
  }

  type UserSession {
    createdAt: Date!
    expiresAt: Date!
    id: ID!
    user: User!
  }

  type Mutation {
    createUser(username: String!, password: String!): User!
    createUserSession(username: String!, password: String!): UserSession!
  }

  type Query {
    userSession(me: Boolean!): UserSession
  }
`;
