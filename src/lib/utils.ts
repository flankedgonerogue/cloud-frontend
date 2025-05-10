import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, Variant } from "./types/types";
import { products, variants } from "@/data/products";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("se-SE", {
    style: "currency",
    currency: "SEK",
    trailingZeroDisplay: "stripIfInteger",
  }).format(value);
}

export function getProductById(productId: number): Product | undefined {
  return products.find((product) => product.id === productId);
}

export function getVariantById(variantId: number): Variant | undefined {
  return variants.find((variant) => variant.id === variantId);
}

export function getVariantUnitPrice(variantId: number): number {
  const variant = getVariantById(variantId);
  if (!variant) return 0;

  return variant.unitPrice;
}
