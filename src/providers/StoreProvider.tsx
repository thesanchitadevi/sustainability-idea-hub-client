"use client";

import LoadingPage from "@/app/loading";

import { AppStore, makeStore } from "@/redux/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>(undefined); // we will create store only once. 
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  const persistedStore = persistStore(storeRef.current)
  // return <Provider store={storeRef.current}>{children}</Provider>;
  return <Provider store={storeRef.current}><PersistGate loading={<LoadingPage/>} persistor={persistedStore} >{children}</PersistGate></Provider>;
};

export default StoreProvider;
