import { UserT } from '../interfaces/user';


declare global {
  namespace Express {
    interface Request {
      user: UserT;
    }
  }
}
