import { Optional } from 'sequelize';


export interface ICart {
  id: string;
  products: {
    products: string,
    count: number,
    color: string
    price: number;
  }[];
  cartTotal: number;
  cartBy: string;

}

export interface ICartCreationAttributes extends Optional<ICart, 'id'> {
}
