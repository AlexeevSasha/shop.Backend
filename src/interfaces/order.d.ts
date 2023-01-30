import { Optional } from 'sequelize';
import { ORDER_STATUS } from '../common/constants/order';

exp;

export interface IOrder {
  id: string;
  products: {
    products: string,
    count: number,
    color: string
    price: number;
  }[];
  payment: string;
  status: ORDER_STATUS;
  orderBy: string;
}

export interface IOrderCreationAttributes extends Optional<IOrder, 'id'> {}
