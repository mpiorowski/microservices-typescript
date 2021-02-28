import UsersService from "../adapters/UsersService";
import { ResolverContext } from "../types";

type Args = {
  username: string;
  password: string;
};

const Mutation = {
  createUser: async (obj: any, { username, password }: Args) => {
    return await UsersService.createUser({ username, password });
  },

  createUserSession: async (obj: any, { username, password }: Args, context: ResolverContext) => {
    const userSession = await UsersService.createUserSession({ username, password });
    context.res.cookie("userSessionId", userSession?.id, { httpOnly: true });
    return userSession;
  },
};

export default Mutation;
