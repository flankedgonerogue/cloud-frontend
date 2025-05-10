"use server";

import { Axios } from "axios";
import { ICreateOrder, ICreateSession, IUpdateSession, mapCartToOrderLines, MerchantSession } from "./klarna.types";
import env, { getFilledURL, getKlarnaOrderCreationURL, getKlarnaSessionUpdateURL } from "./env";

const axios = new Axios({
  headers: {
    Authorization: `Basic ${env.klarnaPassword}`,
    "Content-Type": "application/json",
  },
});

export async function createSession(props: ICreateSession): Promise<MerchantSession> {
  if (props.items.length == 0) throw new Error("Item length cannot be zero");

  const order_lines = mapCartToOrderLines(props.items);

  const data = {
    acquiring_channel: "ECOMMERCE",
    intent: "buy",
    purchase_country: "SE",
    purchase_currency: "SEK",
    locale: props.locale,
    order_amount: order_lines.reduce((total, orderLine) => total + orderLine.total_amount, 0),
    order_lines: order_lines,
    merchant_urls: {
      authorization: env.selfAuthorizationCallbackURL,
    },
  };

  const response = await axios.post(env.klarnaSessionCreateEndpoint, JSON.stringify(data));

  console.debug("Create Session status:", response.status);
  console.debug("Create Session data:", response.data);

  if (response.status < 200 && response.status > 299) throw new Error("Failed to create session");

  return JSON.parse(response.data);
}

export async function updateSession({ sessionId, locale, items }: IUpdateSession): Promise<void> {
  const order_lines = mapCartToOrderLines(items);

  const data = {
    locale: locale,
    order_lines: order_lines,
    order_amount: order_lines.reduce((total, orderLine) => total + orderLine.total_amount, 0),
  };

  const response = await axios.post(getKlarnaSessionUpdateURL(sessionId), JSON.stringify(data));
  console.debug("Update Session status:", response.status);
  console.debug("Update Session response:", response.data);
}

export async function createOrder(props: ICreateOrder): Promise<{
  redirect_url: string;
}> {
  if (props.items.length == 0) throw new Error("Item length cannot be zero");

  const order_lines = mapCartToOrderLines(props.items);

  const data = {
    purchase_country: "SE",
    purchase_currency: "SEK",
    locale: props.locale,
    order_amount: order_lines.reduce((total, orderLine) => total + orderLine.total_amount, 0),
    order_lines: order_lines,
    merchant_urls: {
      confirmation: getFilledURL(env.selfPaymentSuccessURL, props.locale),
      notification: getFilledURL(env.selfPaymentNotificationURL, props.locale),
    },
    shipping_address: props.shipping_address,
    billing_address: props.billing_address,
  };

  const response = await axios.post(getKlarnaOrderCreationURL(props.authorizationToken), JSON.stringify(data));

  console.debug("Create Order status:", response.status);
  console.debug("Create Order data:", response.data);

  // For now, any sort of error results in a bad transaction.
  if (response.status < 200 && response.status > 299)
    return {
      redirect_url: getFilledURL(env.selfPaymentErrorURL, props.locale),
    };

  const responseData = JSON.parse(response.data);

  // TODO Send a webhook which contains merchant_reference1 and responseData.order_id
  console.debug(`Created order ${responseData.order_id}`);

  return {
    redirect_url:
      responseData.redirect_url.length > 0
        ? responseData.redirect_url
        : getFilledURL(env.selfPaymentErrorURL, props.locale),
  };
}
