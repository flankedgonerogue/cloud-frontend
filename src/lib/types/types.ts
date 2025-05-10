export interface Variant {
  id: number;
  name: string;
  unitPrice: number;
  taxRate: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  hex: string;
  shade: "Dark" | "Light";
  image: string;
}

export interface CartItem {
  productId: number;
  variantId: number;
  quantity: number;
}
