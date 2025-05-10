import { FC } from "react";
import CartDetails from "@/components/cart-details";
import CustomerDetails from "@/components/customer-details";

const CheckoutPage: FC = () => {
  return (
    <main
      id="checkout-page"
      className="bg-alternative text-primary flex h-full w-screen flex-col gap-8 px-6 py-24 md:flex-row md:px-40"
    >
      <section id="cart-details" className="w-full md:mr-auto md:w-2/5">
        <CartDetails />
      </section>
      <hr className="w-full bg-white md:hidden" />
      <section id="customer-details" className="w-full md:w-2/5">
        <CustomerDetails />
      </section>
    </main>
  );
};

export default CheckoutPage;
