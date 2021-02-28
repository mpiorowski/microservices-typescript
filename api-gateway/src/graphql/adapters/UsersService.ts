import { userSession } from "#root/graphql/resolvers/Query";
import { UserType, UserSessionType } from "#root/graphql/types";
import config from "config";
import got from "got";

const USERS_SERVICE_URL = config.get("USERS_SERVICE_URL") as string;

export default class UsersService {
  static async fetchUser({ userId }: { userId: string }): Promise<UserType | null> {
    const body = await got.get(`${USERS_SERVICE_URL}/users/${userId}`).json();
    if (!body) return null;
    return body as UserType;
  }

  static async fetchUserSession({ sessionId }: { sessionId: string }): Promise<UserSessionType | null> {
    const body = await got.get(`${USERS_SERVICE_URL}/sessions/${sessionId}`).json();
    if (!body) return null;
    return body as UserSessionType;
  }
}
