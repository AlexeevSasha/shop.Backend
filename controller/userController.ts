import { NextFunction, Request, Response } from 'express';
import { BadRequestError, UnauthenticatedError } from '../error';
import UserModel from '../models/userModel';
import { emailValidate, lengthValidate } from '../utils/validation';
import { UserCreateT, UserLoginT, UserT } from '../interfaces/user';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../utils/generateAccessToken';
import { removeKeysFromObject } from '../utils/removeKeysFromObject';

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

      res.send({
        user: removeKeysFromObject<UserT, Omit<UserT, 'password'>>(user.dataValues, ['password']),
        token
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteUser = await UserModel.destroy({ where: { id } });

      if (deleteUser === 0) throw new BadRequestError('Error when deleting a user')

      res.send({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
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
}

export default UserController;