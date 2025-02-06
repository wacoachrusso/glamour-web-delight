import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-48 mx-auto mb-8" />
        <Skeleton className="h-64 w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p>The blog post you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-cormorant font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-secondary">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.published_at}>
                {format(new Date(post.published_at), "MMMM d, yyyy")}
              </time>
              <span className="mx-2">•</span>
              <span className="text-primary-dark">{post.category}</span>
            </div>
          </header>

          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;