import jwt from 'jsonwebtoken';

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, String(process.env.JWT_SECRET), {
    expiresIn: String(process.env.JWT_REFRESH_DAY)
  });
};
