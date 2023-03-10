import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../common/error';
import UserModel from '../database/models/user';
import { returnResponseMessage } from '../common/utils/returnResponseMessage';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.body?.token || req.query?.token || req.headers?.['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return returnResponseMessage(res, 401, 'Not Authorized token expired, please login again');
  }

  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as jwt.JwtPayload;
    const user =  await UserModel.findOne({ where: { id: decoded.id } });
    if (!user) throw new BadRequestError('Invalid token');

    req.user = user.dataValues;
    next();
  } catch (error) {
    returnResponseMessage(res, 498, 'Invalid token');
  }

};
