import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { enUS, es, pt } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  category: string;
}

const BlogCard = ({ title, excerpt, slug, publishedAt, category }: BlogCardProps) => {
  const { i18n, t } = useTranslation();

  const locales = {
    en: enUS,
    es: es,
    pt: pt,
  };

  const currentLocale = locales[i18n.language as keyof typeof locales] || enUS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-secondary mb-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={publishedAt}>
            {format(new Date(publishedAt), "MMMM d, yyyy", { locale: currentLocale })}
          </time>
          <span className="mx-2">•</span>
          <span className="text-primary-dark">{t(`blog.categories.${category}`)}</span>
        </div>
        <Link to={`/blog/${slug}`} className="block group">
          <h3 className="text-xl font-cormorant font-bold mb-2 group-hover:text-secondary transition-colors">
            {title}
          </h3>
          <p className="text-primary-foreground/80 line-clamp-2">{excerpt}</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;