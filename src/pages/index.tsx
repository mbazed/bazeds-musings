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
}

interface HomeProps {
  posts: Post[];
}

const postsDirectory = path.join(process.cwd(), "posts");

export default function Home({ posts }: HomeProps) {
  return (
    <div className="max-w-5xl mx-auto p-8 text-left dark:bg-black dark:text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl pb-8 font-bold mb-8 dark:text-white">Bazed&apos;s Musing</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link
              href={`/posts/${post.slug}`}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-600 hover:underline dark:text-white"
            >
              {post.data.title}
            </Link>
            <p className="text-gray-500">{post.data.date}</p>
          </li>
        ))}
      </ul>
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
    const { data } = matter(fileContents);

    return {
      slug,
      data: data as PostFrontMatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
