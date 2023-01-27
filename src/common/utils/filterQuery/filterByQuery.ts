import { Order } from 'sequelize';

type OptionsT = {
  where: Record<string, object>,
  order?: Order,
  limit?: number,
  offset?: number
}

export class FilterByQuery {
  public query;
  readonly options: OptionsT;

  constructor(query: Record<string, unknown>) {
    this.query = query;
    this.options = { where: {} };
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

  init(){
    this.initPaginate();
    return this.options;
  }
}
