import Link from "next/link";

interface BlogCardProps {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  horizontal?: boolean;
}

export function BlogCard({ id, category, title, excerpt, date, image, horizontal = false }: BlogCardProps) {
  // Mock author data to match the UI design provided
  const author = {
    name: "Farzeen Imran",
    avatar: "https://ui-avatars.com/api/?name=Farzeen&background=3D3B8E&color=fff",
    readTime: "3 min read"
  };

  return (
    <Link 
      href={`/blog/${id}`} 
      className={`group flex ${horizontal ? 'flex-row gap-4 items-center' : 'flex-col gap-5'}`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden rounded-3xl ${horizontal ? 'w-24 h-24 shrink-0' : 'aspect-[16/10]'} bg-zinc-100 dark:bg-zinc-800`}>
        <img 
          src={image} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={title} 
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1">
        {!horizontal && (
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3D3B8E] dark:text-[#6883BA] mb-2">
            {category}
          </span>
        )}
        
        <h3 className={`font-bold leading-tight transition-colors group-hover:text-[#3D3B8E] dark:group-hover:text-[#6883BA] ${horizontal ? 'text-sm' : 'text-xl md:text-2xl'}`}>
          {title}
        </h3>
        
        {!horizontal && (
          <>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
            
            {/* Author and Metadata Footer */}
            <div className="flex items-center gap-3 mt-6 pt-2">
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="w-6 h-6 rounded-full object-cover" 
              />
              <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                <span className="text-zinc-900 dark:text-zinc-100 font-bold">{author.name}</span>
                <span className="text-zinc-300">•</span>
                <span>{author.readTime}</span>
              </div>
            </div>
          </>
        )}

        {horizontal && (
           <p className="text-[10px] text-zinc-400 mt-2 uppercase font-bold tracking-wider">{date}</p>
        )}
      </div>
    </Link>
  );
}