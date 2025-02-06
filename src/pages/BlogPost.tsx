import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogTags } from "@/components/blog/BlogTags";
import { formatContent } from "@/utils/blogUtils";

const BlogPost = () => {
  const { slug } = useParams();
  const { t } = useTranslation();

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
      <div className="min-h-screen bg-gradient-to-b from-muted to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-48 mx-auto mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("blog.notFound.title")}</h1>
          <p>{t("blog.notFound.message")}</p>
          <Link to="/blog">
            <Button variant="secondary" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("blog.featured.viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = Math.ceil(post.content.split(' ').length / 200);
  const formattedContent = formatContent(post.content);

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      <Navbar />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <Link to="/blog">
          <Button variant="ghost" className="mb-8 hover:bg-secondary/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("blog.featured.viewAll")}
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <BlogHeader 
            title={post.title}
            publishedAt={post.published_at}
            readingTime={readingTime}
            category={post.category}
          />

          {post.featured_image && (
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              src={post.featured_image}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[500px]"
            />
          )}

          <BlogContent 
            content={post.content}
            formattedContent={formattedContent}
          />

          <BlogTags tags={post.tags} />
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;