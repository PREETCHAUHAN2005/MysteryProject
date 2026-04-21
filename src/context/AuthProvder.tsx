"use client";
import { SessionProvider } from "next-auth/react";

export default function App(
  {
    children,
  }: {
    children: React.ReactNode;
  }
  //   pageProps: { session, ...pageProps },
) {
  return <SessionProvider>{children}</SessionProvider>;
}
