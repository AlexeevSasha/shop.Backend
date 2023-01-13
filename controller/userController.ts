import { NextFunction, Request, Response } from 'express';
import { BadRequestError, UnauthenticatedError } from '../common/error';
import UserModel from '../models/userModel';
import { emailValidate, lengthValidate } from '../common/utils/validation';
import { UserCreateT, UserLoginT, UserT } from '../interfaces/user';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../common/utils/generateAccessToken';
import { removeKeysFromObject } from '../common/utils/removeKeysFromObject';
import { returnResponseMessage } from '../common/utils/returnResponseMessage';
import { generateRefreshToken } from '../common/utils/generateRefreshToken';
import jwt from 'jsonwebtoken';

//todo change update user
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
        user: removeKeysFromObject<UserT, Omit<UserT, 'password'>>(user.dataValues, ['password']),
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
      const refreshToken = generateRefreshToken(user.id);

      await UserModel.update({ refreshToken }, { where: { id: user.id } });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 168 * 60 * 60 * 1000
      });

      res.send({
        user: removeKeysFromObject<UserT, Omit<UserT, 'password'>>(user.dataValues, ['password']),
        token
      });
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const cookies = req.cookies;
      if (!cookies?.refreshToken) throw new BadRequestError('Refresh token not found');
      await UserModel.update({ refreshToken: null }, { where: { refreshToken: cookies?.refreshToken } });
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
      });

      res.json({ status: 200, message: 'You\'re out successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const cookies = req.cookies;
      if (!cookies?.refreshToken) throw new BadRequestError('Refresh token not found');

      const user = await UserModel.findOne({ where: { refreshToken: cookies?.refreshToken } });
      if (!user) throw new BadRequestError('No refresh token in database or not matched');

      const decoded = await jwt.verify(cookies?.refreshToken, String(process.env.JWT_SECRET)) as jwt.JwtPayload;
      if (user.id !== decoded.id) throw new BadRequestError('There is something wrong with refresh token');

      res.send({
        accessToken: generateAccessToken(user.id)
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteUser = await UserModel.destroy({ where: { id } });

      if (deleteUser === 0) throw new BadRequestError('Error when deleting a user');

      returnResponseMessage(res, 200, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const user = await UserModel.update({
        ...req.body
      }, { where: { id } });


      if (!user) throw new BadRequestError('User not found');

      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  public async getAllUser(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.findAll();
      res.send(users);
    } catch (error) {
      next(error);
    }
  }

  public async getUserById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserModel.findOne({ where: { id } });

      if (!user) throw new BadRequestError('User not found');

      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  public async blockUser(req: Request<{ id: string }, {}, {}, { unblock?: string }>, res: Response, next: NextFunction) {
    try {
      const { unblock } = req.query;
      const user = await UserModel.update({ blocked: !unblock }, { where: { id: req.params.id } });

      if (!user) throw new BadRequestError('User not found');

      returnResponseMessage(res, 200, `User successfully ${unblock ? 'unlocked' : 'locked out'}`);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;