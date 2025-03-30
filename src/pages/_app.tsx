// pages/_app.tsx
import ThemeToggle from "@/components/ThemeToggle";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <title>Bazed&apos;s Musings</title>
        <meta
          name="description"
          content="Personal blog exploring tech, creativity, and code."
        />
        <link rel="icon" href="/brain.ico" />
      </Head>
      <div className="fixed top-7 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="flex min-h-screen dark:bg-black">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
