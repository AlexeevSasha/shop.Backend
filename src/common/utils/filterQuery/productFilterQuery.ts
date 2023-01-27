import { Op } from 'sequelize';
import { FilterByQuery } from './filterByQuery';


class ProductFilterByQuery extends FilterByQuery {
  constructor(query: Record<string, unknown>) {
    super(query);
  }

  private initSorting() {
    const sorting = this.query?.sorting;

    if (sorting === 'new') {
      this.options.order = [['updatedAt', 'DESC']];
    } else if (sorting === 'asc') {
      this.options.order = [['price', 'ASC']];
    } else if (sorting === 'desc') {
      this.options.order = [['price', 'DESC']];
    }
  }

  private initPrice() {
    const min = Number(this.query?.minPrice);
    const max = Number(this.query?.maxPrice);

    if (min && max) {
      this.options.where.price = { [Op.and]: { [Op.between]: [min, max] } };
    } else if (!min && max) {
      this.options.where.price = { [Op.lte]: max };
    } else if (!max && min) {
      this.options.where.price = { [Op.gte]: min };
    }
  }

  init() {
    super.init()
    this.initPrice();
    this.initSorting();
    return this.options;
  }
}

export default ProductFilterByQuery;
