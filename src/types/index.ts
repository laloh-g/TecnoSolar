export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  sku: string;
  tag?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
