"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { createOrder, createSession, updateSession } from "@/lib/klarna.server";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";
import CustomerDetailsForm, { FormSchema } from "./customer-details-form";
import { useRouter } from "@/i18n/navigation";

export enum FlowState {
  Idle,
  CreatingSession,
  CreatedSession,
  FailedToCreateSession,
  InitializingSDK,
  InitializedSDK,
  FailedToInitializeSDK,
  LoadingContainer,
  LoadedContainer,
  FailedToLoadContainer,
  AuthorizingPayment,
  AuthorizedPayment,
  FailedToAuthorizePayment,
  CreatingOrder,
  CreatedOrder,
  FailedToCreateOrder,
  PaymentNotAllowedError,
  EmptyCartError,
  SDKNotFoundError,
  SessionIdNotFoundError,
  Ready,
}

const CustomerDetails: FC = () => {
  const t = useTranslations("checkout.customerDetails");
  const flowState = useRef<FlowState>(FlowState.Idle);
  const [, setReady] = useState<boolean>(false);
  const items = useAppSelector((state) => state.cart.items);
  const sessionId = useRef<string>("");
  const router = useRouter();
  const locale = useLocale();

  function parseFlowStateToMessage() {
    switch (flowState.current) {
      case FlowState.CreatingOrder:
        return t("flowState.creatingOrder");
      case FlowState.AuthorizingPayment:
        return t("flowState.authorizingPayment");
      case FlowState.Ready:
        return t("flowState.ready");
      case FlowState.EmptyCartError:
        return t("flowState.emptyCartError");
      case FlowState.Idle:
        return t("flowState.idle");
      default: {
        return t("flowState.default");
      }
    }
  }

  useEffect(() => {
    console.debug(`[KlarnaFlow] ${FlowState[flowState.current]}`);
  }, []);

  const createKlarnaSession = useCallback(async (): Promise<{
    sessionId: string;
    clientToken: string;
  }> => {
    flowState.current = FlowState.CreatingSession;

    try {
      const session = await createSession({
        locale: `${locale}-SE`,
        items,
      });
      flowState.current = FlowState.CreatedSession;
      return { sessionId: session.session_id, clientToken: session.client_token };
    } catch {
      flowState.current = FlowState.FailedToCreateSession;
      throw new Error();
    }
  }, [items, locale]);

  const initKlarnaSDK = useCallback(async (clientToken: string): Promise<void> => {
    flowState.current = FlowState.InitializingSDK;

    return new Promise((resolve, reject) => {
      try {
        window.Klarna.Payments.init({ client_token: clientToken });
        flowState.current = FlowState.InitializedSDK;
        resolve();
      } catch {
        flowState.current = FlowState.FailedToInitializeSDK;
        reject();
      }
    });
  }, []);

  const loadKlarnaContainer = useCallback(async (): Promise<void> => {
    flowState.current = FlowState.LoadingContainer;

    return new Promise((resolve, reject) => {
      try {
        window.Klarna.Payments.load({ container: "#klarna-payments-container" }, {}, (res: any) => {
          if (res.show_form) {
            flowState.current = FlowState.LoadedContainer;
            resolve();
          } else {
            flowState.current = FlowState.PaymentNotAllowedError;
            reject();
          }
        });
      } catch {
        flowState.current = FlowState.FailedToLoadContainer;
        reject();
      }
    });
  }, []);

  const setupKlarna = useCallback(async (): Promise<void> => {
    if (!window.Klarna) {
      flowState.current = FlowState.SDKNotFoundError;
      return;
    }

    if (items.length === 0) {
      flowState.current = FlowState.EmptyCartError;
      return;
    }

    if (sessionId.current != "") {
      return;
    }

    try {
      const session = await createKlarnaSession();
      sessionId.current = session.sessionId;
      await initKlarnaSDK(session.clientToken);
      await loadKlarnaContainer();
      flowState.current = FlowState.Ready;
      setReady(true);
    } catch {
      router.push(`payments/error?reason=${encodeURIComponent(FlowState[flowState.current])}`); // Push to error page if any error occurs
    }
  }, [items.length, createKlarnaSession, initKlarnaSDK, loadKlarnaContainer, router]);

  useEffect(() => {
    setupKlarna();
  }, [items, setupKlarna]);

  useEffect(() => {
    const onUpdateCart = () => {
      console.debug("Updating session...");

      if (items.length === 0) {
        flowState.current = FlowState.EmptyCartError;
        return;
      }

      if (sessionId.current === "") {
        flowState.current = FlowState.SessionIdNotFoundError;
      }

      updateSession({
        sessionId: sessionId.current,
        locale,
        items,
      }).then(() => {
        loadKlarnaContainer().then(() => (flowState.current = FlowState.Ready));
      });
    };

    document.getElementById("update-cart-button")?.addEventListener("click", onUpdateCart);

    return () => {
      document.getElementById("update-cart-button")?.removeEventListener("click", onUpdateCart);
    };
  }, [items, loadKlarnaContainer, locale, router]);

  const onSubmit = (data: FormSchema) => {
    flowState.current = FlowState.AuthorizingPayment;
    window.Klarna.Payments.authorize(
      {},
      {
        billing_address: {
          given_name: data.first_name,
          family_name: data.last_name,
          email: data.email,
          street_address: data.address.street_address,
          postal_code: data.address.postal_code,
          city: data.address.city,
          phone: data.phone,
          country: data.address.country,
        },
        shipping_address: {
          given_name: data.first_name,
          family_name: data.last_name,
          email: data.email,
          street_address: data.address.street_address,
          postal_code: data.address.postal_code,
          city: data.address.city,
          phone: data.phone,
          country: data.address.country,
        },
      },
      function (payload: { authorization_token: string; approved: boolean; show_form: boolean }) {
        if (!payload.approved) {
          console.debug("Failed to authorize the Klarna payment.");
          flowState.current = FlowState.FailedToAuthorizePayment;
          router.push(`payments/error?reason=${encodeURIComponent(FlowState[flowState.current])}`);
          return;
        } else if (!payload.show_form) {
          console.debug("Klarna can't be shown, ewww");
          flowState.current = FlowState.PaymentNotAllowedError;
          router.push(`payments/error?reason=${encodeURIComponent(FlowState[flowState.current])}`);
          return;
        }

        console.debug("Successfully authorized the Klarna payment, creating order...");
        flowState.current = FlowState.CreatingOrder;
        createOrder({
          authorizationToken: payload.authorization_token,
          locale: locale,
          items: items,
          shipping_address: {
            given_name: data.first_name,
            family_name: data.last_name,
            email: data.email,
            street_address: data.address.street_address,
            postal_code: data.address.postal_code,
            city: data.address.city,
            phone: data.phone,
            country: data.address.country,
          },
          billing_address: {
            given_name: data.first_name,
            family_name: data.last_name,
            email: data.email,
            street_address: data.address.street_address,
            postal_code: data.address.postal_code,
            city: data.address.city,
            phone: data.phone,
            country: data.address.country,
          },
        })
          .then((response) => {
            flowState.current = FlowState.CreatedOrder;
            window.location.replace(response.redirect_url);
          })
          .catch(() => {
            flowState.current = FlowState.FailedToCreateOrder;
            router.push('/payments/error')
          });
      },
    );
  };

  return (
    <>
      <Script
        id="klarna-script"
        src="https://x.klarnacdn.net/kp/lib/v1/api.js"
        strategy="afterInteractive"
        onLoad={() => {
          setupKlarna();
        }}
        onError={() => {
          flowState.current = FlowState.SDKNotFoundError;
        }}
      />
      <div
        className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50"
        hidden={flowState.current != FlowState.AuthorizingPayment && flowState.current != FlowState.CreatingOrder}
      >
        <p>{parseFlowStateToMessage()}</p>
      </div>
      <CustomerDetailsForm onSubmit={onSubmit} flowState={flowState.current} buttonMsg={parseFlowStateToMessage()} />
    </>
  );
};

export default CustomerDetails;
