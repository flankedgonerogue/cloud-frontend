"use client";

import { FC, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { products } from "@/data/products";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductPage: FC = () => {
  const vantacoreVariants = products.slice(4, 8);
  const nexaframeVariants = products.slice(8, 12);
  const router = useRouter();

  const pondRef = useRef(null);
  const vantacoreRef = useRef(null);
  const nexaframeRef = useRef(null);

  const pondInView = useInView(pondRef, { once: true, amount: 0.5 });
  const vantacoreInView = useInView(vantacoreRef, { once: true, amount: 0.5 });
  const nexaframeInView = useInView(nexaframeRef, { once: true, amount: 0.5 });

  const handleRoute = (productPath: string) => {
    router.push(`/products/${productPath}`)
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#262626]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
          src="https://placehold.co/1920x1080.mp4"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl">Discover our three amazing products: Pond, Vantacore, and Nexaframe.</p>
        </div>
      </section>

      {/* Pond Section */}
      <section ref={pondRef} className="py-24 bg-green-500">
        <div onClick={() => handleRoute('pond')} className="container mx-auto px-4 gap-8 flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={pondInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ 
                delay: 0.25,
                duration: 0.5
            }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h2 className="text-3xl font-bold mb-4">Pond</h2>
            <p className="text-lg">Pond combines cutting-edge display technology with a sleek selection of elegant color options, built to enhance your storefront with style and visibility. Each variant is engineered for clarity, durability, and aesthetic appeal—making your message stand out while complementing your space.</p>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={pondInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ 
                delay: 0.25,
                duration: 0.5
            }}
            className="md:w-1/2"
          >
            <Image src="/pond/55%22/Forest Green.jpg" width={4000} height={3000} alt="Pond" className="w-full h-auto rounded-lg"/>
          </motion.div>
        </div>
      </section>

      {/* Vantacore Section */}
      <section ref={vantacoreRef} className="py-32 bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#262626] text-white">
        <div onClick={() => handleRoute('vantacore')} className="container mx-auto px-4 gap-8 flex flex-col md:flex-row-reverse items-center">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={vantacoreInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ 
                delay: 0.25,
                duration: 0.5
            }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h2 className="text-3xl font-bold mb-4">Vantacore</h2>
            <p className="text-lg">Vantacore revolutionizes your gaming experience with innovative technology and sleek designs. Elevate your setup with cutting-edge gear crafted for performance and style. Stay ahead of the game and immerse yourself in the future of gaming, where precision, power, and aesthetics come together for an unparalleled experience.</p>
          </motion.div>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={vantacoreInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ 
                delay: 0.25,
                duration: 0.5
            }}
            className="md:w-1/2"
          >
            <img src={vantacoreVariants[0].image} alt="Vantacore" className="w-full h-auto rounded-lg shadow-lg" />
          </motion.div>
        </div>
      </section>

      {/* Nexaframe Section */}
      <section ref={nexaframeRef} className="py-24 bg-green-500">
        <div onClick={() => handleRoute('nexaframe')} className="container mx-auto px-4 gap-8 flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={nexaframeInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ 
                delay: 0.25,
                duration: 0.5
            }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h2 className="text-3xl font-bold mb-4">Nexaframe</h2>
            <p className="text-lg">Nexaframe blends professional elegance with modern design to enhance any workspace. Its sleek, functional structure adds sophistication while maximizing productivity. Whether for home or office use, Nexaframe delivers the perfect balance of style and practicality, making it an essential addition to your work environment.</p>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={nexaframeInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ 
                delay: 0.25,
                duration: 0.5 
            }}
            className="md:w-1/2"
          >
            <img src={nexaframeVariants[0].image} alt="Nexaframe" className="w-full h-auto rounded-lg shadow-lg" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
