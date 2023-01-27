import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../common/error';
import { returnResponseMessage } from '../common/utils/returnResponseMessage';
import BlogModel from '../database/models/blog';
import BlogFilterByQuery from '../common/utils/filterQuery/blogFilterQuery';
import { IBlog } from '../interfaces/blog';

// todo add update blog and likes/dislike
class BlogController {

  public async create(req: Request<{}, {}, IBlog>, res: Response, next: NextFunction) {
    try {
      const blog = await BlogModel.create(req.body);
      res.send(blog);
    } catch (error) {
      next(error);
    }
  }

  public async deleteBlog(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteBlog = await BlogModel.destroy({ where: { id } });

      if (deleteBlog === 0) throw new BadRequestError('Error when deleting a blog');

      returnResponseMessage(res, 200, 'Blog deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  public async getBlogById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blog = await BlogModel.findOne({ where: { id } });

      if (!blog) throw new BadRequestError('Blog not found');

      res.send(blog);
    } catch (error) {
      next(error);
    }
  }

  public async getAllBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const blogs = await BlogModel.findAndCountAll(new BlogFilterByQuery(req.query).init());
      res.send({
        count: blogs.count,
        products: blogs.rows
      });
    } catch (error) {
      next(error);
    }
  }

}

export default BlogController;
