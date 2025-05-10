import { FormSchema } from "@/components/customer-details-form";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEBHOOK_URL,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitCheckoutFormData(customerData: FormSchema, cartData: any) {
  try {
    const ipRes = await axios.get("https://api.ipify.org?format=json");
    const ip = ipRes.data.ip;

    const userAgent = navigator.userAgent;

    const data = {
      event: "checkout",
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
      customerDetails: customerData,
      cartDetails: cartData,
    };

    await axiosInstance.post("", JSON.stringify(data));
    console.log("Webhook data submitted successfully:", data);
  } catch (error) {
    console.error("Webhook error submitting data:", error);
  }
}
