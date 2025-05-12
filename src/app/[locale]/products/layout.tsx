"use client";

import { FC, ReactNode } from "react";
import { clsx } from "clsx";

interface ProductsLayoutProps {
  children: ReactNode;
}

const ProductsLayout: FC<ProductsLayoutProps> = ({ children }) => {
  return (
    <div className={clsx(
      "min-h-screen snap-start scroll-smooth",
    )}>
      {children}
    </div>
  );
};

export default ProductsLayout;
