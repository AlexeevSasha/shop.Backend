import { NextFunction, Request, Response } from 'express';
import { Role } from '../common/constants/role';
import { returnResponseMessage } from '../common/utils/returnResponseMessage';

export const IsAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = req.user.role === Role.ADMIN;
  if (!isAdmin) {
    return returnResponseMessage(res, 400, "You don't have enough rights");
  }
  return next();
};
