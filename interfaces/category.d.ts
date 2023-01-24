export type CategoryT = {
  id: string
  title: string
};

export type CategoryModelT = Omit<CategoryT, 'id'>;
