import { Analytics } from "@vercel/analytics/react"
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
  
  const isArticlepage = router.pathname.startsWith("/posts");

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
      {isArticlepage && (
        <header>
          <Link href="/" className="fixed mx-auto w-full bg-white dark:bg-black border-b border-blue-600 dark:border-blue-400 z-40 flex justify-start items-center p-4 text-blue-600 hover:underline dark:text-blue-400">
          ← Back to Home
        </Link>
        </header>
      )}
      <div className={`${isArticlepage ? "pt-8" : ""} flex min-h-screen dark:bg-black`}>
        <Component {...pageProps} />
        <Analytics/>
      </div>
    </ThemeProvider>
  );
}
