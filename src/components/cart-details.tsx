"use client";

import { FC } from "react";
import { CartItem as CartItemType } from "@/lib/types/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { CartActions } from "@/store/cart.slice";
import { Link } from "@/i18n/navigation";
import { formatCurrency, getProductById, getVariantById, getVariantUnitPrice } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

const CartItem: FC<{ item: CartItemType }> = ({ item }) => {
  const t = useTranslations("checkout.cartDetails");
  const dispatch = useAppDispatch();
  const product = getProductById(item.productId);
  const variant = getVariantById(item.variantId);

  if (product === undefined || variant === undefined) return null;

  return (
    <motion.div
      className="border-primary mb-6 rounded-lg border p-4"
      initial={{
        opacity: 0,
        y: 20, // Initial Y position (off-screen or below)
      }}
      animate={{
        opacity: 1,
        y: 0, // Move to normal position
      }}
      exit={{
        opacity: 0,
        y: -20, // Move up when exiting
      }}
      layout
    >
      <h3 className="mb-4 text-xl font-semibold">{product?.name}</h3>
      <p>{variant.name}</p>
      <p className="mb-2 flex flex-row items-center gap-2">
        <span className="mr-auto">
          {t("quantity")}
          {item.quantity}
        </span>
        <Button
          className="text-alternative aspect-square cursor-pointer"
          onClick={() =>
            dispatch(
              CartActions.updateQuantity({
                productId: item.productId,
                variantId: item.variantId,
                quantity: Math.max(item.quantity - 1, 1),
              }),
            )
          }
        >
          -
        </Button>
        <Button
          className="text-alternative aspect-square cursor-pointer"
          onClick={() =>
            dispatch(
              CartActions.updateQuantity({
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity + 1,
              }),
            )
          }
        >
          +
        </Button>
        <Button
          className="text-alternative cursor-pointer"
          onClick={() => {
            return dispatch(
              CartActions.removeFromCart({
                productId: item.productId,
                variantId: item.variantId,
              }),
            );
          }}
        >
          {t("remove")}
        </Button>
      </p>
      <p className="mb-2">
        {t("price")}
        {formatCurrency(variant.unitPrice)}
      </p>
      <p className="mb-2">
        {t("tax")}
        {formatCurrency(variant.unitPrice * variant.taxRate)}
      </p>
    </motion.div>
  );
};

const CartDetails: FC = () => {
  const t = useTranslations("checkout.cartDetails");
  const items = useAppSelector((state) => state.cart.items);

  return (
    <div id="cart-details-container" className="text-primary flex h-full w-full flex-col">
      <h1 className="text-4xl font-bold">Cart Details</h1>
      {/* Cart items will be displayed here */}
      <div className="mt-8 flex flex-col">
        <AnimatePresence mode="sync">
          {items.map((item) => (
            <CartItem key={`${item.productId}-${item.variantId}`} item={item} />
          ))}
          <motion.p
            key="empty-cart-message"
            style={{
              opacity: items.length === 0 ? "1" : "0",
            }}
            layout
          >
            {t("emptyMsg")}
            <Link href="/" className="underline">
              {t("emptyLink")}
            </Link>
          </motion.p>
          <motion.button
            id="update-cart-button"
            key="update-cart-button"
            style={{
              opacity: items.length === 0 ? "0" : "1",
              display: items.length === 0 ? "none" : "block",
            }}
            className="transition-color cursor-pointer rounded-lg bg-white/20 px-4 py-2 text-white duration-150 hover:bg-white/40"
            layout
          >
            {t("updateCartButton")}
          </motion.button>
          <motion.div className="mt-8 text-2xl" layout>
            {t("total")}
            {formatCurrency(
              items.reduce((total, item) => {
                return (
                  total +
                  getVariantUnitPrice(item.variantId) *
                    item.quantity *
                    (1 + (getVariantById(item.variantId)?.taxRate || 0))
                );
              }, 0),
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CartDetails;
