export interface Product {
  _id: number;
  title: string;
  price: number;
  imageCover: string;
  description: string;
  images: string[];
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  reviews: any[];
}
