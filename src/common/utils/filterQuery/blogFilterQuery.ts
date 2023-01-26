import { FilterByQuery } from './filterByQuery';


class BlogFilterByQuery extends FilterByQuery {
  constructor(query: Record<string, unknown>) {
    super(query);
  }

  private initSorting() {
    const sorting = this.query?.sorting;

    if (sorting === 'new') {
      this.options.order = [['updatedAt', 'DESC']];
    } else if (sorting === 'asc') {
      this.options.order = [['views', 'ASC']];
    } else if (sorting === 'desc') {
      this.options.order = [['views', 'DESC']];
    }
  }

  init() {
    super.init();
    this.initSorting();
    return this.options;
  }
}

export default BlogFilterByQuery;
