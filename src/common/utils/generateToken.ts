import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

class GenerateToken {
  constructor() {
  }

  public getToken(id: string, expires?: string) {
    return jwt.sign({ id }, String(process.env.JWT_SECRET), {
      expiresIn: expires || '1d'
    });
  }

  refreshToken(id: string) {
    return this.getToken(id, process.env.JWT_REFRESH_DAY);
  }

  accessToken(id: string) {
    return this.getToken(id, process.env.JWT_ACCESS_DAY);
  }

  async resetPasswordToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const salt = await bcrypt.genSalt(10);
    const hashToken = await bcrypt.hash(resetToken, salt);
    return { hashToken, resetToken };
  }

}

const generateToken = new GenerateToken();

export { generateToken };
