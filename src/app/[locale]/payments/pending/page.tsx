import Link from "next/link";
import { FC } from "react";

const SuccessPage: FC = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-2 px-4 text-white">
      <h1 className="text-center text-lg max-sm:text-wrap sm:text-3xl">
        Your payment is pending but we&apos;ve received your order!
      </h1>
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
