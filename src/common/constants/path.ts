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
    allProduct: '/',
    addToFavorites: '/add-favorites',
    deleteToFavorites: '/delete-favorites',
    upload: '/upload/:id'
  },
  blog: {
    create: '/create',
    blogById: '/:id',
    delete: '/delete/:id',
    allBlogs: '/'
  },
  category: {
    create: '/create',
    update: '/update/:id',
    categoryById: '/:id',
    delete: '/delete/:id',
    allCategories: '/'
  },
  coupon: {
    create: '/create',
    update: '/update/:id',
    delete: '/delete/:id',
    allCoupons: '/'
  }
};
