import { Request, Response } from "express";

export type ResolverContext = {
  req: Request;
  res: Response;
};

export type UserSessionType = {
  id: string;
  userId: string;
  createdAt: string;
  expiredAt: string;
};

export type UserType = {
  id: string;
  username: string;
  createdAt: string;
};
