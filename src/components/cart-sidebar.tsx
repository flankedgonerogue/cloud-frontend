"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction, FC, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CartActions } from "@/store/cart.slice";
import { useRouter } from "@/i18n/navigation";
import { LucideX } from "lucide-react";
import { formatCurrency, getProductById, getVariantById, getVariantUnitPrice } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface CartItemProps {
  id: number;
  name: string;
  variant: string;
  variantId: number;
  price: number;
  quantity: number;
}

const CartItem: FC<CartItemProps> = ({ id, name, variant, variantId, price, quantity }) => {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      id={`product-${id}`}
      className="flex w-full flex-col items-center justify-between max-md:gap-2 md:flex-row"
      layout
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -10,
      }}
    >
      <div className="mr-auto flex flex-col">
        <p>
          {name} - {variant}
        </p>
        <p className="text-black/50">
          {formatCurrency(price)} x {quantity}, VAT: {formatCurrency(price * (getVariantById(variantId)?.taxRate || 0))}
        </p>
      </div>
      <div className="flex flex-row items-center gap-2 max-md:w-full md:gap-4">
        <Button
          className="border-alternative hover:bg-alternative/5 aspect-square cursor-pointer border"
          onClick={() => {
            dispatch(
              CartActions.updateQuantity({
                quantity: Math.max(1, quantity - 1),
                productId: id,
                variantId: variantId,
              }),
            );
          }}
        >
          -
        </Button>
        <p className="w-4 text-center">{quantity}</p>
        <Button
          className="border-alternative hover:bg-alternative/5 aspect-square cursor-pointer border"
          onClick={() => {
            dispatch(
              CartActions.updateQuantity({
                quantity: quantity + 1,
                productId: id,
                variantId: variantId,
              }),
            );
          }}
        >
          +
        </Button>
        <Button
          className="cursor-pointer bg-red-500 hover:bg-red-500/80 max-md:ml-auto"
          variant={"destructive"}
          onClick={() => {
            dispatch(
              CartActions.removeFromCart({
                productId: id,
                variantId: variantId,
              }),
            );
          }}
        >
          Remove
        </Button>
      </div>
    </motion.div>
  );
};

interface CartSidebarProps {
  setIsHidden: Dispatch<SetStateAction<boolean>>;
}

const CartSidebar: FC<CartSidebarProps> = ({ setIsHidden }) => {
  const t = useTranslations("cartSidebar");
  const router = useRouter();
  const items = useAppSelector((state) => state.cart.items);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setPrice(
      items.reduce((total, item) => {
        return (
          total +
          getVariantUnitPrice(item.variantId) * item.quantity * (1 + (getVariantById(item.variantId)?.taxRate || 0))
        );
      }, 0),
    );
  }, [items]);

  return (
    <>
      <motion.div
        id="cart-sidebar-container"
        className="bg-primary text-alternative fixed right-0 top-0 z-50 flex h-screen w-full flex-col gap-4 p-8 md:w-1/3"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <div className="flex flex-row">
          <p className="mr-auto text-[24px] font-semibold">{t("yourCart")}</p>
          <Button
            onClick={() => setIsHidden(true)}
            className="bg-alternative text-primary hover:bg-alternative/80 aspect-square cursor-pointer"
          >
            <LucideX />
          </Button>
        </div>
        <AnimatePresence mode="sync">
          {items.map((item) => {
            const product = getProductById(item.productId);
            const variant = getVariantById(item.variantId);
            const price = getVariantUnitPrice(item.variantId);

            return (
              <CartItem
                key={`${item.productId}-${item.variantId}`}
                id={item.productId}
                name={product?.name || ""}
                variant={variant?.name || ""}
                price={price}
                quantity={item.quantity}
                variantId={item.variantId}
              />
            );
          })}
        </AnimatePresence>
        <p className="text-[16px] font-medium">
          {t("totalPrice")}
          {formatCurrency(price)}
        </p>
        <Button
          onClick={() => {
            router.push("/checkout");
            setIsHidden(true);
          }}
          className="bg-alternative text-primary hover:bg-alternative/80 cursor-pointer"
        >
          {t("checkout")}
        </Button>
      </motion.div>
      <motion.div
        className="fixed left-0 top-0 z-40 flex h-screen w-screen bg-black/50"
        onClick={() => setIsHidden(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "tween",
          duration: 0.3,
        }}
      />
    </>
  );
};

export default CartSidebar;
