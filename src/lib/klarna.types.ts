import env from "./env";
import { CartItem } from "./types/types";
import { getProductById, getVariantById } from "./utils";

export interface MerchantSession {
  client_token: string; // Client token to initialize the JS SDK
  session_id: string; // Session ID for identifying issues with Klarna
  payment_method_categories?: PaymentMethodCategory[]; // Optional list of available payment method categories
}

interface PaymentMethodCategory {
  asset_urls?: AssetUrls; // Optional URLs for assets associated with the payment method
  identifier?: string; // e.g., "klarna", "pay_now", etc.
  name?: string; // Display name like "Pay with Klarna"
}

interface AssetUrls {
  descriptive?: string; // URL of the descriptive asset
  standard?: string; // URL of the standard asset
}

export interface IOrderLine {
  name: string;
  quantity: number;
  total_amount: number;
  unit_price: number;
  image_url?: string;
  merchant_data?: string;
  product_identifiers?: {
    brand?: string;
    category_path?: string;
    global_trade_item_number?: string;
    manufacturer_part_number?: string;
    color?: string;
    size?: string;
  };
  product_url?: string;
  quantity_unit?: string;
  reference?: string;
  tax_rate?: number;
  total_discount_amount?: number;
  total_tax_amount?: number;
  type?:
    | "physical"
    | "discount"
    | "shipping_fee"
    | "sales_tax"
    | "digital"
    | "gift_card"
    | "store_credit"
    | "surcharge";
  subscription?: {
    name: string;
    interval: "DAY" | "WEEK" | "MONTH" | "YEAR";
    interval_count: number;
  };
}

export interface ICreateSession {
  locale: string;
  items: CartItem[];
}

export interface IUpdateSession {
  sessionId: string;
  locale: string;
  items: CartItem[];
}

export interface ICreateOrder {
  locale: string;
  items: CartItem[];
  authorizationToken: string;
  billing_address: {
    given_name: string;
    family_name: string;
    email: string;
    street_address: string;
    postal_code: string;
    city: string;
    phone: string;
    country: string;
  };
  shipping_address: {
    given_name: string;
    family_name: string;
    email: string;
    street_address: string;
    postal_code: string;
    city: string;
    phone: string;
    country: string;
  };
}

export function mapCartToOrderLines(cartItems: CartItem[]): IOrderLine[] {
  // Clean the cart items
  const items = cartItems
    .map((item) => {
      const product = getProductById(item.productId);
      const variant = getVariantById(item.variantId);

      if (!product || !variant) {
        return null;
      }

      return {
        product,
        variant,
        quantity: item.quantity,
      };
    })
    .filter((item) => item != null);

  const order_lines = items.map((item): IOrderLine => {
    return {
      name: `Pond ${item.variant.name} - ${item.product.name}`,
      quantity: item.quantity,
      total_amount: item.quantity * item.variant.unitPrice * (1 + item.variant.taxRate) * 100,
      tax_rate: item.variant.taxRate,
      unit_price: item.variant.unitPrice * 100,
      image_url: encodeURI(env.selfBaseURL + "pond/" + item.variant.name + "/" + item.product.name + ".jpg"),
      product_url: env.selfBaseURL,
      type: "physical",
    };
  });

  return order_lines;
}
