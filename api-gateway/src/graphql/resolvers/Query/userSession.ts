import { ResolverContext } from "#root/graphql/types";

type Args = {
  me: boolean;
};

const userSessionResolver = (obj: any, args: Args, context: ResolverContext) => {
  if (args.me !== true) throw new Error("Unsupported argument value");
  return context.res.locals.userSession;
};

export default userSessionResolver;
