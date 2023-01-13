import { NextFunction, Request, Response } from 'express';

class ProductController {
  public async create(req: Request, res: Response, next: NextFunction) {
    res.send('z nen');
  }
}

export default ProductController;
