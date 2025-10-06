import { IProductResponseList } from './product-response-list';

export interface IProductsResponse {
  message: string;
  data: IProductResponseList[];
}
