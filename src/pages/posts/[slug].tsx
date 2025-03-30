import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Footer from "@/components/Footer";
import Link from "next/link";
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
    props: { data: data as PostFrontMatter, content },
  };
};

const Post: React.FC<PostProps> = ({ data, content }) => {
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
      <article className="max-w-5xl mx-auto p-6 bg-white dark:bg-black dark:text-white">
        <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
          ← Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 mt-2">
          {data.title}
        </h1>
        <p className="text-gray-500 mb-8 dark:text-gray-300">{data.date}</p>
        <div className="prose md:prose-sm lg:prose-lg prose-zinc max-w-none pb-16 dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
        <Footer />
      </article>
    </>
  );
};

export default Post;
