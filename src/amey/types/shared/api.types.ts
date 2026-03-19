export interface ApiResponse<T = any> {
  isSuccessful: boolean;
  result: T;
  exceptionMessage: string;
  statusCode: number;
}

export interface GetAllProductsProps {
  _id: string;
  categoryName: string;
  children: [];
  parentId: null;
  products: [];
}

export interface Product {
  categoryId: string;
  description: string;
  id: string;
  images: string[];
  otherDetails: {};
  price: number;
  sku: string;
  title: string;
}

export interface OtherDetails {
  isNewArrival: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  isDiscounted: boolean;
}
