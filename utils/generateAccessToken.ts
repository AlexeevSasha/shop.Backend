import jwt from 'jsonwebtoken';

export const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, String(process.env.JWT_SECRET), {
    expiresIn: String(process.env.JWT_MAX_AGE)
  });
};
