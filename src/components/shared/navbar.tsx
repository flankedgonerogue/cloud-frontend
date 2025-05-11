"use client";

import { FC } from "react";
import CartButton from "@/components/cart-button";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const Navbar: FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("navbar");
  const pathname = usePathname();
  let currentPage: string;
  switch (pathname) {
    case "/":
      currentPage = "home";
      break;
    case "/checkout":
      currentPage = "checkout";
      break;
    default:
      currentPage = "home";
  }

  return (
    <div className="bg-background-dark fixed left-0 top-0 z-50 flex h-20 w-screen items-center">
      <Link href="/" className="ml-6 md:ml-20">
        <Image src="/logo_light.png" width={854} height={231} alt="North2 logo" className="h-8 w-auto" />
      </Link>
      {currentPage === "home" && (
        <div className="ml-8 flex flex-row gap-4">
          <Link href="/pond" className="content-center p-2 text-center text-green-500 hover:text-green-400">
            Pond
          </Link>
          <Link href="/gaming" className="content-center p-2 text-center text-green-500 hover:text-green-400">
            VantaCore
          </Link>
          <Link href="/workstation" className="content-center p-2 text-center text-green-500 hover:text-green-400">
            NexaFrame
          </Link>
        </div>
      )}
      <div className="ml-auto mr-2 flex flex-row gap-2 md:mr-20">
        {" "}
        {currentPage === "checkout" && (
          <Link href="/" className="content-center p-2 text-center text-green-500">
            {t("store")}
          </Link>
        )}
        {currentPage === "home" && (
          <Link href="/checkout" className="content-center p-2 text-center text-green-500">
            {t("checkout")}
          </Link>
        )}
        <CartButton />
        <button
          className="cursor-pointer content-center rounded-2xl px-4 py-0 text-center text-white outline-2 -outline-offset-4"
          onClick={() => {
            router.push(pathname, {
              locale: locale === "en" ? "sv" : "en",
            });
          }}
        >
          {locale}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
