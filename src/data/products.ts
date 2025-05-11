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
  // Gaming Products
  {
    id: 5,
    name: "Neon Pulse",
    description: "Galone 767 C",
    hex: "#FF00FF",
    shade: "Dark",
    image: "https://placehold.co/1920x1080",
  },
  {
    id: 6,
    name: "Cyber Black",
    description: "Galone 721 C",
    hex: "#1A1A1A",
    shade: "Dark",
    image: "https://placehold.co/1920x1080",
  },
  {
    id: 7,
    name: "Quantum Blue",
    description: "Galone 769 C",
    hex: "#0066FF",
    shade: "Dark",
    image: "https://placehold.co/1920x1080",
  },
  {
    id: 8,
    name: "Phantom Silver",
    description: "Galone 777 C",
    hex: "#C0C0C0",
    shade: "Light",
    image: "https://placehold.co/1920x1080",
  },
  // Workstation Products
  {
    id: 9,
    name: "Professional Black",
    description: "Radon 455 C",
    hex: "#000000",
    shade: "Dark",
    image: "https://placehold.co/1920x1080",
  },
  {
    id: 10,
    name: "Executive Gray",
    description: "Radon 467 C",
    hex: "#808080",
    shade: "Dark",
    image: "https://placehold.co/1920x1080",
  },
  {
    id: 11,
    name: "Platinum White",
    description: "Radon 479 C",
    hex: "#E5E4E2",
    shade: "Light",
    image: "https://placehold.co/1920x1080",
  },
  {
    id: 12,
    name: "Graphite",
    description: "Radon 458 C",
    hex: "#2F4F4F",
    shade: "Dark",
    image: "https://placehold.co/1920x1080",
  },
];

export const variants: Variant[] = [
  { id: 1, name: '32"', unitPrice: 4900, taxRate: 0.25 },
  { id: 2, name: '43"', unitPrice: 6900, taxRate: 0.25 },
  { id: 3, name: '55"', unitPrice: 9900, taxRate: 0.25 },
];
