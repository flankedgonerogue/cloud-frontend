import Link from "next/link";
import { FC } from "react";

const SuccessPage: FC = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-0 px-4 text-white">
      <h1 className="text-center text-lg max-sm:text-wrap sm:text-3xl">Your order has been placed successfully</h1>
      <svg className="aspect-square h-[50px]" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="none"
          stroke="#4CAF50"
          strokeWidth="4"
          d="M14 27l7 7 16-16"
          strokeDasharray="40"
          strokeDashoffset="40"
        >
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            fill="freeze"
            repeatCount="indefinite"
            values="40;0;0;40;40"
            keyTimes="0;0.2;0.6;0.8;1"
          />
        </path>
      </svg>
      <div className="text-sm sm:text-2xl">
        Click here to{" "}
        <Link className="underline hover:text-white/90" href="/">
          continue shopping
        </Link>
        .
      </div>
    </main>
  );
};

export default SuccessPage;
