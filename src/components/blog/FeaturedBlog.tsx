import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import SectionHeader from "../shared/SectionHeader";
import ViewAllButton from "../shared/ViewAllButton";
import { ArrowRight } from "lucide-react";

const FeaturedBlog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["featuredBlogPosts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white via-primary/5 to-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          titleKey="blog.featured.title"
          highlightKey="blog.featured.highlight"
          subtitleKey="blog.featured.subtitle"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {posts?.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt || ""}
              slug={post.slug}
              publishedAt={post.published_at}
              category={post.category}
            />
          ))}
        </motion.div>

        <ViewAllButton textKey="blog.viewAll" Icon={ArrowRight} />
      </div>
    </section>
  );
};

export default FeaturedBlog;