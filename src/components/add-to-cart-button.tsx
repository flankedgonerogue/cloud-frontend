"use client";

import React from "react";
import type { Product, Variant } from "@/lib/types/types";
import { CartActions } from "@/store/cart.slice";
import { clsx } from "clsx";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { useTranslations } from "next-intl";

interface AddToCartButtonProps {
  productId: Product["id"];
  variantId: Variant["id"];
  name: Product["name"];
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId, variantId, name }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const t = useTranslations("pond");

  const handleAddToCart = () => {
    dispatch(
      CartActions.addToCart({
        productId: productId,
        quantity: 1,
        variantId: variantId,
      }),
    );
    toast.success(`Added ${name} to cart`, {
      action: {
        label: "Go to cart",
        onClick: () => {
          router.push("/checkout");
        },
      },
    });
  };

  return (
    <button
      className={clsx(
        "h-[40px] w-[200px] cursor-pointer text-nowrap rounded-full px-3 text-center text-[14px] text-[#0A0A0A] sm:w-[250px] sm:px-0",
        "bg-[#91E25C] text-[#0A0A0A] transition-all duration-150 ease-in-out hover:bg-[#ADF47E]",
      )}
      onClick={handleAddToCart}
    >
      {t("addToCartButton")}
    </button>
  );
};

export default AddToCartButton;
