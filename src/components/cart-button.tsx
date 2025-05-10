"use client";

import { AnimatePresence } from "framer-motion";
import CartSidebar from "./cart-sidebar";
import { useAppSelector } from "@/lib/hooks";
import { FC, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const CartButton: FC<{ className?: string }> = ({ className }) => {
  const t = useTranslations("cartSidebar");
  const [isCartSidebarHidden, setIsCartSidebarHidden] = useState(true);
  const items = useAppSelector((state) => state.cart.items);

  return (
    <>
      <button className={clsx(className, "cursor-pointer p-2")} onClick={() => setIsCartSidebarHidden(false)}>
        <p className="text-green-500">
          {t("cart")}
          <span className="text-green-300">({items.length})</span>
        </p>
      </button>

      <AnimatePresence>{!isCartSidebarHidden && <CartSidebar setIsHidden={setIsCartSidebarHidden} />}</AnimatePresence>
    </>
  );
};

export default CartButton;
