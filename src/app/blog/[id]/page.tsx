export const revalidate = 0;

import { Navbar } from "@/components/layout/navbar";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  excerpt?: string | null;
  content?: string;
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Fetch Main Post with explicit selection
  const post = await prisma.post.findUnique({
    where: { slug: id },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      category: true,
      excerpt: true,
    }
  });

  if (!post) return notFound();

  const relatedPosts: Post[] = await prisma.post.findMany({
    where: {
      category: post.category,
      NOT: { slug: id },
      published: true,
    },
    take: 4,
    orderBy: { date: 'desc' },
    // WE MUST ADD THIS SELECT BLOCK HERE TOO
    select: {
      id: true,
      title: true,
      slug: true,
      image: true,
      category: true,
      excerpt:true,
    }
  });
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT COLUMN: MAIN CONTENT */}
          <article className="lg:col-span-8">
            <h1 className="text-5xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-100">
              {post.title}
            </h1>
            
            {/* 1. EXCERPT (Lead Paragraph before image) */}
            <div className="mb-10">
              <p className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                {post.excerpt || "Database excerpt is empty or null"}
              </p>
            </div>

            {/* 2. MAIN IMAGE */}
            <div className="rounded-3xl overflow-hidden mb-12 shadow-xl">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full aspect-[16/9] object-cover"
              />
            </div>

            {/* 3. MAIN CONTENT (Long story after image) */}
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <div className="text-lg text-zinc-700 dark:text-zinc-400 leading-loose whitespace-pre-wrap">
                {post.content}
              </div>
            </div>
          </article>

          {/* RIGHT COLUMN: SIDEBAR */}
          <aside className="lg:col-span-4 border-l border-zinc-200 dark:border-zinc-800 lg:pl-12">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              Related {post.category} news
            </h2>

            <div className="space-y-10">
              {relatedPosts.map((related: Post) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                  <div className="relative rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={related.image} 
                      alt={related.title}
                      className="w-full aspect-video object-cover transition-transform group-hover:scale-105" 
                    />
                    <div className="absolute bottom-3 left-3">
                       <PlayCircle className="text-white fill-[#3D3B8E] w-8 h-8 opacity-90" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-1 block">
                      {related.category}
                    </span>
                    <h3 className="font-bold text-lg leading-snug group-hover:underline">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            {/* Sidebar Footer */}
            <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-black uppercase mb-4 tracking-widest text-zinc-900 dark:text-zinc-100">
                Connect with NewsNest
              </h3>
              <div className="space-y-3">
                <div className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-100 transition">
                  <span className="text-sm font-bold text-white group-hover:text-black dark:group-hover:text-black">
                    Apple News
                  </span>
                </div>
                <div className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-100 transition">
                  <span className="text-sm font-bold text-white group-hover:text-black dark:group-hover:text-black">
                    Google News
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
