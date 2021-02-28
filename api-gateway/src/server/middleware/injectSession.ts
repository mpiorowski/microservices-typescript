import UsersService from "#root/graphql/adapters/UsersService";
import { Request, Response, NextFunction } from "express";

export const injectSession = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.userSessionId) {
    const userSession = await UsersService.fetchUserSession({ sessionId: req.cookies.userSessionId });
    res.locals.userSession = userSession;
    console.log("user session injected", userSession);
  }
  return next();
};
