import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, ArrowLeft, Clock, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

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

  // Convert markdown-style content to HTML with proper styling
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        // Handle headers
        if (paragraph.startsWith('##')) {
          return `<h2 class="text-2xl font-cormorant font-bold mt-8 mb-4 text-primary-foreground/90">${paragraph.replace('##', '').trim()}</h2>`;
        }
        // Handle bullet points
        if (paragraph.includes('- **')) {
          const listItems = paragraph.split('\n').map(item => {
            if (item.includes('- **')) {
              const [title, ...rest] = item.split('**');
              return `<li class="mb-3"><span class="font-bold">${rest[0]}</span>${rest[1].replace('**', '')}</li>`;
            }
            return `<li class="mb-3">${item.replace('- ', '')}</li>`;
          }).join('');
          return `<ul class="list-disc list-inside space-y-2 ml-4 mb-6">${listItems}</ul>`;
        }
        // Regular paragraphs
        return `<p class="mb-6 leading-relaxed text-primary-foreground/80">${paragraph}</p>`;
      })
      .join('');
  };

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
          <header className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-cormorant font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-sm text-secondary/80">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.published_at}>
                  {format(new Date(post.published_at), "MMMM d, yyyy")}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span className="text-primary-dark">{post.category}</span>
              </div>
            </div>
          </header>

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

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />

          {post.tags && post.tags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 pt-8 border-t border-secondary/10"
            >
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm hover:bg-secondary/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;