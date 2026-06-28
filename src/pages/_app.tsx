import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import CursorGlow from "@/components/CursorGlow";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isArticlePage = router.pathname.startsWith("/posts");

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

      <div
        className={`${isArticlePage ? "pt-12" : ""} flex flex-col min-h-screen relative`}
        style={{ backgroundColor: "transparent", zIndex: 1 }}
      >
        <CursorGlow />
        
        {isArticlePage && (
          <header className="fade-only relative z-50">
            <Link
              href="/"
              className="fixed top-0 left-0 w-full flex justify-start items-center px-6 py-3 text-sm font-medium transition-colors duration-200"
              style={{
                backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid var(--border)",
                color: "var(--accent)",
              }}
            >
              ← Back to Home
            </Link>
          </header>
        )}

        <Component {...pageProps} />
        <Analytics />
      </div>
    </ThemeProvider>
  );
}
