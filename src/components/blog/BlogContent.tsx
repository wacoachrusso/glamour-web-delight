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
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
};