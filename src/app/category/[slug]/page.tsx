import { Navbar } from "@/components/layout/navbar";
import { BlogCard } from "@/components/blog/blog-card";
import prisma from "@/lib/prisma";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 1. Format the slug back to match database strings
  // Example: "law-and-order" becomes "law and order"
  const formattedCategory = slug.replace(/-/g, ' ');

  // 2. Fetch real posts from Supabase based on category
  const filteredPosts = await prisma.post.findMany({
    where: {
      category: {
        equals: formattedCategory,
        mode: 'insensitive',
      },
      published: true,
    },
    orderBy: {
      date: 'desc',
    },
    // ADD THIS SELECT BLOCK TO FIX THE ERROR
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      content: true,
      image: true,
      date: true,
      // Note: 'excerpt' is omitted here to stop the crash
    }
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <header className="mb-12 border-b border-zinc-100 dark:border-zinc-800 pb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#3D3B8E] dark:text-[#6883BA]">
            Browsing Category
          </span>
          <h1 className="text-5xl font-black capitalize mt-4 tracking-tighter">
            {formattedCategory}
          </h1>
        </header>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <BlogCard 
                key={post.id}
                id={post.slug}
                category={post.category}
                title={post.title}
                excerpt={post.content.substring(0, 120) + "..."}
                date={new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric'
                })}
                image={post.image} 
              />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center rounded-3xl border-2 border-dashed border-zinc-100 dark:border-zinc-900">
            <div className="max-w-xs mx-auto">
               <p className="text-zinc-500 font-medium">
                No stories found in <span className="text-[#3D3B8E] font-bold">"{formattedCategory}"</span> yet.
              </p>
              <p className="text-sm text-zinc-400 mt-2">Check back later for fresh updates.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}