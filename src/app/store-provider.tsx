"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import persistStore from "redux-persist/es/persistStore";
import { Persistor } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const persistorRef = useRef<Persistor>(undefined);
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  if (!persistorRef.current) {
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
