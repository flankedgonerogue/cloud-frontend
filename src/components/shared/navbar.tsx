"use client";

import { FC, useState } from "react";
import CartButton from "@/components/cart-button";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";

const Navbar: FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
 

  let currentPage: string;
  switch (pathname) {
    case "/":
      currentPage = "home";
      break;
    case "/checkout":
      currentPage = "checkout";
      break;
    default:
      currentPage = "";
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery("");

    const input = document.activeElement as HTMLElement;
    if (input) {
      input.blur();
    }

    router.push(`/products/${searchQuery}`)
  };

  return (
    <div className="bg-background-dark fixed left-0 top-0 z-50 flex h-20 w-screen items-center">
      <Link href="/" className="ml-6 md:ml-20">
        <Image src="/logo_light.png" width={854} height={231} alt="North2 logo" className="h-8 w-auto" />
      </Link>
      {currentPage === "home" && (
        <div className="ml-8 flex flex-row gap-4">
          <Link href="/products" className="content-center p-2 text-center text-green-500 hover:text-green-400">
            Shop
          </Link>
          <Link href="/about" className="content-center p-2 text-center text-green-500 hover:text-green-400">
            About
          </Link>
        </div>
      )}
      {currentPage !== "home" && (
        <div className="ml-8 flex flex-row gap-4">
          <Link href="/products/pond" className="content-center p-2 text-center text-green-500 hover:text-green-400">
            Pond
          </Link>
          <Link href="/products/vantacore" className="content-center p-2 text-center text-green-500 hover:text-green-400">
            VantaCore
          </Link>
          <Link href="/products/nexaframe" className="content-center p-2 text-center text-green-500 hover:text-green-400">
            NexaFrame
          </Link>
        </div>
      )}
      <div className="ml-auto mr-2 flex flex-row gap-2 md:mr-20">
        <form onSubmit={handleSearch} className="ml-8 mr-4 flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-black/30 text-white border border-green-500/30 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
          </div>
        </form>
        {currentPage === "checkout" && (
          <Link href="/" className="content-center p-2 text-center text-green-500">
            {t("store")}
          </Link>
        )}
        {currentPage !== "home" && (
          <Link href="/checkout" className="content-center p-2 text-center text-green-500">
            {t("checkout")}
          </Link>
        )}
        {currentPage !== "home" && (
          <CartButton />
        )}
        <button
          className="cursor-pointer content-center rounded-2xl px-4 py-2 text-center text-white outline-1 hover:outline-2 -outline-offset-4"
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
