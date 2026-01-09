import { Navbar } from "@/components/layout/navbar";
import { BlogCard } from "@/components/blog/blog-card";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Footer from "@/components/layout/footer";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
    // Manually select columns that exist to avoid the "excerpt" error
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      content: true, // Use this for the excerpt for now
      image: true,
      date: true,
    }
  });

  // Layout Logic
  const heroPost = posts[0];
  const sidePosts = posts.slice(1, 6);
  const recentPosts = posts.slice(6);

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        {/* --- SECTION 1: FEATURED --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          
          {/* HERO POST (Left 2/3) */}
          {heroPost && (
            <div className="lg:col-span-2 group cursor-pointer">
              <Link href={`/blog/${heroPost.slug}`}>
                <div className="relative h-[500px] w-full overflow-hidden rounded-3xl">
                  <img 
                    src={heroPost.image} 
                    alt={heroPost.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="bg-[#3D3B8E] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                      {heroPost.category}
                    </span>
                    <h2 className="text-4xl font-bold text-white mt-4 leading-tight">
                      {heroPost.title}
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* SIDEBAR POSTS (Right 1/3) */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Other featured posts</h3>
            <div className="flex flex-col gap-6">
              {sidePosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6 last:border-0">
                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                    <img src={post.image} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <h4 className="font-bold text-sm leading-snug group-hover:text-[#3D3B8E] dark:group-hover:text-[#6883BA] transition-colors">
                    {post.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 2: RECENT POSTS --- */}
        <section>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold">Recent Posts</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recentPosts.map((post) => (
              <BlogCard 
                key={post.id}
                id={post.slug}
                category={post.category}
                title={post.title}
                excerpt={post.content.substring(0, 100) + "..."}
                date={new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                image={post.image}
              />
            ))}
          </div>
        </section>
      </div>
      {/* <Footer/> */}
    </main>
  );
}