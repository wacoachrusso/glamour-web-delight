import { format } from "date-fns";
import { Calendar, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { enUS, es, pt } from "date-fns/locale";

interface BlogHeaderProps {
  title: string;
  publishedAt: string;
  readingTime: number;
  category: string;
}

export const BlogHeader = ({ title, publishedAt, readingTime, category }: BlogHeaderProps) => {
  const { i18n, t } = useTranslation();

  const locales = {
    en: enUS,
    es: es,
    pt: pt,
  };

  const currentLocale = locales[i18n.language as keyof typeof locales] || enUS;

  return (
    <header className="text-center space-y-6">
      <h1 className="text-4xl md:text-5xl font-cormorant font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-secondary">
        {title}
      </h1>
      
      <div className="flex items-center justify-center gap-6 text-sm text-secondary/80">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={publishedAt}>
            {format(new Date(publishedAt), "MMMM d, yyyy", { locale: currentLocale })}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{t("blog.readingTime", { minutes: readingTime })}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          <span className="text-primary-dark">{t(`blog.categories.${category}`)}</span>
        </div>
      </div>
    </header>
  );
};