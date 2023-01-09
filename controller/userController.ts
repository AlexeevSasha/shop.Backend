import { NextFunction, Request, Response } from 'express';
import { BadRequestError, UnauthenticatedError } from '../error';
import UserModel from '../models/userModel';
import { emailValidate, lengthValidate } from '../utils/validation';
import { UserCreateT, UserLoginT } from '../interfaces/user';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../utils/generateAccessToken';
import { removeKeysFromObject } from '../utils/removeKeysFromObject';

class UserController {

  private static checkEmailAndPassword(email: string, password: string) {
    if (!emailValidate(email)) {
      throw new BadRequestError('Invalid email address');
    }
    if (!lengthValidate(password, 2, 30)) {
      throw new BadRequestError('Password must be at least 3 and not more than 30 characters');
    }
  }

  public async create(req: Request<{}, {}, UserCreateT>, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      UserController.checkEmailAndPassword(email, password);

      const existEmail = await UserModel.findOne({ where: { email } });
      if (existEmail) throw new BadRequestError('This email already exists');

      const user = await UserModel.create(req.body);

      const token = generateAccessToken(user.id);

      res.send({
        user: removeKeysFromObject(user.dataValues, ['password']),
        token
      });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request<{}, {}, UserLoginT>, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      UserController.checkEmailAndPassword(email, password);

      const user = await UserModel.scope('withPassword').findOne({ where: { email } });
      const checkPassword = await bcrypt.compare(password, user?.password || '');

      if (!user || !checkPassword) throw new UnauthenticatedError('Wrong login or password');

      const token = generateAccessToken(user.id);

      res.send({
        user: removeKeysFromObject(user.dataValues, ['password']),
        token
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;