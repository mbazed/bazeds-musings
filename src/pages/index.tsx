import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { GetStaticProps } from "next";
import { PostFrontMatter } from "./posts/[slug]";
import Footer from "@/components/Footer";

interface Post {
  slug: string;
  data: PostFrontMatter;
  readingTime: number;
  excerpt: string;
}

interface HomeProps {
  posts: Post[];
}

const postsDirectory = path.join(process.cwd(), "posts");

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function Home({ posts }: HomeProps) {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <main className="max-w-4xl mx-auto w-full px-6 pt-16 pb-28 flex-1 fade-in">
        {/* ── Header ── */}
        <header className="mb-12">
          {/* <p
            className="text-sm uppercase tracking-widest mb-3 font-medium"
            style={{ color: "var(--accent)" }}
          >
            Mohammed Bazed Ali
          </p> */}
          <h1
            className="text-5xl sm:text-6xl mb-5 leading-tight"
            style={{ color: "var(--text)", fontFamily: "'Lora', Georgia, serif" }}
          >
            Bazed&apos;s Musings
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            A quiet corner of the web where I write about tech, creativity,
            and whatever is on my mind.
          </p>
        </header>

        <hr className="warm-divider" />

        {/* ── Post list ── */}
        <section aria-label="Blog posts">
          <h2
            className="text-xs uppercase tracking-widest mb-6 font-semibold"
            style={{ color: "var(--text-muted)" }}
          >
            Writing
          </h2>

          {posts.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>No posts yet — check back soon.</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post, i) => (
                <li
                  key={post.slug}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="fade-in"
                >
                  <Link href={`/posts/${post.slug}`} className="block no-underline">
                    <article className="post-card">
                      <h3
                        className="text-xl sm:text-2xl mb-2 leading-snug"
                        style={{
                          color: "var(--text)",
                          fontFamily: "'Lora', Georgia, serif",
                        }}
                      >
                        {post.data.title}
                      </h3>

                      {post.excerpt && (
                        <p
                          className="text-sm leading-relaxed mb-3 line-clamp-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                        <time dateTime={post.data.date}>{post.data.date}</time>
                        <span aria-hidden>·</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const filenames = fs.readdirSync(postsDirectory);

  const posts: Post[] = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      data: data as PostFrontMatter,
      readingTime: estimateReadingTime(content),
      excerpt: (data as PostFrontMatter).metaDescription ?? "",
    };
  });

  // Sort newest first
  posts.sort((a, b) =>
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return { props: { posts } };
};
