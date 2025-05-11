"use client";

import { FC, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import Image from "next/image";
import * as React from "react";
import { redirect } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";

const Page: FC = () => {
  return (
    <main
      id="product-page"
      className={clsx(
        "min-h-screen w-screen relative overflow-clip",
        "flex flex-col items-center justify-center px-4 pb-8 pt-32 md:flex-row md:gap-x-20 md:px-32 md:pt-20",
        "bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#203a43]"
      )}
    >
      <div className="flex flex-row items-center justify-center w-full">
        <motion.div
          className="flex flex-col gap-10 text-white w-[50%]"
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            ease: "easeIn"
          }}
        >
          <div className="flex flex-col gap-5">
            <h1 className="text-6xl font-bold leading-tight">
              Innovative displays for your business
            </h1>
            <p className="text-2xl">
              Discover high-quality, commercial-grade displays designed for professional use
            </p>
            <p className="text-green-200 text-lg">
              Elevate your workspace with North2's advanced technology
            </p>
          </div>
          <motion.button
            className={clsx(
              "w-[30%] p-4 rounded-2xl hover:cursor-pointer",
              "bg-gradient-to-r from-green-400 to-green-600 shadow-lg",
              "focus:outline-none focus:ring-4 focus:ring-green-300"
            )}
            whileTap={{
              scale: 0.9,
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 8px 32px 0 rgba(34,197,94,0.25)"
            }}
            onClick={() => redirect("/")}
          >
            Shop Now
          </motion.button>
        </motion.div>
        <motion.div
          className={clsx(
            "w-[70%]"
          )}
          initial={{
            opacity: 0,
            scale: 1.3,
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut"
          }}
        >
          <Image src="/screen.png" width={1920} height={1080} alt="North2 logo" className="h-full w-auto" />
        </motion.div>
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-green-400 opacity-20 rounded-full blur-3xl z-0" />
      </div>
      {/* <BackgroundBeams /> */}
    </main>
  );
};

export default Page;
