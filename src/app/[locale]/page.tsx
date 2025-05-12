"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Page: FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/products')
  }

  return (
    <main
      id="product-page"
      className={clsx(
        "min-h-screen w-screen relative",
        "flex flex-col items-center justify-center antialiased px-4 pb-8 pt-32 md:flex-row md:gap-x-20 md:px-32 md:pt-20",
        "bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#262626]"
      )}
    >
      <div className="flex flex-row items-center justify-center w-full z-10">
        <div className="flex flex-col gap-10 text-white w-[50%]">
          <div className="flex flex-col gap-5">
            <TextGenerateEffect words="Innovative displays for your business"/>
            <motion.div
              className="flex flex-col gap-5"
              initial={{
                opacity: 0,
                z: -10
              }}
              animate={{
                opacity: 1,
                z: 0
              }}
              transition={{
                delay: 1,
                duration: 1,
                ease: "easeIn"
              }}
            >
              <p className="text-2xl">
                Discover high-quality, commercial-grade displays designed for professional use
              </p>
              <p className="text-green-200 text-lg">
                Elevate your workspace with North2's advanced technology
              </p>
            </motion.div>
          </div>
          <motion.button
            className={clsx(
              "w-[30%] p-4 rounded-2xl hover:cursor-pointer",
              "bg-gradient-to-r from-green-400 to-green-600 shadow-lg",
              "focus:outline-none focus:ring-4 focus:ring-green-300"
            )}
            initial={{
              y: 20,
              opacity: 0
            }}
            animate={{
              y:0,
              opacity: 1,
              transition: {
                delay: 1,
                duration: 0.8,
                ease: "easeInOut"
              }
            }}
            whileTap={{
              scale: 0.9,
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 8px 32px 0 rgba(34,197,94,0.25)"
            }}
            onClick={handleClick}
          >
            Shop Now
          </motion.button>
        </div>
        <motion.div
          className={clsx(
            "w-[70%] select-none flex justify-end"
          )}
          initial={{
            opacity: 0,
            scale: 1.2,
            x: -80
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 20
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut"
          }}
        >
          <Image src="/screen-3.png" width={800} height={600} alt="North2 logo" className="h-full w-auto"/>
        </motion.div>
      </div>
      <BackgroundBeams />
    </main>
  );
};

export default Page;
