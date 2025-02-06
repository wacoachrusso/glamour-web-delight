import { motion } from "framer-motion";

interface BlogTagsProps {
  tags: string[];
}

export const BlogTags = ({ tags }: BlogTagsProps) => {
  if (!tags || tags.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex flex-wrap gap-2 pt-8 border-t border-secondary/10"
    >
      {tags.map((tag: string) => (
        <span
          key={tag}
          className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm hover:bg-secondary/20 transition-colors"
        >
          {tag}
        </span>
      ))}
    </motion.div>
  );
};