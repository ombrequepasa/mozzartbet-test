"use client";

import { ReactNode } from "react";
import { Provider, createStore } from "jotai";

export type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const store = createStore();

  return <Provider store={store}>{children}</Provider>;
}
