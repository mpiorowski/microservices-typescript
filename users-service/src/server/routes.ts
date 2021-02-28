import User from "#root/db/entities/Users";
import { hashPassword, passwordCompareSync } from "#root/helpers/passwordHelpers";
import { Express } from "express";
import config from "config";
import { getConnection, getRepository } from "typeorm";
import dayjs from "dayjs";
import generateUUID from "#root/helpers/generateUUID";
import UserSession from "#root/db/entities/UserSessions";

export const USER_SESSION_EXPIRY_HOURS = config.get("USER_SESSION_EXPIRY_HOURS") as number;

const setupRoutes = (app: Express) => {
  const userRepository = getRepository(User);
  const userSessionRepository = getRepository(UserSession);
  const connection = getConnection();

  app.post("/sessions", async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return next(new Error("Invalid body!"));
    }

    try {
      const user = await userRepository.findOne({ username: req.body.username }, { select: ["id", "password"] });
      if (!user) return next(new Error("Invalid username!"));

      if (!passwordCompareSync(req.body.password, user.password)) {
        return next(new Error("Invalid password!"));
      }
      const expiresAt = dayjs().add(USER_SESSION_EXPIRY_HOURS, "hour").toISOString();
      const sessionToken = generateUUID();

      const userSession = {
        expiresAt,
        id: sessionToken,
        userId: user.id,
      };

      await connection.createQueryBuilder().insert().into(UserSession).values(userSession).execute();
      return res.json(userSession);
    } catch (error) {
      return next(error);
    }
  });

  app.get("/sessions/:sessionId", async (req, res, next) => {
    try {
      const userSession = await userSessionRepository.findOne(req.params.sessionId);
      if (!userSession) return next(new Error("Invalid session ID"!));
      return res.json(userSession);
    } catch (error) {
      return next(error);
    }
  });

  app.delete("/sessions/:sessionId", async (req, res, next) => {
    try {
      const userSession = await userSessionRepository.findOne(req.params.sessionId);
      if (!userSession) return next(new Error("Invalid session ID"!));
      await userSessionRepository.remove(userSession);
      return res.end();
    } catch (error) {
      return next(error);
    }
  });

  app.get("/users/:userId", async (req, res, next) => {
    try {
      const user = await userRepository.findOne(req.params.userId);
      if (!user) return next(new Error("Invalid user ID!"));
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  });

  app.post("/users", async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return next(new Error("Invalid body!"));
    }

    try {
      const newUser = {
        id: generateUUID(),
        password: hashPassword(req.body.password),
        username: req.body.username,
      };

      await connection.createQueryBuilder().insert().into(User).values([newUser]).execute();
      const { password, ...rest } = newUser;
      return res.json(rest);
    } catch (error) {
      return next(error);
    }
  });
};

export default setupRoutes;
