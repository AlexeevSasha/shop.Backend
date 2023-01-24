import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/productModel';
import { BadRequestError } from '../common/error';
import slugify from 'slugify';
import { returnResponseMessage } from '../common/utils/returnResponseMessage';
import ProductFilterByQuery from '../common/utils/filterQuery/productFilterQuery';
import UserModel from '../models/userModel';

// todo add update product
class ProductController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductModel.create(
        {
          ...req.body,
          slug: req.body?.title ? slugify(req.body.title.toLowerCase()) : null
        });
      res.send(product);
    } catch (error) {
      next(error);
    }
  }

  public async deleteProduct(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteProduct = await ProductModel.destroy({ where: { id } });

      if (deleteProduct === 0) throw new BadRequestError('Error when deleting a product');

      returnResponseMessage(res, 200, 'Product deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  public async getProductById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findOne({ where: { id } });

      if (!product) throw new BadRequestError('Product not found');

      res.send(product);
    } catch (error) {
      next(error);
    }
  }

  public async getAllProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductModel.findAndCountAll(new ProductFilterByQuery(req.query).init());
      res.send({
        count: products.count,
        products: products.rows
      });
    } catch (error) {
      next(error);
    }
  }

  public async addToFavorites(req: Request<{}, {}, {prodId: string}>, res: Response, next: NextFunction) {
    try {
      const { prodId } = req.body
      if(!prodId) throw  new BadRequestError("Product not Fount");

      const user = await UserModel.findOne({where: {id: req.user.id}})
      if(!user) throw  new BadRequestError("User not Fount");

      const alreadyAdd = user.favorites.includes(prodId)
      if(alreadyAdd) throw  new BadRequestError("This product is already in favorites");
      user.favorites = [...user.favorites, prodId]

      await user.save()

      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  public async deleteToFavorites(req: Request<{}, {}, {prodId: string}>, res: Response, next: NextFunction) {
    try {
      const { prodId } = req.body
      if(!prodId) throw  new BadRequestError("Product not Fount");

      const user = await UserModel.findOne({where: {id: req.user.id}})
      if(!user) throw  new BadRequestError("User not Fount");

      const exist = user.favorites.indexOf(prodId)
      if(exist === -1) throw  new BadRequestError("There is no such product in favorites");

      user.favorites = [...user.favorites.slice(0, exist), ...user.favorites.slice(exist + 1)]

      await user.save()
      res.send(user);
    } catch (error) {
      next(error);
    }
  }

}

export default ProductController;
