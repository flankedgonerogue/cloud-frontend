import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { CartReducer } from "@/store/cart.slice";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    cart: CartReducer,
  }),
);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
