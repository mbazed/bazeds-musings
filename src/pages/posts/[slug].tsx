import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Footer from "@/components/Footer";
import Head from "next/head";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostFrontMatter {
  title: string;
  date: string;
  metaDescription?: string;
  keywords?: string[];
  externalLinks?: { name: string; url: string }[];
  internalLinks?: { name: string; url: string }[];
  audience?: string[];
  seo?: {
    keywordDensity?: string;
  };
}

interface PostProps {
  data: PostFrontMatter;
  content: string;
  readingTime: number;
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, "") },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    props: {
      data: data as PostFrontMatter,
      content,
      readingTime: estimateReadingTime(content),
    },
  };
};

const Post: React.FC<PostProps> = ({ data, content, readingTime }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = progressRef.current;
      if (!el) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      el.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>{`${data.title} | Bazed's Musings`}</title>
        <link rel="icon" href="/hand.ico" />
        <meta
          name="description"
          content={data.metaDescription ?? "Read my latest blog post"}
        />
      </Head>

      {/* Scroll progress bar */}
      <div ref={progressRef} id="scroll-progress" aria-hidden="true" />

      <div
        className="flex flex-col min-h-screen fade-in"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <article className="max-w-2xl mx-auto w-full px-6 py-16 flex-1">
          {/* ── Post header ── */}
          <header className="mb-10">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-normal leading-tight mb-5"
              style={{
                color: "var(--text)",
                fontFamily: "'Lora', Georgia, serif",
              }}
            >
              {data.title}
            </h1>

            <div
              className="flex items-center gap-3 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              <time dateTime={data.date}>{data.date}</time>
              <span aria-hidden>·</span>
              <span>{readingTime} min read</span>
            </div>
          </header>

          <hr className="warm-divider" />

          {/* ── Content ── */}
          <div className="prose prose-zinc md:prose-base lg:prose-lg max-w-none pb-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default Post;
