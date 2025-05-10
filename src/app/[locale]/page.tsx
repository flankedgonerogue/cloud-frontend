"use client";

import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, variants } from "@/data/products";
import { clsx } from "clsx";
import AddToCartButton from "@/components/add-to-cart-button";
import { formatCurrency, getProductById, getVariantById } from "@/lib/utils";

import * as React from "react";
import { Select } from "radix-ui";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

const Page: FC = () => {
  const t = useTranslations("pond");
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [selectedVariantId, setSelectedVariantId] = useState<number>(3);

  return (
    <main
      id="product-page"
      className={clsx(
        "min-h-screen w-screen",
        getProductById(selectedProductId)?.shade === "Dark" ? "text-white" : "text-black",
        "transition-colors duration-500 ease-linear",
        "flex flex-col items-center overflow-clip px-6 pb-6 pt-28 text-[1rem] md:flex-row md:gap-x-20 md:px-40 md:pt-20 md:text-[1.25rem]",
      )}
      style={{
        backgroundColor: getProductById(selectedProductId)?.hex,
      }}
    >
      <div className="flex flex-col gap-6 md:w-1/2">
        <h1 className="text-[1.75rem] md:text-[2rem]">{t("productName")}</h1>
        <p>{t("description")}</p>
        <div className="flex flex-col gap-4 md:flex-row">
          {products.map((product) => (
            <motion.button
              key={product.id}
              className={clsx(
                "h-[50px] w-[50px] max-w-[275px] cursor-pointer overflow-hidden text-nowrap rounded-full border-2 md:max-w-[350px]",
                getProductById(selectedProductId)?.shade === "Light" ? "border-black" : "border-white",
              )}
              style={{
                backgroundColor: product.hex,
              }}
              animate={
                selectedProductId === product.id
                  ? {
                      width: "350px",
                    }
                  : { width: "50px" }
              }
              transition={{
                duration: 0.5,
              }}
              onClick={() => setSelectedProductId(product.id)}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={selectedProductId === product.id ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <strong className="font-medium">{product.name}</strong> -{" "}
                <span className="">{product.description}</span>
              </motion.span>
            </motion.button>
          ))}
        </div>
        <Select.Root
          defaultValue="3"
          onValueChange={(value) => {
            console.debug(value);
            setSelectedVariantId(parseInt(value));
          }}
        >
          <Select.Trigger
            className={clsx(
              "bg-primary text-alternative inline-flex h-[50px] w-4/5 items-center justify-between gap-[5px] rounded border-2 px-[16px] py-[12px] leading-none outline-none",
              getProductById(selectedProductId)?.shade === "Light" ? "border-black" : "border-gray-700",
            )}
            aria-label="variant"
          >
            <Select.Value placeholder="Select a variant…" />
            <Select.Icon className="text-alternative">
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-primary overflow-hidden rounded-md">
              <Select.ScrollUpButton className="bg-primary text-alternative flex h-[25px] cursor-default items-center justify-center">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-[5px]">
                {variants.map((variant) => (
                  <Select.Item
                    key={variant.id}
                    className="text-alternative data-[disabled]:text-primary/20 relative flex select-none items-center rounded-[3px] px-[32px] py-[12px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-200 data-[highlighted]:font-bold data-[highlighted]:outline-none"
                    value={variant.id.toString()}
                  >
                    <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                      <CheckIcon />
                    </Select.ItemIndicator>
                    <Select.ItemText>
                      {variant.name} — {formatCurrency(variant.unitPrice)} excl. VAT
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="text-alternative bg-primary flex h-[25px] cursor-default items-center justify-center">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <AddToCartButton
          productId={selectedProductId}
          variantId={selectedVariantId}
          name={getProductById(selectedProductId)?.name + " " + getVariantById(selectedVariantId)?.name}
        />
      </div>
      <div className="hidden w-1/2 flex-col md:flex">
        <AnimatePresence mode="wait">
          <motion.img
            className="rounded-lg shadow"
            initial={{
              x: 300,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -300,
              opacity: 0,
            }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.5,
            }}
            src={getProductById(selectedProductId)?.image}
            key={getProductById(selectedProductId)?.id}
            alt={getProductById(selectedProductId)?.name}
          ></motion.img>
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Page;
