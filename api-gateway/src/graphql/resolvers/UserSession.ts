import UsersService from "#root/graphql/adapters/UsersService";
import { UserSessionType } from "../types";

const UserSession = {
  user: async (userSession: UserSessionType) => {
    return await UsersService.fetchUser({ userId: userSession.userId });
  },
};

export default UserSession;