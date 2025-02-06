import { motion } from "framer-motion";

interface BlogContentProps {
  content: string;
  formattedContent: string;
}

export const BlogContent = ({ content, formattedContent }: BlogContentProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="prose prose-lg max-w-none prose-headings:font-cormorant prose-headings:font-bold prose-headings:text-primary-foreground/90 prose-p:text-primary-foreground/80 prose-p:leading-relaxed prose-a:text-secondary hover:prose-a:text-secondary-light prose-strong:text-primary-foreground/90 prose-ul:list-disc prose-ul:pl-4 prose-li:text-primary-foreground/80 prose-img:rounded-lg prose-img:shadow-lg"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
};