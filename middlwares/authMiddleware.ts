import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../error';
import { pathRouter } from '../routes/path';
import UserModel from '../models/userModel';

const withoutToken = [pathRouter.user.create, pathRouter.user.login];

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const path = '/' + req.path.split('/').at(-1);
  if (withoutToken.includes(path)) {
    return next();
  }

  const authHeader = req.body?.token || req.query?.token || req.headers?.['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 401, message: 'Not Authorized token expired, please login again' });
  }

  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as jwt.JwtPayload;
    const user = await UserModel.findOne({ where: { id: decoded.id } });
    if (!user) throw new BadRequestError('');

    req.user = user.dataValues;
    next();
  } catch (error) {
    res.status(498).json({ status: 498, message: 'Invalid token' });
  }

};
