import { useLocale } from "next-intl";
import Link from "next/link";
import { FC } from "react";

const ErrorPage: FC = () => {
  const locale = useLocale();

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center space-y-2 px-4 text-white">
      <h1 className="text-center text-lg text-red-400 sm:text-3xl">
        An error occurred while processing your transaction.
      </h1>
      <div className="text-sm sm:text-2xl">
        Please try again or{" "}
        <Link className="underline hover:text-white/90" href={`https://www.north2.se/${locale}/contact`}>
          {" "}
          contact support
        </Link>
        .
      </div>
    </main>
  );
};

export default ErrorPage;
