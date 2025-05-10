import type { Product, Variant } from "@/lib/types/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Morel Brown",
    hex: "#A58D71",
    description: "Pantone 532 C",
    shade: "Dark",
    image: "https://placehold.co/1920x1080",
  },
  {
    id: 2,
    name: "Stellar",
    description: "Pantone 3715C",
    hex: "#0A0A0A",
    shade: "Dark",
    image: "https://placehold.co/1920x1080",
  },
  {
    id: 3,
    name: "Forest Green",
    description: "Pantone 532 C",
    hex: "#4F5D49",
    shade: "Dark",
    image: "https://placehold.co/1920x1080",
  },
  {
    id: 4,
    name: "Snowdrift",
    description: "Pantone 532 C",
    hex: "#F2EDE4",
    shade: "Light",
    image: "https://placehold.co/1920x1080",
  },
];

export const variants: Variant[] = [
  { id: 1, name: '32"', unitPrice: 4900, taxRate: 0.25 },
  { id: 2, name: '43"', unitPrice: 6900, taxRate: 0.25 },
  { id: 3, name: '55"', unitPrice: 9900, taxRate: 0.25 },
];
