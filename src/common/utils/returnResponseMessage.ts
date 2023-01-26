import { Response } from 'express';

export const returnResponseMessage = (res: Response, code: number, msg: string) =>
  res.status(code).json({ status: code, message: msg });
