import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/app.css";
import Navbar from "@/components/shared/navbar";
import React, { ReactNode } from "react";
import { clsx } from "clsx";
import { Toaster } from "sonner";
import StoreProvider from "@/app/store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "North²",
  description: "Shaking up the digital-out-of-home advertising scene.",
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale?.toString()} className={clsx("bg-[#0A0A0A] antialiased scrollbar-hide", inter.className)}>
      <head></head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <Navbar />
            {children}
            <Toaster />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
