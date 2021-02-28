import User from "#root/db/entities/Users";
import { Express } from "express";
import { getRepository } from "typeorm";

const setupRoutes = (app: Express) => {
  const userRepository = getRepository(User);
  app.get("/user/:userId", async (req, res, next) => {
    try {
      const user = await userRepository.findOne(req.params.userId);
      if (!user) return next(new Error("Invalid user ID!"));
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  });
};

export default setupRoutes;
