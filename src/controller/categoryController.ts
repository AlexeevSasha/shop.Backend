import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../common/error';
import { returnResponseMessage } from '../common/utils/returnResponseMessage';
import CategoryModel from '../database/models/category';
import { ICategory } from '../interfaces/category';
import { FilterByQuery } from '../common/utils/filterQuery/filterByQuery';


class CategoryController {

  public async createCategory(req: Request<{}, {}, ICategory>, res: Response, next: NextFunction) {
    try {
      const category = await CategoryModel.create(req.body);
      res.send(category);
    } catch (error) {
      next(error);
    }
  }

  public async updateCategory(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const category = await CategoryModel.update(req.body, { where: { id } });
      if (category[0] === 0) throw new BadRequestError("An error occurred while updating, please try again later.")

      returnResponseMessage(res, 200, 'Category update successfully');
    } catch (error) {
      next(error);
    }
  }

  public async deleteCategory(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const categoryBlog = await CategoryModel.destroy({ where: { id } });

      if (categoryBlog === 0) throw new BadRequestError('Error when deleting a category');

      returnResponseMessage(res, 200, 'Category deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  public async getCategoryById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findOne({ where: { id } });

      if (!category) throw new BadRequestError('Category not found');

      res.send(category);
    } catch (error) {
      next(error);
    }
  }

  public async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryModel.findAndCountAll(new FilterByQuery(req.params).init());
      res.send({
        count: categories.count,
        products: categories.rows
      });
    } catch (error) {
      next(error);
    }
  }

}

export default CategoryController;
