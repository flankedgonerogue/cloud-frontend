"use client";
import { useState, useEffect } from "react";

export const useIsMobile = () => {
  const window = globalThis.window;
  const [isMobile, setIsMobile] = useState<boolean>(window?.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window]);

  return isMobile;
};
