interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface ProductWithVendor {
  id: number;
  product_name: string;
  price: number;
  stock: number;
  user_id: number;
  vendor_name: string;
}

interface ProductResponse {
  data: ProductWithVendor[];
}

interface NewProduct {
  name: string;
  price: number;
  stock: number;
}

const ProductInitial: NewProduct = {
  name: '',
  price: 0,
  stock: 0,
};

export type { Product, NewProduct, ProductResponse, ProductWithVendor };
export { ProductInitial };
