import { Router } from 'express';
import { pathRouter } from '../common/constants/path';
import { IsAdminMiddleware } from '../middlwares/isAdminMiddleware';
import { authMiddleware } from '../middlwares/authMiddleware';
import BlogCtrl from '../controller/blogController';

class BlogRouter {
  private readonly routers: Router;
  controller: BlogCtrl;

  constructor() {
    this.routers = Router();
    this.controller = new BlogCtrl();
  }

  get() {
    this.routers.route(pathRouter.blog.create).post(authMiddleware, IsAdminMiddleware, this.controller.create);
    this.routers.route(pathRouter.blog.blogById).get(this.controller.getBlogById);
    this.routers.route(pathRouter.blog.allBlogs).get(this.controller.getAllBlog);
    this.routers.route(pathRouter.blog.delete).delete(authMiddleware, IsAdminMiddleware,this.controller.deleteBlog);
    return this.routers;
  }
}

export default BlogRouter;