export interface Product {
  id: string;
  code: string;
  name: string;
  image_url: string;
  listed_price: string;
  minimum_price: string;
  minimum_saleable_range_count: number;
  min_order_range_count: number;
  price_after_tax: boolean;
  is_expirable: boolean;
  total_available_quantity: number;
  total_shipments: number;
  total_expired_quantity: number;
}

export interface ProductsResponse {
  items: Product[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

export interface ProductParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  productTypeId?: string;
}
