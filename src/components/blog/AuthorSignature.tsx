import { motion } from "framer-motion";

interface AuthorSignatureProps {
  author: string;
  date: string;
}

export const AuthorSignature = ({ author, date }: AuthorSignatureProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-4 mt-12 pt-8 border-t border-secondary/10"
    >
      <img
        src="/lovable-uploads/61e5db9a-2533-4a68-a338-13395392c7ed.png"
        alt={author}
        className="w-16 h-16 rounded-full object-cover border-2 border-secondary/20"
      />
      <div>
        <p className="font-cormorant text-lg font-semibold text-primary-foreground">
          {author}
        </p>
        <p className="text-sm text-primary-foreground/60">
          Owner & Master Stylist
        </p>
        <p className="text-xs text-primary-foreground/60 mt-1">
          Published on {date}
        </p>
      </div>
    </motion.div>
  );
};