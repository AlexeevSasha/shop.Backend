import { Op, Order } from 'sequelize';

type OptionsT = {
  where: Record<string, object>,
  order?: Order,
  limit?: number,
  offset?: number
}

export class FilterByQuery {
  private query;
  private readonly options: OptionsT;

  constructor(query: Record<string, unknown>) {
    this.query = query;
    this.options = { where: {} };
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

  private initPaginate() {
    const pageQuery = parseInt(this.query.page as string);
    const sizeQuery = parseInt(this.query.size as string);

    let page = 0;
    let size = 10;

    if (!Number.isNaN(pageQuery) && pageQuery > 0) {
      page = pageQuery - 1;
    }
    if (!Number.isNaN(sizeQuery) && !(sizeQuery < 1)) {
      size = sizeQuery;
    }

    this.options.limit = size;
    this.options.offset = page * size
  }

  init() {
    this.initPrice();
    this.initSorting();
    this.initPaginate();
    return this.options;
  }
}
