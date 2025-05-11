"use client";

import { Axios } from "axios";
import { ICreateOrder, ICreateSession, IUpdateSession, MerchantSession } from "./klarna.types";

const axios = new Axios({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function createSession(props: ICreateSession): Promise<MerchantSession> {
  const response = await axios.post('/klarna/session', JSON.stringify(props));

  if (response.status >= 400) {
    throw new Error(response.statusText);
  }

  return JSON.parse(response.data);
}

export async function updateSession(props: IUpdateSession): Promise<void> {
  const response = await axios.patch('/klarna/session', props);
}

export async function createOrder(props: ICreateOrder): Promise<{
  redirect_url: string;
}> {
  const response = await axios.post('/klarna/order', JSON.stringify(props));

  if (response.status >= 400) {
    throw new Error(response.statusText);
  }

  return JSON.parse(response.data);
}
