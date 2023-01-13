import { pathRouter } from './path';

export const routerWithoutToken = [
  pathRouter.user.create,
  pathRouter.user.login,
  pathRouter.user.refresh
];
