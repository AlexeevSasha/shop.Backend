export const pathRouter = {
  user: {
    create: '/create',
    login: '/login',
    allUser: '/all-user',
    userById: '/:id',
    delete: '/delete/:id',
    update: '/update',
    block: '/block/:id',
    refresh: '/refresh',
    logout: '/logout',
    changePassword: '/change-password',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password'
  },
  product: {
    create: '/create',
    productById: '/:id',
    delete: '/delete/:id',
    allProduct: '/'
  }
};
