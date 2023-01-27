import { Optional } from 'sequelize';

export interface ICategory {
  id: string;
  title: string;
}

export interface ICategoryCreationAttributes extends Optional<ICategory, 'id'> {}
